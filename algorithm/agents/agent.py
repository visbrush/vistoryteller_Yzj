import requests
import functools
import json

import openai
from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from spellchecker import SpellChecker


from common.config import (
    OPENAI_KEY,
    MODEL_NAME,
    OPENAI_API_BASE,
    IDVX_API_BASE,
    IDVX_MODEL_NAME,
    GEDI_MODE,
    GEDI_MODEL,
)
from logger import logger

cache = {}


def OpenAIChatAgent(messages, max_tokens=2048):
    global cache
    cache_key = "\n".join([message.content for message in messages])
    if cache_key in cache.keys():
        print("using cache")
        return cache[cache_key]
    agent = ChatOpenAI(
        openai_api_base=OPENAI_API_BASE,
        openai_api_key=OPENAI_KEY,
        model=MODEL_NAME,
        temperature=0,
        max_tokens=2048,
        logprobs=True,
        top_logprobs=5,
        # response_format={"type": "json_object"},
    )
    response = agent(messages)
    if len(cache) > 10000:
        cache = {}
    cache[cache_key] = response
    return response


def LlamaAgent(prompt, max_token):
    response = requests.post(
        "{}/completions".format(IDVX_API_BASE),
        headers={"Content-Type": "application/json"},
        json={
            "model": IDVX_MODEL_NAME,
            "prompt": prompt,
            "max_tokens": max_token,
            "temperature": 0,
            "logprobs": 1,
        },
    )
    return response.json()


def OpenAIAgent(messages, max_tokens=1):
    # global cache
    # cache_key = "\n".join([message.content for message in messages])
    # if cache_key in cache.keys():
    #     print("using cache")
    #     return cache[cache_key]
    logger.info(max_tokens)
    agent = ChatOpenAI(
        openai_api_base=OPENAI_API_BASE,
        openai_api_key=OPENAI_KEY,
        model=MODEL_NAME,
        temperature=0,
        max_tokens=max_tokens,
        logprobs=True,
        top_logprobs=5,
        # response_format={"type": "json_object"},
    )
    response = agent(messages)
    # print(response)
    # if len(cache) > 10000:
    #     cache = {}
    # cache[cache_key] = response
    return response


class Agent:
    def __init__(self, model_name=MODEL_NAME, max_tokens=2048) -> None:
        self.messages = []
        self.resetOpenAIAgent()
        self.response = []

    def resetOpenAIAgent(self):
        self.agent = OpenAIChatAgent

    def merge_broken_words(sentence):
        words = sentence.split()
        merged_sentence = []
        i = 0
        while i < len(words):
            if i < len(words) - 1:
                combined = words[i] + words[i + 1]
                # 如果合并后形成有效单词，则拼接
                if combined in SpellChecker:
                    merged_sentence.append(combined)
                    i += 2
                else:
                    merged_sentence.append(words[i])
                    i += 1
            else:
                merged_sentence.append(words[i])
                i += 1
        return ' '.join(merged_sentence)

    def resetGediAgent(self):
        if GEDI_MODE == "openai":
            self.agent = OpenAIAgent
        else:
            self.agent = LlamaAgent

    def chat(self, max_tokens=2048):
        logger.prompt(self.messages[-1].content)
        response = self.agent(self.messages, max_tokens)
        logger.gpt(response.content)
        self.response.append(response.content)

        return response

    def summarize_what_has_been_done(self):
        prompt = "Here are some responses from an LLM agent. Please summarize what has been done so far. Answer in the first-person perspective and within 30 words.\n{}".format(
            "\n".join([message for message in self.response])
        )
        logger.prompt(prompt)
        response = self.agent([HumanMessage(content=prompt)], 50)
        logger.gpt(response.content)
        self.response = []
        return response

    def tryJsonDecode(self, response):
        if response.content.startswith("```json"):
            response.content = response.content[6:-3]
        try:
            json.loads(response.content)
        except:
            self.messages.append(
                HumanMessage(
                    content="The following content is not in JSON format, please fix it and only output the fixed content without ```json:"
                    + response.content
                )
            )
            response = self.chat()
            if response.content.startswith("```json"):
                response.content = response.content[6:-3]
        return response
