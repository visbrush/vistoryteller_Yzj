import json
import pandas as pd
import numpy as np

from typing import Union
from scipy.stats import zscore
from agents import calculateSimilarity, calculateAutocorrelation, calculateSeasonality
from .utils import extract_unique_values, get_column_type


class narfact2json:
    """
    功能:将data fact转换为适应nar图的json形式
    接口:getJson() -> json.parse(str)
    说明:data fact的data部分包含url,schema
        data fact的action部分包含select字段、chart字段、group字段。部分数据类型
        会包含annotation字段、caption字段。
        其中,横轴由breakdown决定,纵轴由measure字段决定,annotation和caption由focus字段决定.
    """

    def __init__(
        self, url: str, schema: [], dataFile: Union[pd.DataFrame, str], isMergeTable
    ) -> None:
        """
        功能:init
        input1:data fact(dict形式)
        input2:url(str形式)
        input3:schema(list形式)
        input4:narType(nar图的形式) # 暂时取消这个输入，由数据类型自动确定
        """
        self.isMergeTable = isMergeTable
        self.schema = schema
        # 字典形式的data fact
        self.dictionary = {}
        # 转换的json，初始为一个空字典
        self.json = {}
        # 设置nar图的形式(若data fact的type不符合nar图形式，则按默认的形式展示)
        self.narType = ""
        # 初始化json的data1部分
        self.reset(url, schema)
        # annotation添加方式
        self.atype = "fill"
        # 储存focus字段
        self.focusFIelds = []
        self.focusValues = []
        self.focusColor = "#FF00FF"
        # 储存breakdown字段
        self.breakdownField = ""
        # 储存measure字段
        self.measureFunc = ""
        self.measureField = ""
        # caption
        self.caption = ""
        # 每一种数据类型对应一种类型的数据表格
        self.type2form = {
            "value": "bar",
            "distribution": "bar",
            "outlier": "bar",  # 或line
            "extreme": "bar",  # 或line
            "categorization": "unit",
            "difference": "bar",
            "proportion": "arc",
            "rank": "bar",
            "association": "point",
            "similarity": "line",
            "seasonality": "line",
            "trend": "line",
        }
        # 根据subspace，measure等信息计算得到的数据
        self.userfulData = None
        # 是否添加animation
        self.animation = False
        if isinstance(dataFile, str):
            self.data = pd.read_csv(dataFile)
        else:
            self.data = dataFile

    def reset(self, url: str, schema: []) -> None:
        self.json = {}
        self.json["data"] = {"url": url, "schema": schema}
        # style
        self.chartWidth = 139
        self.chartHeight = 111

    def setChartSize(self, WH):
        self.chartHeight = WH[0]
        self.chartWidth = WH[1]

    def setAnimation(self, ani):
        self.animation = ani

    def addAnnotation(self, method, target) -> {}:
        annotation = {"add": "annotation", "method": method, "target": target}
        if self.animation == True:
            animation = {"duration": 1000}
            annotation["animation"] = animation
        return annotation

    def addGroup(self) -> {}:
        type = self.dictionary["type"]
        if type == "proportion":
            dict = {
                "add": "encoding",
                "channel": "theta",
                "field": self.measureField[0],
            }
            group = dict
        elif type == "association":
            dictx = {"add": "encoding", "channel": "x", "field": self.measureField[0]}
            dicty = {"add": "encoding", "channel": "y", "field": self.measureField[1]}
            group = {"add": "group", "actions": [dictx, dicty]}
        else:
            dictx = {"add": "encoding", "channel": "x", "field": self.breakdownField}
            dicty = {"add": "encoding", "channel": "y", "field": self.measureField[0]}
            group = {"add": "group", "actions": [dictx, dicty]}

        if self.animation == True:
            animation = {"duration": 1000}
            group["animation"] = animation
        return group

    def addChart(self) -> {}:
        data = {"add": "chart", "mark": {"type": self.narType}}
        return data

    def addSelect(self, filter) -> {}:
        type = self.dictionary["type"]
        select = []
        if self.isMergeTable == True:
            if type == "association":
                select.append(
                    {"field": self.measureField[0], "aggregate": self.measureFunc[0]}
                )
                select.append(
                    {"field": self.measureField[1], "aggregate": self.measureFunc[1]}
                )
            elif type != "categorization":
                select.append(
                    {"field": self.measureField[0], "aggregate": self.measureFunc[0]}
                )
        else:
            if type == "association":
                select.append({"field": self.measureField[0]})
                select.append({"field": self.measureField[1]})
            elif type != "categorization":
                select.append({"field": self.measureField[0]})

        # data = {
        #     "select": select,
        # }
        data = {
            "select": select,
            "filter": filter,
        }
        if self.breakdownField is not None and len(self.breakdownField) != 0:
            select.append({"field": self.breakdownField})
            data["groupby"] = [{"field": self.breakdownField}]
        return data

    def addCaption(self, text, style={}) -> {}:
        defaultstyle = {}
        if style != "":
            caption = {"add": "caption", "text": text, "style": style}
        else:
            caption = {"add": "caption", "text": text, "style": defaultstyle}
        if self.animation == True:
            animation = {"duration": 1000}
            caption["animation"] = animation
        return caption

    def addConfig(self):
        config = {
            "add": "config",
            "mode": "light",
            "width": self.chartWidth,
            "height": self.chartHeight,
        }
        return config

    def filterSubspace(self):
        subspace_filters = self.dictionary["subspace"]
        filtered_df = self.data.copy()
        filter_condition = pd.Series(True, index=self.data.index)
        for condition in subspace_filters:
            try:
                field = condition["field"]
                operator = condition["operator"]
                value = condition["value"]
                if field in filtered_df.columns:
                    if any(filtered_df[field] == value):
                        if operator == ">=":
                            filter_condition = filtered_df[field] >= value
                        elif operator == "<=":
                            filter_condition = filtered_df[field] <= value
                        elif operator == ">":
                            filter_condition = filtered_df[field] > value
                        elif operator == "<":
                            filter_condition = filtered_df[field] < value
                        elif operator == "=":
                            filter_condition = filtered_df[field] == value
            except Exception as e:
                print("subspace填充错误,取所有值")

        filtered_df = filtered_df[filter_condition]
        return filtered_df

    def ParseField(self, dicfield, getname):
        type = self.dictionary["type"]
        filters = dicfield
        fields = []
        aggs = []
        for filter_condition in filters:
            field = filter_condition.get("field")
            if field is None:
                continue
            agg = filter_condition.get(getname)
            if field not in self.data.columns:
                raise Exception("invalid field: ", field)
            if field == self.breakdownField:
                field = "dataid"
            if agg not in ["avg", "count", "sum", "max", "min"]:
                agg = ""
            fields.append(field)
            aggs.append(agg)

        if getname == "aggregate" and type == "association" and len(aggs) == 1:
            numerical_fields = [
                d["field"] for d in self.schema if d["type"] == "numerical"
            ]
            # 找到第一个非匹配的字段
            first_non_matching_field = next(
                (field for field in numerical_fields if field != fields[0]), None
            )
            if first_non_matching_field is not None:
                fields.append(first_non_matching_field)
            else:
                fields.append("dataid")
            assAgg = aggs[0]
            aggs.append(assAgg)
        return fields, aggs

    def parseFact(self) -> None:
        self.narType = self.type2form.get(self.dictionary.get("type", "value"), "value")
        # print('narTyep:'+self.narType)

        if len(self.dictionary["focus"]) != 0:
            self.focusFIelds, self.focusValues = self.ParseField(
                self.dictionary["focus"], "value"
            )
        # 处理measure字段,根据data fact，获取其中的aggregate和field
        if self.dictionary.get("measure") and any(
            "field" in item for item in self.dictionary["measure"]
        ):
            self.measureField, self.measureFunc = self.ParseField(
                self.dictionary["measure"], "aggregate"
            )
        # 根据subspace和measureFunc等信息，获取关注的数据范围
        # value字段没有breakdown跳过处理
        type = self.dictionary["type"]
        if len(self.dictionary["breakdown"]) == 0:
            if type == "value":
                return
            elif type != "value":
                self.breakdownField = "dataid"
        elif len(self.dictionary["breakdown"]) != 0:
            self.breakdownField = self.dictionary["breakdown"][0]
            if type != "association" and type != "categorization":
                if self.breakdownField == self.measureField[0]:
                    self.measureField[0] = "dataid"
        breakdown = self.breakdownField
        # print('self.data',self.data)

        if (
            self.dictionary["type"] == "categorization"
            or self.dictionary["type"] == "association"
        ):
            if self.dictionary["subspace"] != "":
                udf = self.filterSubspace()
            else:
                udf = self.data
            self.userfulData = udf.groupby(breakdown)
        elif self.dictionary["type"] == "value":
            self.userfulData = self.data
        else:
            agg = self.measureFunc[0]
            if self.dictionary["subspace"] != "":
                udf = self.filterSubspace()
                if agg.lower() == "sum":
                    self.userfulData = udf.groupby(breakdown)[self.measureField].sum()
                elif agg.lower() == "count":
                    self.userfulData = udf.groupby(breakdown)[self.measureField].count()
                elif agg.lower() == "avg":
                    self.userfulData = udf.groupby(breakdown)[self.measureField].mean()
                elif agg.lower() == "max":
                    self.userfulData = udf.groupby(breakdown)[self.measureField].max()
                elif agg.lower() == "min":
                    self.userfulData = udf.groupby(breakdown)[self.measureField].min()
                else:
                    self.userfulData = udf.groupby(breakdown)[self.measureField].mean()
            else:
                if agg.lower() == "sum":
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].sum()
                elif agg.lower() == "count":
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].count()
                elif agg.lower() == "avg":
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].mean()
                elif agg.lower() == "max":
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].max()
                elif agg.lower() == "min":
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].min()
                else:
                    self.userfulData = self.data.groupby(breakdown)[
                        self.measureField
                    ].count()
            # print("self.userfulData", self.userfulData)

    def addFilter(self):
        filter = []
        subspace_filters = self.dictionary["subspace"]
        for condition in subspace_filters:
            try:
                operator = condition["operator"]
                if operator == ">=":
                    op = "greaterthan"
                elif operator == "<=":
                    op = "lessthan"
                elif operator == ">":
                    op = "greater"
                elif operator == "<":
                    op = "less"
                elif operator == "=":
                    op = "equal"
                specific_filter = {
                    "field": condition["field"],
                    "value": condition["value"],
                    "op": op,
                }
                filter.append(specific_filter)
            except Exception as e:
                return []
        return filter

    def addAction(self) -> {}:
        # print('addAction(')
        self.json["actions"] = []
        type = self.dictionary["type"]
        subspaceFilter = self.addFilter()
        # if type != 'value':
        self.json["actions"].append(self.addConfig())
        # print(self.json['actions'])
        self.json["actions"].append(self.addSelect(subspaceFilter))
        # print(self.json['actions'])
        self.json["actions"].append(self.addChart())
        # print(self.json['actions'])
        if type != "categorization" and type != "value":
            self.json["actions"].append(self.addGroup())
        # self.json['actions'].append(self.addCaption(self.caption,'',{}))

    def addAnnotations(self):
        type = self.dictionary["type"]

        if type == "extreme":
            self.addExtreme()
        elif type == "outlier":
            self.addOutlier()
        elif type == "value":
            self.addValue()
        elif type == "association":
            self.addAssociation()
        elif type == "rank":
            self.addRank()
        elif type == "proportion":
            self.addProportion()
        elif type == "difference":
            self.addDifference()
        elif type == "similarity":
            self.addSimilarity()
        elif type == "seasonality":
            self.addSeasonality()
        else:
            for index in range(len(self.focusValues)):
                # 加个判断focusvalue是否在breakdown里面
                target = [
                    {"field": self.breakdownField, "value": self.focusValues[index]}
                ]
                self.json["actions"].append(self.addAnnotation(self.atype, target))

    def addAssociation(self):
        target = []
        self.json["actions"].append(self.addAnnotation("regression", target))

    def addRank(self):
        # print('rank usefuldata',self.userfulData)
        d = self.userfulData.nlargest(3, columns=self.measureField[0])
        # print('rank high',d)
        for index in d.index:
            target = [{"field": self.breakdownField, "value": index}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))

    def addProportion(self):
        if len(self.dictionary["focus"]) != 0:
            target = [{"field": self.breakdownField, "value": self.focusValues[0]}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))
        else:
            d = self.userfulData.nlargest(1, columns=self.measureField[0])
            for index in d.index:
                target = [{"field": self.breakdownField, "value": str(index)}]
                self.json["actions"].append(self.addAnnotation(self.atype, target))

    def addDifference(self):
        d = self.userfulData.nlargest(1, columns=self.measureField[0])
        s = self.userfulData.nsmallest(1, columns=self.measureField[0])
        for index in d.index:
            target = [{"field": self.breakdownField, "value": index}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))
        for index in s.index:
            target = [{"field": self.breakdownField, "value": index}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))
        if len(self.dictionary["focus"]) != 0:
            target = [{"field": self.breakdownField, "value": self.focusValues[0]}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))

    def addValue(self):
        field = self.measureField[0]
        agg = self.measureFunc[0]
        # print("addValue", agg)
        if self.dictionary["subspace"] != "":
            udf = self.filterSubspace()
            if agg == "sum":
                value = udf[field].sum()
            elif agg == "count":
                value = udf[field].count()
            elif agg == "avg":
                value = udf[field].mean()
            # elif agg == 'unique':value = udf[field].unique()
            else:
                agg = "count"
                value = udf[field].count()
        else:
            if agg == "sum":
                value = self.data[field].sum()
            elif agg == "count":
                value = self.data[field].count()
            elif agg == "avg":
                value = self.data[field].mean()
            elif agg == "unique":
                value = self.data[field].unique()
            else:
                agg = "count"
                value = self.data[field].count()
        # print(value)
        captionText = f"{agg} of {field}"
        captionValueText = f"{value}"
        # 根据宽度选择caption style
        captionTextStyle = {
            "font-color": "#FFCD00",
            "font-weight": "bold",
            "font-size": 14,
            "position": "top-center",
            "top-padding": 15,
        }
        captionValueTextStyle = {
            "font-color": "#AACDFF",
            "font-weight": "bold",
            "font-size": 24,
            "position": "top-center",
            "top-padding": 100,
        }
        self.json["actions"].append(self.addCaption(captionText, captionTextStyle))
        self.json["actions"].append(
            self.addCaption(captionValueText, captionValueTextStyle)
        )

    def addOutlier(self):
        data = self.userfulData
        data = data[self.measureField[0]].values.reshape(-1)
        # print('outlier',data[self.measureField[0]], data[self.measureField[0]].values.reshape(-1))
        z_scores = zscore(data)
        abs_z_scores = np.abs(z_scores)
        max_z_score = np.max(abs_z_scores)
        outlier_index = np.where(abs_z_scores == max_z_score)[0]

        for index in outlier_index:
            target = [
                {
                    "field": self.breakdownField,
                    "value": str(self.userfulData.index.values[outlier_index][0]),
                }
            ]
            self.json["actions"].append(self.addAnnotation(self.atype, target))

    def addExtreme(self):
        grouped_data = self.userfulData
        max_sum = grouped_data.max()
        max_group = grouped_data[grouped_data == max_sum].dropna()
        min_sum = grouped_data.min()
        min_group = grouped_data[grouped_data == min_sum].dropna()

        for index, row in max_group.iterrows():
            target = [{"field": self.breakdownField, "value": index}]
            self.json["actions"].append(self.addAnnotation(self.atype, target))
        # for index, row in min_group.iterrows():
        #     target=[{"field":self.breakdownField,"value":index}]
        #     self.json['actions'].append(self.addAnnotation(self.atype,target))

    def addSimilarity(self):
        data = self.userfulData
        breakdown = self.breakdownField
        data = data[self.measureField[0]].values.reshape(-1)
        sorted_result = calculateSimilarity(data)
        start = sorted_result["start"]
        end = sorted_result["end"]
        udf = self.filterSubspace()
        for s, e in zip(start, end):
            target = []
            rowstart = udf.iloc[s]
            rowend = udf.iloc[e]
            target.append({"field": breakdown, "value": rowstart[breakdown]})
            target.append({"field": breakdown, "value": rowend[breakdown]})
            self.json["actions"].append(self.addAnnotation("seasonality", target))

    def addSeasonality(self):
        data = self.userfulData
        breakdown = self.breakdownField
        data = data[self.measureField[0]].values.reshape(-1)
        sorted_result = calculateSeasonality(data)
        start = sorted_result["start"]
        end = sorted_result["end"]
        udf = self.filterSubspace()
        # print(udf)
        for s, e in zip(start, end):
            target = []
            rowstart = udf.iloc[s]
            rowend = udf.iloc[e]
            target.append({"field": breakdown, "value": rowstart[breakdown]})
            target.append({"field": breakdown, "value": rowend[breakdown]})
            self.json["actions"].append(self.addAnnotation("seasonality", target))

    def getJson(self, datafact) -> str:
        """
        功能:接口函数，得到json格式的nar图
        输出:json格式的str类型
        说明:需要添加其他的字段，比如title等，只需要在self.json中添加即可
        """
        # print('in'
        # )
        self.dictionary = datafact
        self.parseFact()
        self.addAction()
        self.addAnnotations()
        # print(self.json)
        # print("self.json", self.json)
        json_obj = json.dumps(self.json)
        return json_obj


class graphfact2json:
    def __init__(self, url: str) -> None:
        self.dictionary = {}
        self.json = {}
        # 初始化json的data部分
        self.reset(url)
        self.caption = ""
        self.usefulData = None
        self.animation = False

    def reset(self, url: str) -> None:
        self.json = {}
        self.json["data"] = {
            "url": url,
        }
        # style
        self.chartWidth = 139
        self.chartHeight = 111

    def setChartSize(self, WH):
        self.chartHeight = WH[0]
        self.chartWidth = WH[1]

    def setAnimation(self, ani):
        self.animation = ani

    def parseFact(self):
        facttype = self.dictionary["type"]
        breakdownField = self.dictionary["breakdown"][0]
        measureField = self.dictionary["measure"][0]["field"]
        measureFunc = self.dictionary["measure"][0]["aggregate"]
        validMeasureFunc = ["in", "out"]

        if measureFunc in validMeasureFunc:
            charttype = facttype + measureFunc
        else:
            charttype = facttype + "in"
        chart = {
            "type": charttype,
            "width": self.chartWidth,
            "height": self.chartHeight,
        }
        self.json["chart"] = chart
        self.json["fact"] = self.dictionary

    def getJson(self, datafact) -> str:
        self.dictionary = datafact
        self.parseFact()
        json_obj = json.dumps(self.json)
        return json_obj


# 增加了一个isMergeTable用于判断url是否是mergetable
def datafacts2json(datafacts, url, animation, isMergeTable):
    if not isinstance(url, list):
        url = [url]
    jsonlists = []
    schemas = []
    uniqueResults = []

    length = len(datafacts)
    graphtype = ["adjacency", "accessibility", "connectivity"]
    graph = graphfact2json(url=url)

    for i in range(0, length):
        # 获得每个url的schema
        schemaDf = pd.read_csv(url[i].replace("\\", "/"))
        schemaDf["dataid"] = range(1, len(schemaDf) + 1)
        schema = get_column_type(schemaDf)
        # uniqueResult = extract_unique_values(schemaDf, schema)
        # schemas.append(schema)
        # uniqueResults.append(uniqueResult)

        # print(datafacts[i])
        if datafacts[i]["type"] in graphtype:
            graph.setChartSize([200, 200])
            json = graph.getjson(datafacts[i])
            jsonlists.append(json)
        else:
            nar = narfact2json(
                url=url[i], schema=schema, dataFile=schemaDf, isMergeTable=isMergeTable
            )

            nar.setChartSize([200, 200])
            nar.setAnimation(animation)
            json = nar.getJson(datafacts[i])
            jsonlists.append(json)
            # print(json)
    # return jsonlists, schemas, uniqueResults
    return jsonlists
