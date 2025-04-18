DATA_FACT_TYPES = [
    "value",
    "rank",
    "proportion",
    "categorization",
    "distribution",
    "difference",
    "extreme",
    "outlier",
    "trend",
    # "autocorrelation",
    # "seasonality",
    # "similarity",
]


class DataFact:
    def __init__(self) -> None:
        self.fact = {}
        self.description = ""
        self.question = ""
        self.stage = ""
        self.csv = ""

    def to_dict(self, description=True, question=True, stage=True, csv=True):
        result = {"data fact": self.fact}
        if description:
            result["description"] = self.description
        if question:
            result["question"] = self.question
        if stage:
            result["stage"] = self.stage
        if csv:
            result["csv"] = self.csv
        return result

    def from_dict(self, fact_dict):
        if "data fact" in fact_dict.keys():
            self.fact = fact_dict["data fact"]
        if "description" in fact_dict.keys():
            self.description = fact_dict["description"]
        if "question" in fact_dict.keys():
            self.question = fact_dict["question"]
        if "stage" in fact_dict.keys():
            self.stage = fact_dict["stage"]
        if "csv" in fact_dict.keys():
            self.csv = fact_dict["csv"]

    def __str__(self) -> str:
        return "[type] {} [subspace] {} [breakdown] {} [measure] {} [focus] {}".format(
            self.fact.get("type", ""),
            "; ".join(
                [
                    "{}={}".format(subspace["field"], subspace["value"])
                    for subspace in self.fact.get("subspace", [])
                ]
            ),
            "; ".join(self.fact.get("breakdown", [])),
            "; ".join(
                [
                    "{}({})".format(measure["aggregate"], measure["field"])
                    if len(measure["aggregate"]) != 0
                    else measure["field"]
                    for measure in self.fact.get("measure", [])
                ]
            ),
            "; ".join(
                [
                    "{}={}".format(focus["field"], focus["value"])
                    for focus in self.fact.get("focus", [])
                ]
            ),
        )
