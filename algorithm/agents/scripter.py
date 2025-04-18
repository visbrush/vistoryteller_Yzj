import json
import math
import os
import uuid
from typing import List

import numpy as np
import pandas as pd
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from pandasql import sqldf

from agents import Agent
from common.preamble import (
    DATA_STORY_PREAMBLE,
    DATA_FACT_PREAMBLE,
    FREYTAG_PREAMLE,
)
from common.fact import DATA_FACT_TYPES, DataFact
from common.config import GEDI_MODE
from common.model import DataSource
from logger import logger
from spellchecker import SpellChecker

decompose_template = """
Your task is to construct a complete outline of a data-driven story to address the `Key Point`, at most five questions. The dataset is described in `Data Summary`.
To accomplish this task, you need to repeat two steps to construct a sequence of question with strong logic:
1. Select an appropriate `Narrative Structure` stage for a question. The choice of stages must follow the order and cover all the three kind.
2. Generate a question that aligns with the characteristics of the selected stage to address the `Key Point`. The question must target on the cotent of data instead of the dataset schema!!!
Output format carefully referenced `Format Example` which is a JSON format. Do not include irrelevant information in the answer body.
# Definition of Narrative Structure:
-----
{narrative_definition}
-----
# Data Summary
-----
{data_summary}
-----
# Key Point
-----
{key_point}
-----
# Format Example
-----
{{
    "output": [
        {{
            "question": "",
            "stage": ""
        }},
        ...
    ]
}}

-----
"""

gedi_template = """{prompt} The previous outline: {outline}
Add a new and different qustion into the outline.
The relationship between the new question and the key point is: {style}
Answer in a text completion way, only output the next token of the new questions!!!
Output "?" to end the question.
The new question:
"""

decompose_init_template = """
Your task is to construct a complete outline of a data-driven story to address the `Key Point`, at most five questions. The dataset is described in `Data Summary`.
To accomplish this task, you need to repeat two steps to construct a sequence of question with strong logic:
1. Generate a question that aligns with the characteristics of the selected stage to address the `Key Point`. 
2. Refine the question to target on the cotent of data instead of the dataset schema!!!
Attention:
The outline must be limited to the domain of the `Data Summary`. Do not imagine! Do not generate questions which cannot be answered with the `Data Summary`!
# Data Summary
-----
{data_summary}
-----
# Key Point
-----
{key_point}
-----
"""

decompose_follow_template = """
Your task is to construct a complete outline of a data-driven story to address the `Key Point`, at most five questions. The dataset is described in `Data Summary`.
To accomplish this task, you need to repeat two steps to construct a sequence of question with strong logic:
1. Generate a question that aligns with the characteristics of the selected stage to address the `Key Point`. 
2. Refine the question to target on the cotent of data instead of the dataset schema!!!
Attention:
The question must be coherent with previous questions!!!
The question must target on the cotent of data instead of the dataset schema!!! 
The question must be answerable by trend, propertion, categorization, value and association!!!
The outline must be limited to the domain of the `Data Summary`. Do not imagine! Do not generate questions which cannot be answered with the `Data Summary`!
# Data Summary
-----
{data_summary}
-----
# Key Point
-----
{key_point}
-----
"""

project_template = """
Based on the `Ontology Model`, identify the relevant `Entities` for each question in the `Story Outline`. The `entities` should be such that they enable answering the corresponding questions.
The entities for one question must have a relationship with each other!
Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.
# Story Outline
-----
{story_outline}
-----
# Entities
-----
{entities}
-----
# Ontology Model
-----
{ontology}
-----
# Format Example
-----
{{
    "output": [
        {{
            "question": <Question>,
            "entities": [<A sequence of `entity`>]
        }},
        {{
            "question": <Question>,
            "entities": [<A sequence of entity>]
        }},
        {{
            "question": <Question>,
            "entities": [<A sequence of entity>]
        }}
    ]
}}
-----
"""

caption_system = f"""You are a data-driven story writer. A data-driven story is composed with `Data Fact`.
{DATA_FACT_PREAMBLE}"""

caption_template = """
Your assignment is to craft one narrative sentence for each 'data fact' in a storytelling style, weaving them into a cohesive and engaging narrative that addresses the 'key point'. 
Reference the 'Data Summary' for the meanings of fields in data facts. 
Diversify your language and sentence structure to add variety and richness to the narrative, avoiding repetitive, monotonous phrasing or questions. 
Your goal is to create a compelling story that effectively communicates the insights from the data facts in relation to the key point.
Each data fact must have one description and less than 50 words.
Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.
# Key Point
-----
{key_point}
-----
# Data Story
-----
{data_story}
-----
# Format Example
-----
{{
    "output": [
        <narrative sentence for data fact>,
        ...
    ]
}}
-----"""

class Scripter(Agent):
    def __init__(self) -> None:
        super().__init__()
        self.messages = []
        self.stages = ["Setting", "Rising-Climax", "Resolution"]
        self.supporting_tag = """
supporting which means the question provide some more infromation for the key point. The question maynot be a rhetorical question or yes-no question.
# Content Examples
---
Key point: What help a reader become active?
Question: A reactive document allows the reader to play with the author's assumptions and analyses, and see the consquences.
---
Key point: inequality between black boy and white boy
Question: For poor children, the pattern is reversed. Most poor black boys will remain poor as adults. White boys raised in poor families fare far better.
---
Key point: The causes of gun deaths in America
Question: More than 33,000 people are fatally shot in the U.S. each year.
---"""

        self.antagonist_tag = """
antagonist which means the question must introduce some strong conflicts against the key point to extend the story. The question should be a rhetorical question or yes-no question.
# Content Examples
---
Key point: What help a reader become active?
Question: What does it mean to be an active reader?
---
Key point: inequality between black boy and white boy
Question: Most white boys raised in wealthy families will stay rich or upper middle class as adults, but black boys raised in similarly rich households will not
---
Key point: The causes of gun deaths in America
Question: We tend to focus on terrorism and mass shootings, police officers killed in the line of duty, and police shootings of civilians. But nearly two-thirds of gun deaths are suicides.
---"""

    def decompose_key_point(
        self, data_summary, key_point, data_source: DataSource, outline_curve, isHuawei
    ):
        self.reset()
        explanation = []
        if len(outline_curve) == 0 or isHuawei:
            prompt = decompose_template.format(
                narrative_definition=FREYTAG_PREAMLE,
                data_summary=data_summary,
                key_point=key_point,
            )
            self.messages.append(HumanMessage(content=prompt))
            response = self.chat()
            response = self.tryJsonDecode(response)
            points = json.loads(response.content)["output"]
            for _ in range(2):
                for point in points:
                    if (
                        "factors" in point["question"]
                        or "takeaways" in point["question"]
                    ):
                        self.messages.append(response)
                        prompt = """You must not generate abstract questions like:
        1. What are ... factors ...
        2. What are ... take-away ..."""
                        self.messages.append(HumanMessage(content=prompt))
                        response = self.chat()
                        points = json.loads(response.content)["output"]
        else:
            outline = []
            # first question
            prompt = decompose_init_template.format(
                narrative_stage=self.stages[0],
                narrative_definition=FREYTAG_PREAMLE,
                data_summary=data_summary,
                key_point=key_point,
            )
            response = self.gediGenerate(
                prompt, desire=outline_curve[0], outline=outline
            )
            outline.append(json.dumps(response))
            explanation.append(
                self.explain_plot(key_point, response["question"], outline_curve[0])
            )
            # following up
            for i in range(1, len(outline_curve)):
                follow_prompt = decompose_follow_template.format(
                    narrative_definition=FREYTAG_PREAMLE,
                    data_summary=data_summary,
                    key_point=key_point,
                )
                response = self.gediGenerate(
                    follow_prompt, desire=outline_curve[i], outline="\n".join(outline)
                )
                outline.append(json.dumps(response))
                explanation.append(
                    self.explain_plot(key_point, response["question"], outline_curve[i])
                )

            points = [json.loads(p) for p in outline]

        # entity
        prompt = project_template.format(
            story_outline="\n".join([point["question"] for point in points]),
            ontology=data_source.ontology,
            entities=data_source.entities,
        )
        self.reset()
        self.messages.append(HumanMessage(content=prompt))
        response = self.chat()
        response = self.tryJsonDecode(response)
        try:
            outline_entity = json.loads(response.content)["output"]
        except:
            outline_entity = data_source.entities
        for entity in outline_entity:
            for i in range(len(entity["entities"])):
                entity["entities"][i] = data_source.column2csv.get(
                    entity["entities"][i], ""
                )
            entity["entities"] = list(
                set(data_source.entities).intersection(set(entity["entities"]))
            )
            if len(entity["entities"]) == 0:
                entity["entities"] = data_source.entities
                print("entities: ", data_source.entities)
            entity["entities"] = data_source.get_joinable_dfs(entity["entities"])

        # join
        for point, entity in zip(points, outline_entity):
            # GPT may output column name instead of entity
            if len(entity["entities"]) == 1:
                e = entity["entities"][0]
                result_df = data_source.dataframe[e].copy(deep=True)
                result_df["dataid"] = range(1, len(result_df) + 1)
            else:
                result_df = data_source.dataframe[entity["entities"][0]]
                for i in range(1, len(entity["entities"])):
                    current_df = data_source.dataframe[entity["entities"][i]]
                    join_columns = list(
                        result_df.columns.intersection(current_df.columns)
                    )
                    if len(join_columns) != 0:
                        result_df = pd.merge(
                            result_df, current_df, on=join_columns, how="inner"
                        )
                result_df = result_df.dropna()
                result_df["dataid"] = range(1, len(result_df) + 1)

            current_csv_path = os.path.join(data_source.dir, str(uuid.uuid4()) + ".csv")
            result_df.to_csv(current_csv_path, index=False)
            point["csv"] = current_csv_path
            point["data"] = result_df
            point["schema"] = list(result_df.columns)

        return points, explanation

    


    def gediGenerate(self, prompt, desire, outline):
        prompt_supporting = gedi_template.format(
            prompt=prompt, style=self.supporting_tag, outline=outline
        )
        prompt_antagonist = gedi_template.format(
            prompt=prompt, style=self.antagonist_tag, outline=outline
        )
        result = ""
        for _ in range(10):
            self.reset()
            self.resetGediAgent()
            self.messages.append(HumanMessage(content=prompt_supporting + result))
            print(result)
            response_supporting = self.chat(1)
            self.reset()
            self.resetGediAgent()
            self.messages.append(HumanMessage(content=prompt_antagonist + result))
            response_antagonist = self.chat(1)
            next_word = response_supporting.content
            if "?" in next_word:
                result += next_word
                break
            supporting_logprobs = self._get_log_prob(response_supporting)
            antagonist_logprobs = self._get_log_prob(response_antagonist)
            next_tokens = list(
                set(list(supporting_logprobs.keys()) + list(antagonist_logprobs.keys()))
            )
            next_words = []
            next_probs = []
            penalty_factor = 0.8
            for token in next_tokens:
                next_words.append(token)
                s_prob = math.exp(supporting_logprobs.get(token, -10))
                a_prob = math.exp(antagonist_logprobs.get(token, -10))
                # Energy
                all_prob = (1 + desire) * s_prob + (1 - desire) * a_prob
                logger.info((token, s_prob, a_prob, desire, all_prob))
                print('')
                if (
                    "factors" in token
                    or "reason" in token
                    or "take-away" in token
                    or "Why" in token
                    or "defination" in token
                    or "correlation" in token
                    or "relationship" in token
                    or "{" in token
                ):
                    all_prob = 1e-9
                if len(result) > 0 and token == result[-1]:  # 如果 token 是上一个生成的字符
                    all_prob *= penalty_factor
                next_probs.append(all_prob)
                # Gedi：
                # all_prob = (1 - desire) * s_prob + (1 + desire) * a_prob
                # if (
                #     "factors" in token
                #     or "reason" in token
                #     or "take-away" in token
                #     or "Why" in token
                # ):
                #     all_prob = 1e9
                # if desire > 0:
                #     next_probs.append(s_prob * s_prob / all_prob)
                # else:
                #     next_probs.append(a_prob * a_prob / all_prob)
            next_probs = np.array(next_probs)
            # softmax
            next_probs = np.exp(next_probs - np.max(next_probs))
            next_probs = next_probs / next_probs.sum()
            next_word = next_words[np.argmax(next_probs)]
            result += next_word.strip() + " "
            logger.info(next_word)
        
        #合并截断的单词
        words = result.split()
        i = 0
        merged_words = []
    
        while i < len(words):
            # 初始化临时拼接字符串
            combined = words[i]
            found_word = False
        
            # 从当前片段向后尝试逐步拼接
            for j in range(i + 1, len(words)):
                combined += words[j]
                # 如果拼接出的结果是合法单词
                if combined in SpellChecker():
                    merged_words.append(combined)
                    i = j + 1  # 更新索引以跳过已合并的部分
                    found_word = True
                    break
                    
            # 如果没有找到有效的拼接词，则当前片段保持不变
            if not found_word:
                merged_words.append(words[i])

            # 移动到下一个片段
                i += 1
        result = ' '.join(merged_words)
        #####

        logger.gpt(result)
        print(result)
        self.resetOpenAIAgent()
        return {"question": result, "stage": ""}

    def filter_facts(self, data_facts):
        index = {}
        result = []
        for fact in data_facts:
            if str(fact) in index.keys():
                continue
            index[str(fact)] = True
            result.append(fact)
        print("filter: {} -> {}".format(len(data_facts), len(result)))
        return result

    def caption(
        self, data_story: List[DataFact], data_summary, key_point
    ) -> List[DataFact]:
        data_story_with_caption = []
        for fact in data_story:
            self.reset()
            self.messages.append(SystemMessage(content=caption_system))
            prompt = caption_template.format(
                data_story=[
                    fact.to_dict(
                        description=False, stage=False, csv=False, question=False
                    )
                ],
                data_summary=fact.question,
                key_point=key_point,
            )
            self.messages.append(HumanMessage(content=prompt))
            response = self.chat()
            response = self.tryJsonDecode(response)
            caption = response.content
            caption = json.loads(caption)["output"]
            fact.description = caption
            data_story_with_caption.append(fact)
        return data_story_with_caption

    def explain_plot(self, theme, plot, y):
        prompt = f'Here is a plot with a theme. Their relationship is the plot supports the theme through introducing extra information. Please explain how the plot supports the theme. The answer should start with `The plot supports the theme as` and within 20 words!!!In the format of JSON:{{"output": <your response>}}\n\nTheme: {theme}\nPlot: {plot}'
        if y < 0:
            prompt = f'Here is a plot with a theme. Their relationship is the plot supports the theme through introducing extra information. Please explain how the plot challenges the theme. The answer should start with `The plot challenges the theme as` and within 20 words!!!In the format of JSON:{{"output": <your response>}}\n\nTheme: {theme}\nPlot: {plot}'
        self.reset()
        self.messages.append(HumanMessage(content=prompt))
        response = self.chat()
        response = self.tryJsonDecode(response)
        print("explain ", response.content)
        try:
            result = json.loads(response.content)["output"]
        except:
            return ""
        return result

    def _get_log_prob(self, response):
        if GEDI_MODE == "openai":
            if response.response_metadata["logprobs"] is None:
                return {response.content.split(" ")[0]: 1}
            probs = response.response_metadata["logprobs"]["content"][0]["top_logprobs"]
            result = {}
            for prob in probs:
                result[prob["token"]] = prob["logprob"]
            return result
        else:
            return {
                t["token"]: float(t["logprob"])
                for t in response["choices"][0]["logprobs"]["top_logprobs"]
            }

    def reset(self):
        self.messages = []
