import re
import json
import time
import warnings
import pandas as pd


def clean_column_names(df):
    # create a copy of the dataframe to avoid modifying the original data
    cleaned_df = df.copy()

    # iterate over column names in the dataframe
    for col in cleaned_df.columns:
        # check if column name contains any special characters or spaces
        if re.search("[^0-9a-zA-Z_]", col):
            # replace special characters and spaces with underscores
            new_col = re.sub("[^0-9a-zA-Z_]", " ", col)
            # rename the column in the cleaned dataframe
            cleaned_df.rename(columns={col: new_col}, inplace=True)

    # return the cleaned dataframe
    return cleaned_df


def datetime64_any_dtype_to(df):
    format_df = df.copy()
    # 整理datatime格式
    for column in format_df.columns:
        if format_df[column].dtype == object:
            # Check if the string column can be cast to a valid datetime
            try:
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    format_df[column] = pd.to_datetime(
                        format_df[column], errors="raise"
                    )
                    format_df[column] = format_df[column].dt.strftime("%Y/%-m/%-d")

            except ValueError:
                continue
        elif pd.api.types.is_datetime64_any_dtype(format_df[column]):
            format_df[column] = format_df[column].dt.strftime("%Y/%-m/%-d")
    return format_df


def read_dataframe(file_location):
    file_extension = file_location.split(".")[-1]
    if file_extension == "json":
        try:
            df = pd.read_json(file_location, orient="records")
        except ValueError:
            df = pd.read_json(file_location, orient="table")
    elif file_extension == "csv":
        df = pd.read_csv(file_location)
    elif file_extension in ["xls", "xlsx"]:
        df = pd.read_excel(file_location)
    elif file_extension == "parquet":
        df = pd.read_parquet(file_location)
    elif file_extension == "feather":
        df = pd.read_feather(file_location)
    elif file_extension == "tsv":
        df = pd.read_csv(file_location, sep="\t")
    else:
        raise ValueError("Unsupported file type")

    # clean column names and check if they have changed
    format_df = datetime64_any_dtype_to(df)
    cleaned_df = clean_column_names(format_df)
    if (
        cleaned_df.columns.tolist() != df.columns.tolist()
        or format_df.equals(df) == False
    ):
        # if len(df) > 4500:or len(df) > 4500
        #    logger.info(f"Dataframe has more than 4500 rows. We will sample 4500 rows.")
        #    cleaned_df = cleaned_df.sample(4500)
        # write the cleaned DataFrame to the original file on disk
        if file_extension == "csv":
            cleaned_df.to_csv(file_location, index=False)
        elif file_extension in ["xls", "xlsx"]:
            cleaned_df.to_excel(file_location, index=False)
        elif file_extension == "parquet":
            cleaned_df.to_parquet(file_location, index=False)
        elif file_extension == "feather":
            cleaned_df.to_feather(file_location, index=False)
        elif file_extension == "json":
            with open(file_location, "w") as f:
                f.write(cleaned_df.to_json(orient="records"))
        else:
            raise ValueError("Unsupported file type")

    return format_df


def clean_code_snippet(markdown_string):
    # Extract code snippet using regex
    code_snippet = re.search(r"```(?:\w+)?\s*([\s\S]*?)\s*```", markdown_string)

    if code_snippet:
        return code_snippet.group(1)
    else:
        return markdown_string


def template4ontology(ontology_model):
    def translate_to_natural_language(triple, joinable):
        triple = triple.replace("`", "")
        triple = triple.replace("<", "")
        triple = triple.replace(">", "")
        subject, predicate, object = triple.split(", ")
        if predicate == "has_property":
            translation = f"Entity `{subject}` has property `{object}`."
        elif predicate == "has_action_type":
            translation = f"Entity `{object}` is used to alter the properties inherent to itself, and these properties are also related to Entity {subject}."
        else:
            translation = f"Entity `{subject}` {predicate} Entity `{object}`."
            tmp = joinable.get(subject, [])
            tmp.append(object)
            joinable[subject] = tmp
            tmp = joinable.get(object, [])
            tmp.append(subject)
            joinable[object] = tmp
        translation = translation.replace(",", "")
        return translation

    joinable_map = {}
    translated_statements = [
        translate_to_natural_language(triple, joinable_map) for triple in ontology_model
    ]

    return translated_statements, joinable_map


def check_datetime64_any_dtype(df):
    flag = False
    if df.dtype == object:
        try:
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                df = pd.to_datetime(df, errors="raise")
                flag = True
        except ValueError:
            return False
    elif pd.api.types.is_datetime64_any_dtype(df):
        flag = True
    return flag


def extract_unique_values(df, schema):
    # Identify categorical and temporal columns based on the schema

    categorical_columns = [
        field["field"] for field in schema if field["type"] == "categorical"
    ]
    temporal_columns = [
        field["field"] for field in schema if field["type"] == "temporal"
    ]
    # print('schema: ',schema)
    # Extract unique values for categorical columns
    result = {}
    for column in categorical_columns:
        value_counts = df[column].value_counts().head(8)
        top_values = value_counts.index.tolist()
        result[column] = top_values

    # Extract min and max values for temporal columns
    for column in temporal_columns:
        min_value = df[column].min()
        max_value = df[column].max()
        result[column] = {"min": min_value, "max": max_value}
    # print('result:',result)
    return result


def get_column_type(df: pd.DataFrame):
    properties_list = []
    for column in df.columns:
        dtype = df[column].dtype
        properties = {}
        properties["field"] = column
        if dtype in [int, float, complex] and "year" not in column:
            properties["type"] = "numerical"

        elif dtype == bool:
            properties["type"] = "boolean"
        elif dtype == object:
            # Check if the string column can be cast to a valid datetime
            try:
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    pd.to_datetime(df[column], errors="raise")
                    properties["type"] = "temporal"
            except ValueError:
                # Check if the string column has a limited number of values
                if df[column].nunique() / len(df[column]) < 0.9 or "year" in column:
                    properties["type"] = "categorical"
                else:
                    properties["type"] = "string"
        elif pd.api.types.is_categorical_dtype(df[column]) or "year" in column:
            properties["type"] = "categorical"
        elif pd.api.types.is_datetime64_any_dtype(df[column]):
            properties["type"] = "temporal"
        else:
            properties["type"] = str(dtype)

        properties_list.append(properties)
    return properties_list
