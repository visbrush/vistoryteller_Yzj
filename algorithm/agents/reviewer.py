import json
import os
from typing import List

import openai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from langchain.schema import AIMessage, HumanMessage, SystemMessage

from agents import Agent
from .significance import calculate_datafact
from common.preamble import (
    DATA_STORY_PREAMBLE,
    DATA_FACT_RULES,
    STORY_NARRATIVE_PATTERN,
    DATA_FACT_PREAMBLE,
    FREYTAG_PREAMLE,
)
from common.fact import DataFact
from common.config import OPENAI_API_BASE, OPENAI_KEY

METRIC_DEFINATION = {
    "Coherence": "Adjacent data facts are logically related and the arrangement sequence of these data facts adheres to the narrative structure.",
    "Relevance": "The content in each data fact is related to the Key Point",
}

system_prompt = """
You are an experienced data story reviewer. You have the ability to provide suggestions for improvement.
"""

suggestion_template = """
There is some problem of {metric} around the `Data Fact {problem}` of the given `Data Story`.
Your task is to propose suggestions that make the given `Data Story` on the dataset `Data Summary` more {metric}. These suggestions should be detailed enough for the the modifier to know how to alter the `data fact`s in it.
You can complete this task step by step:
1. The techniques in `Strategy Options` can help you propose suggestions on how to organize `data fact`s to make the given `Data Story` more {metric}.
2. Design suggestions to optimize the `Data Story`.
3. Directly return a sequence of detailed data operations step-by-step to represent the suggestions.
The steps must be in the logic of data exploration.
Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.

# Definition of {metric}
-----
{metric_definition}
-----
# Strategy Options
-----
{narrative_pattern}
-----
# Key Point
-----
{key_point}
-----
# Data Summary
-----
{data_summary}
-----
# Data Story
-----
{data_story}
-----
# Format Example
-----
{{
    "suggestions": [
        "<step 1>",
        "<step 2>",
        ...
    ],
    "strategy option": "<chosen strategy option of the suggestions>",
    "reason": "<why suggest to optimize data story in this way?>"
}}
----
"""


class CriticResult:
    def __init__(
        self, significance, coherence, relevance, worst_data_fact, score
    ) -> None:
        self.significance = significance
        self.coherence = coherence
        self.relevance = relevance
        self.worst_data_fact = worst_data_fact
        self.keypoint_embedding = None
        self.story_embedding = None
        self.score = score

    def __str__(self) -> str:
        return "score: {}\ncoherence: {}\nrelevance: {}\nworst_data_fact: {}".format(
            self.final_score(),
            self.coherence,
            self.relevance,
            self.worst_data_fact,
        )

    def final_score(self):
        return self.score

    def get_improve_metric(self):
        if self.coherence < self.relevance:
            return "Coherence"
        else:
            return "Relevance"


class Reviewer(Agent):
    def __init__(self) -> None:
        super().__init__()
        self.messages = [SystemMessage(content=system_prompt)]

    def critic(self, data_story: List[DataFact], key_point, plot=False) -> CriticResult:
        story_len = len(data_story)
        embedding_keypoint = self._embed(key_point)
        embedding_data_story = [self._embed(str(fact)) for fact in data_story]
        relevance = [
            cosine_similarity(e.reshape(1, -1), embedding_keypoint)
            for e in embedding_data_story
        ]
        coherence = []
        for i in range(story_len):
            if i == 0:
                coherence.append(
                    cosine_similarity(
                        embedding_data_story[0].reshape(1, -1),
                        embedding_data_story[1].reshape(1, -1),
                    )
                )
            elif i == story_len - 1:
                coherence.append(
                    cosine_similarity(
                        embedding_data_story[story_len - 2].reshape(1, -1),
                        embedding_data_story[story_len - 1].reshape(1, -1),
                    )
                )
            else:
                coherence.append(
                    (
                        cosine_similarity(
                            embedding_data_story[i - 1].reshape(1, -1),
                            embedding_data_story[i].reshape(1, -1),
                        )
                        + cosine_similarity(
                            embedding_data_story[i].reshape(1, -1),
                            embedding_data_story[i + 1].reshape(1, -1),
                        )
                    )
                    / 2
                )
        score = [relevance[i] + coherence[i] for i in range(story_len)]
        worst_data_fact = np.argmin(score)
        # result = CriticResult(
        #     0, coherence[worst_data_fact], relevance[worst_data_fact], worst_data_fact
        # )
        print(
            "max ",
            np.max(coherence),
            np.max(relevance),
            np.max([c + r for c, r in zip(coherence, relevance)]),
        )
        print(
            "min ",
            np.min(coherence),
            np.min(relevance),
            np.min([c + r for c, r in zip(coherence, relevance)]),
        )
        print(
            "mean ",
            np.mean(coherence),
            np.mean(relevance),
            np.mean([c + r for c, r in zip(coherence, relevance)]),
        )
        print(
            "worst ",
            coherence[worst_data_fact],
            relevance[worst_data_fact],
            coherence[worst_data_fact] + relevance[worst_data_fact],
        )
        result = CriticResult(
            0, np.mean(coherence), np.mean(relevance), worst_data_fact, 0
        )
        if plot:
            result.keypoint_embedding = embedding_keypoint
            result.story_embedding = embedding_data_story
        return result

    def suggest(
        self,
        critic_result: CriticResult,
        data_story: List[DataFact],
        data_summary,
        key_point,
    ):
        self.reset()
        metric = critic_result.get_improve_metric()
        prompt = suggestion_template.format(
            metric=metric,
            problem=critic_result.worst_data_fact,
            metric_definition=METRIC_DEFINATION[metric],
            narrative_pattern=STORY_NARRATIVE_PATTERN,
            data_story=[
                {"Data Fact {}".format(i): fact.to_dict(csv=False, stage=False)}
                for i, fact in enumerate(data_story)
            ],
            data_summary=data_summary,
            key_point=key_point,
        )
        self.messages.append(HumanMessage(content=prompt))
        response = self.chat()
        response = self.tryJsonDecode(response)
        suggestions = response.content
        return json.loads(suggestions)["suggestions"]

    def _embed(self, text):
        os.environ["OPENAI_API_KEY"] = OPENAI_KEY
        client = openai.OpenAI(base_url=OPENAI_API_BASE)
        embedding = np.array(
            client.embeddings.create(
                input=text,
                model="text-embedding-ada-002",
            ).data[0].embedding
        ).reshape(1, -1)
        return embedding

    def calculate_datastory(self, data, data_story, schema):
        # significance
        factaddsig = []
        for datafact in data_story:
            sig = calculate_datafact(data, datafact["data fact"], schema)
            if sig != 0:
                # datafact['significance'] = [sig]
                factaddsig.append(datafact["data fact"])
        return factaddsig

    def reset(self):
        self.messages = [SystemMessage(content=system_prompt)]
