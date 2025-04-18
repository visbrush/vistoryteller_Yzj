import enum
import pandas as pd
import os
import uuid


from .utils import check_datetime64_any_dtype, template4ontology
from .utils import extract_unique_values, get_column_type


class DataSource:
    def __init__(self, file_paths: list, ontology_path) -> None:
        self.files = file_paths
        self.dir = os.path.dirname(self.files[0])
        self.name = ontology_path.split("/")[-1][:-4]
        with open(ontology_path, "r") as file:
            self.ontology = file.read().splitlines()
            self.ontology, self.joinable_map = template4ontology(self.ontology)

        self.dataframe = {}
        self.entities = []
        self.schema = [{"field": "dataid", "type": "numerical"}]
        self.uniqueResults = {}
        self.column2csv = {}
        for d in self.files:
            entity = d.split("/")[-1][:-4]
            self.entities.append(entity)
            self.dataframe[entity] = pd.read_csv(d)
            internalSchema = get_column_type(self.dataframe[entity])
            self.schema += internalSchema
            self.uniqueResults.update(
                extract_unique_values(self.dataframe[entity], internalSchema)
            )
            self.column2csv[entity] = entity
            for column in self.dataframe[entity].columns:
                self.column2csv[column] = entity
        # 去掉schema中重复出现的field
        seen_fields = set()
        unique_schema = []
        for column in self.schema:
            if column["field"] not in seen_fields:
                seen_fields.add(column["field"])
                unique_schema.append(column)
        self.schema = unique_schema
        print(self.schema)
        print("read csvs: {}".format(self.dataframe.keys()))

    def getDataFactData(self, data_fact):
        df_names = set()
        print(self.column2csv.keys())
        for column in data_fact["breakdown"]:
            if column in self.column2csv.keys():
                df_names.add(self.column2csv[column])
        for column in data_fact["measure"]:
            if "field" in column:
                if column["field"] in self.column2csv.keys():
                    df_names.add(self.column2csv[column["field"]])
        df_names = self.get_joinable_dfs(df_names)
        dfs = []
        for name in df_names:
            dfs.append(self.dataframe[name])

        if len(dfs) > 1:
            # print("dfs ", dfs)
            result = dfs[0]
            for i in range(1, len(dfs)):
                current_df = dfs[i]
                # print("columns ", current_df.columns)
                join_columns = list(result.columns.intersection(current_df.columns))
                if len(join_columns) != 0:

                    result = pd.merge(result, current_df, on=join_columns, how="inner")
                print("result", result)
            print("result columns ", result.columns)
        else:
            result = dfs[0]
        # if data_fact["type"] == "rank":
        #     result = result.sort_values(
        #         by=data_fact["measure"][0]["field"], ascending=False
        #     ).head(10)
        data_path = os.path.join(self.dir, "{}.csv".format(uuid.uuid4()))
        # result["dataid"] = range(1, len(result) + 1)
        result.to_csv(data_path, index=False)
        return data_path

    def get_joinable_dfs(self, df_names):
        result = [df_names.pop()]
        i = 0
        while len(df_names) > 0 and i < 10:
            print(result, df_names)
            current_df = result[i]
            tmp = []
            for df in df_names:
                if df in result:
                    continue
                if self.joinable_map.get(current_df, None) is None:
                    continue
                if df in self.joinable_map[current_df]:
                    result.append(df)
                else:
                    result += self.joinable_map[current_df]
                    tmp.append(df)
            df_names = tmp
            i += 1
        return result


class Task:
    def __init__(self, key_point: str) -> None:
        self.key_point = key_point
        if key_point.startswith("HUAWEI "):
            self.key_point = key_point[6:]
            self.isHuawei = True
        else:
            self.isHuawei = False
