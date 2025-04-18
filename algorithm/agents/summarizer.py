import json
import warnings
import pandas as pd

from typing import Union
from llmx import TextGenerationConfig
from llmx import TextGenerator

from common.utils import read_dataframe, clean_code_snippet, check_datetime64_any_dtype
from logger import logger


system_prompt = """
You are an experienced data analyst that can annotate datasets. Your instructions are as follows:
i) ALWAYS generate the name of the dataset
ii) ALWAYS generate a field description.
You must return an updated JSON dictionary without any preamble or explanation.
"""


class Summarizer:
    def __init__(self) -> None:
        self.summary = None

    def check_type(self, dtype: str, value):
        """Cast value to right type to ensure it is JSON serializable"""
        if "float" in str(dtype):
            return float(value)
        elif "int" in str(dtype):
            return int(value)
        else:
            return value

    def get_column_properties(self, df: pd.DataFrame, n_samples: int = 3) -> list[dict]:
        """Get properties of each column in a pandas DataFrame"""
        properties_list = []
        for column in df.columns:
            dtype = df[column].dtype
            properties = {}
            if dtype in [int, float, complex]:
                properties["dtype"] = "numerical"
                # properties["std"] = self.check_type(dtype, df[column].std())
                # properties["min"] = self.check_type(dtype, df[column].min())
                # properties["max"] = self.check_type(dtype, df[column].max())

            elif dtype == bool:
                properties["dtype"] = "boolean"
            elif dtype == object:
                # Check if the string column can be cast to a valid datetime
                try:
                    with warnings.catch_warnings():
                        warnings.simplefilter("ignore")
                        pd.to_datetime(df[column], errors="raise")
                        properties["dtype"] = "temporal"
                except ValueError:
                    # Check if the string column has a limited number of values
                    if df[column].nunique() / len(df[column]) < 0.5:
                        properties["dtype"] = "categorical"
                    else:
                        properties["dtype"] = "string"
            elif pd.api.types.is_categorical_dtype(df[column]):
                properties["dtype"] = "categorical"
            elif pd.api.types.is_datetime64_any_dtype(df[column]):
                properties["dtype"] = "temporal"
            else:
                properties["dtype"] = str(dtype)

            # add min max if dtype is date
            if properties["dtype"] == "temporal":
                try:
                    properties["min"] = df[column].min()
                    properties["max"] = df[column].max()
                except TypeError:
                    cast_date_col = pd.to_datetime(df[column], errors="coerce")
                    properties["min"] = cast_date_col.min()
                    properties["max"] = cast_date_col.max()
            # Add additional properties to the output dictionary
            nunique = df[column].nunique()
            if "samples" not in properties:
                non_null_values = df[column][df[column].notnull()].unique()
                n_samples = min(n_samples, len(non_null_values))
                samples = (
                    pd.Series(non_null_values)
                    .sample(n_samples, random_state=42)
                    .tolist()
                )
                properties["samples"] = samples
            # properties["num_unique_values"] = nunique
            properties["description"] = ""
            properties_list.append({"field name": column, "properties": properties})

        return properties_list

    def encrich(
        self,
        base_summary: dict,
        text_gen: TextGenerator,
        textgen_config: TextGenerationConfig,
    ) -> dict:
        """Enrich the data summary with descriptions"""

        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "assistant",
                "content": f"""Annotate the dictionary below. Only return a JSON object.{base_summary}""",
            },
        ]

        logger.prompt(messages[-1]["content"])
        response = text_gen.generate(messages=messages, config=textgen_config)
        enriched_summary = base_summary
        try:
            json_string = clean_code_snippet(response.text[0]["content"])
            enriched_summary = json.loads(json_string)
        except json.decoder.JSONDecodeError:
            error_msg = f"The model did not return a valid JSON object while attempting to generate an enriched data summary. Consider using a base summary. {response.text[0]['content']}"
            print(response.text[0]["content"])
            raise ValueError(error_msg + "" + response.usage)
        logger.gpt(enriched_summary)
        return enriched_summary

    def summarize(
        self,
        data: Union[pd.DataFrame, str],
        text_gen: TextGenerator,
        file_name="",
        n_samples: int = 3,
        textgen_config=TextGenerationConfig(n=1),
        summary_method: str = "default",
    ) -> dict:
        """Summarize data from a pandas DataFrame or a file location"""

        # if data is a file path, read it into a pandas DataFrame, set file_name to the file name
        if isinstance(data, str):
            file_name = data.split("/")[-1]
            data = read_dataframe(data)
            timestamp_columns = [
                col for col in data.columns if check_datetime64_any_dtype(data[col])
            ]
            for col in timestamp_columns:
                data[col] = pd.to_datetime(data[col])
                data[col + "_year"] = data[col].dt.year
                data[col + "_month"] = (
                    data[col].dt.to_period("M").apply(lambda x: str(x))
                )
                data[col + "_day"] = data[col].dt.to_period("D").apply(lambda x: str(x))
        data_properties = self.get_column_properties(data, n_samples)

        # default single stage summary construction
        base_summary = {
            "name": file_name.split(".")[0],
            "fields": data_properties,
        }

        data_summary = base_summary

        if summary_method == "llm":
            # two stage summarization with llm enrichment
            data_summary = self.encrich(
                base_summary, text_gen=text_gen, textgen_config=textgen_config
            )
        elif summary_method == "columns":
            # no enrichment, only column names
            data_summary = {
                "name": file_name,
                # "dataset_description": "",
            }

        return data_summary

    # def schema(
    #     self,
    #     data: Union[pd.DataFrame, str],
    # ):
    #     schema = self.get_column_type(data)
    #     return schema
