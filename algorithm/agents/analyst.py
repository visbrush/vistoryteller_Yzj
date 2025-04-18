import json
from typing import List

import pandas as pd
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from tqdm import tqdm

from agents import Agent
from agents.reviewer import CriticResult
from common.preamble import DATA_FACT_PREAMBLE, DATA_FACT_DEFINATION
from common.fact import DATA_FACT_TYPES, DataFact
from logger import logger


answer_template = """
You task is to answer the `Question` in the data-driven way based on the `Data Schema`.
Directly return the detailed data operation to get the insight to answer the question step-by-step.
The steps must be in the style of instruction and must not include any result, reason or abstract description!!!
The steps must be in the logic of data exploration and must be executable on the `Data Schema`.
Output format carefully referenced `Format Example` which is a JSON format. Do not include irrelevant information or any transitional sentences in the answer body.
# Data Schema
-----
{data_summary}
-----
# Question
-----
{question}
-----
# Format Example
-----
{{
    "output": [
        <step 1>,
        <step 2>,
        ...
    ]
}}
-----
"""

answer_trim_template = """The steps are too complicated, consolidate it into no more than five steps!!! You can combine multiple step into one."""

project_system = f"""You are an experienced data analyst, and you need to develop a logical analysis sequence based on the given data schema. This analysis sequence can include the following types of insights:
{DATA_FACT_DEFINATION}
"""

project_template = """
Your task is to generate a sequence of insights to represent the given `instruction`.
The content must be one of the `Data Fact` candidates: {{ {data_fact_types} }}.

Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.
# Data Schema
-----
{data_summary}
-----
# Instruction
-----
{instruction}
-----
# Format Example
-----
{{
    "output": [
        {{
            "insight": "<insight type>",
            "reason": <why this insight is chosen>"
        }},
        ...
    ]
}}
-----
"""

sql_template = """
Based on these insights, your next task is to generate one SQL statement for the each insight to get the corresponding data.
1. If there are WHERE clause in the SQL statement, for each filter conditions in WHERE clause, convert it into the format of `subspace`.
2. Identify all the column names used in the GROUP BY clause and list them as 'breakdown' (only column name, don't include the table name). 
3. For the columns in the SELECT clause, identify those that are aggregated and list their alias (if any) along with the aggregation function used (such as SUM, COUNT, AVG, etc.) as 'aggregate'.
Every column must be in the `Data Schema`!!!
Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.
# Data Schema
-----
{data_summary}
-----
# Format Example
-----
{{
    "output": [
        {{
            "type": "insight type",
            "subspace": [
                {{
                    "field": "<column name>",
                    "operator": "<operator>",
                    "value": "<value used in filter>"
                }}
            ],
            "breakdown": [<column name>],
            "measure": [
                {{
                    "field": "<column name>",
                    "aggregate": "<aggregation function only if column is grouped, else empty string>"
                }}
            ]
        }}
    ]
}}
-----
"""

project_trim_template = """The insights are too complicated, MUST consolidate it into no more than five insights!!! You can delete some redundant insights or any solution to eliminate the number of steps."""

optimize_template = """
You task is to generate a sequence of data operation to represent the given `instruction`.
There are two types of data operation, SQL and Data Fact.
If the step of instruction is only operated on the data, then generate a corresponding SQL as the content. Only select the necessary column and must not use `*`!!!
If the step of instruction has some semantic meaning, then choose a corresponding `Data Fact` as the content.
The content must be one of the `Data Fact` candidates: {{ {data_fact_types} }}.

Output must contain at most one `SQL` (combine multiple SQL into one) and column must match the ones in `Data Summary`!!!
Output must contain at least one `Data Fact` after each `SQL`!!! 
Output format carefully referenced `format example` which is a JSON format. Do not include irrelevant information in the answer body.
# Data Schema
-----
{data_summary}
-----
# Instruction
-----
{instruction}
-----
# Format Example
-----
{{
    "output": [
        {{
            "operation": "<SQL or data fact>",
            "content": "<sql or one of the Data Fact candidate>"
        }},
        ...
    ]
}}
-----
"""


class Analyst(Agent):
    def __init__(self) -> None:
        super().__init__()
        self.messages = []

    def answerInLanguage(self, outline):
        result = []
        for item in outline:
            self.reset()
            question = item["question"]
            prompt = answer_template.format(
                question=question,
                data_summary=item.get("schema", ""),
            )
            self.messages.append(HumanMessage(content=prompt))
            response = self.chat()
            response = self.tryJsonDecode(response)
            try:
                answer = json.loads(response.content)["output"]
            except:
                answer = ""
            if len(answer) > 5:
                self.messages.append(response)
                self.messages.append(HumanMessage(content=answer_trim_template))
                response = self.chat()
                response = self.tryJsonDecode(response)
                answer = json.loads(response.content)["output"]
            result.append(answer)
        logger.info(result)
        return result

    def language2operation(self, outline, language, data_source) -> List[DataFact]:
        result = []
        pre_focus = []
        for point, answer in tqdm(zip(outline, language), total=len(outline)):
            self.reset()
            ans = answer
            if isinstance(answer[0], dict):
                ans = list(answer[0].values())
            prompt = project_template.format(
                data_fact_types=", ".join(DATA_FACT_TYPES),
                data_summary=point["schema"],
                instruction="\n".join(ans),
            )
            self.messages.append(SystemMessage(content=project_system))
            self.messages.append(HumanMessage(content=prompt))
            response = self.chat()
            response = self.tryJsonDecode(response)
            data_facts = [
                fact["insight"].lower()
                for fact in json.loads(response.content)["output"]
            ]
            if len(data_facts) > 3:
                self.messages.append(response)
                self.messages.append(HumanMessage(content=project_trim_template))
                response = self.chat()
                response = self.tryJsonDecode(response)
                data_facts = [
                    fact["insight"].lower()
                    for fact in json.loads(response.content)["output"]
                ]

            # sql
            self.messages.append(response)
            self.messages.append(
                HumanMessage(content=sql_template.format(data_summary=point["schema"]))
            )
            response = self.chat()
            response = self.tryJsonDecode(response)
            fact_body = json.loads(response.content)["output"]

            # rule check
            if len(fact_body) != len(data_facts):
                self.messages.append(response)
                self.messages.append(
                    HumanMessage(
                        content="""Each insight must have one corresponding SQL statement!!!"""
                    )
                )
                response = self.chat()
                response = self.tryJsonDecode(response)
                fact_body = json.loads(response.content)["output"]

            self.messages.append(response)
            self.messages.append(
                HumanMessage(
                    content="""The breakdown must not be empty if the type is not `value`!!!
The measure must not be empty if the type is not `categorization`"""
                )
            )
            response = self.chat()
            response = self.tryJsonDecode(response)
            fact_body = json.loads(response.content)["output"]

            not_found_column = []
            for fact in fact_body:
                new_subspace = []
                for subspace in fact.get("subspace", []):
                    if subspace["field"] in point["schema"]:
                        new_subspace.append(subspace)
                fact["subspace"] = new_subspace
                for breakdown in fact["breakdown"]:
                    if breakdown not in point["schema"]:
                        not_found_column.append(breakdown)
                if len(fact["breakdown"]) == 0:
                    fact["breakdown"].append("dataid")
                for measure in fact["measure"]:
                    if measure["field"] not in point["schema"] and not measure[
                        "field"
                    ].lower().startswith("count"):
                        not_found_column.append(measure["field"])
            if len(not_found_column) != 0:
                self.messages.append(AIMessage(content=json.dumps(fact_body)))
                self.messages.append(
                    HumanMessage(
                        content="""{} is not in the `Data Schema`!!!""".format(
                            " ".join(not_found_column)
                        )
                    )
                )
                response = self.chat()
                response = self.tryJsonDecode(response)
                fact_body = json.loads(response.content)["output"]

            df = pd.read_csv(point["csv"])
            to_delete_index = []
            for i, fact_dict in enumerate(fact_body):
                if i in to_delete_index:
                    continue
                # type
                if fact_dict["type"] == "categorization":
                    fact_dict["measure"] = []
                elif fact_dict["type"] == "value":
                    fact_dict["breakdown"] = []
                elif fact_dict["type"] == "difference":
                    if (
                        i + 1 < len(fact_body)
                        and fact_body[i + 1]["type"] == "difference"
                        and len(fact_dict["subspace"]) != 0
                    ):
                        pre_focus = [
                            {
                                "field": fact_dict["subspace"][0]["field"],
                                "value": fact_dict["subspace"][0]["value"],
                            },
                            {
                                "field": fact_body[i + 1]["subspace"][0]["field"],
                                "value": fact_body[i + 1]["subspace"][0]["value"],
                            },
                        ]
                        to_delete_index.append(i + 1)

                # subspace
                new_subspace = []
                for subspace in fact_dict["subspace"]:
                    if (
                        subspace["field"] in df.columns
                        and subspace["value"] in df[subspace["field"]]
                    ):
                        new_subspace.append(subspace)
                fact_dict["subspace"] = new_subspace

                # measure
                new_measure = []
                for measure in fact_dict["measure"]:
                    measure["aggregate"] = measure["aggregate"].lower()
                    if measure["field"].lower().startswith("count"):
                        measure["field"] = "dataid"
                    elif measure["field"] not in df.columns:
                        continue
                    for schema in data_source.schema:
                        if measure["field"] == schema["field"]:
                            if schema["type"] == "categorical":
                                measure["aggregate"] = "count"
                    new_measure.append(measure)
                fact_dict["measure"] = new_measure
                if len(fact_dict["measure"]) == 0:
                    fact_dict["measure"] = [{"field": "dataid", "aggregate": "count"}]
                fact_dict["measure"] = fact_dict["measure"][:1]

                # focus
                fact_dict["focus"] = self._get_focus_by_type(
                    fact_dict, point["data"], pre_focus
                )
                pre_focus = fact_dict["focus"]

                csv = point["csv"]
                if fact_dict["type"] == "rank":
                    df = (
                        pd.read_csv(csv)
                        .sort_values(
                            by=fact_dict["measure"][0]["field"], ascending=False
                        )
                        .head(10)
                    )
                    csv = "{}_sorted.csv".format(csv[:-4])
                    df.to_csv(csv, index=False)
                fact = DataFact()
                fact.from_dict(
                    {
                        "data fact": fact_dict,
                        "csv": csv,
                        "question": point["question"],
                    }
                )
                result.append(fact)
        return result

    def _get_focus_by_type(self, fact_dict, data, pre_focus):
        focus = []
        if fact_dict["type"] == "rank":
            data = self._get_grouped_data(
                data,
                fact_dict["breakdown"][0],
                [m["field"] for m in fact_dict["measure"]],
                fact_dict["measure"][0]["aggregate"],
            )
            d = data.nlargest(3, columns=fact_dict["measure"][0]["field"])
            for index in d.index:
                focus.append({"field": fact_dict["breakdown"][0], "value": index})
        elif fact_dict["type"] == "proportion":
            if len(pre_focus) != 0:
                focus = pre_focus
            else:
                data = self._get_grouped_data(
                    data,
                    fact_dict["breakdown"][0],
                    [m["field"] for m in fact_dict["measure"]],
                    fact_dict["measure"][0]["aggregate"],
                )
                d = data.nlargest(1, columns=fact_dict["measure"][0]["field"])
                for index in d.index:
                    focus.append({"field": fact_dict["breakdown"][0], "value": index})
        elif fact_dict["type"] == "difference":
            if len(pre_focus) != 0:
                focus = pre_focus
            else:
                data = self._get_grouped_data(
                    data,
                    fact_dict["breakdown"][0],
                    [m["field"] for m in fact_dict["measure"]],
                    fact_dict["measure"][0]["aggregate"],
                )
                d = data.nlargest(1, columns=fact_dict["measure"][0]["field"])
                for index in d.index:
                    focus.append({"field": fact_dict["breakdown"][0], "value": index})
                d = data.nsmallest(1, columns=fact_dict["measure"][0]["field"])
                for index in d.index:
                    focus.append({"field": fact_dict["breakdown"][0], "value": index})
        elif fact_dict["type"] == "extreme":
            data = self._get_grouped_data(
                data,
                fact_dict["breakdown"][0],
                [m["field"] for m in fact_dict["measure"]],
                fact_dict["measure"][0]["aggregate"],
            )
            d = data.nlargest(1, columns=fact_dict["measure"][0]["field"])
            for index in d.index:
                focus.append({"field": fact_dict["breakdown"][0], "value": index})
        return focus

    def _get_grouped_data(self, data, breakdown, measure, method):
        if method.lower() == "sum":
            return data.groupby(breakdown)[measure].sum()
        elif method.lower() == "count":
            return data.groupby(breakdown)[measure].count()
        elif method.lower() == "avg":
            return data.groupby(breakdown)[measure].mean()
        elif method.lower() == "max":
            return data.groupby(breakdown)[measure].max()
        elif method.lower() == "min":
            return data.groupby(breakdown)[measure].min()
        else:
            return data.groupby(breakdown)[measure].count()

    def optimize(
        self,
        outline,
        suggestion,
        data_story: List[DataFact],
        critic_result: CriticResult,
        data_source,
    ):
        self.reset()
        question = data_story[critic_result.worst_data_fact].question
        point = None
        for p in outline:
            if p["question"] == question:
                point = p
                break
        new_data_facts = self.language2operation(
            [point],
            [suggestion],
            data_source,
        )
        for fact in new_data_facts:
            logger.info(fact.to_dict())
        result = (
            data_story[: critic_result.worst_data_fact]
            + new_data_facts
            + data_story[critic_result.worst_data_fact + 1 :]
        )
        return result

    def reset(self):
        self.messages = []
