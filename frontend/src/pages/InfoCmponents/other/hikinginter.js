export const yourSpec_0 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "Gender",
                    "aggregate": "count"
                }
            ],
            "groupby": [
                {
                    "field": ""
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 300
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "caption",
            "text": "count of Gender",
            "style": {
                "font-color": "#FFCD00",
                "font-weight": "bold",
                "font-size": '36px',
                "position": "top-center",
                "top-padding": 40
            }
        },
        {
            "add": "caption",
            "text": "100",
            "style": {
                "font-color": "#AACDFF",
                "font-weight": "bold",
                "font-size": '1.6vw',
                "position": "top-center",
                "top-padding": 100
            }
        }
    ]
}

export const yourSpec_1 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "Age",
                    "aggregate": "avg"
                },
                {
                    "field": "timestamp_member"
                }
            ],
            "groupby": [
                {
                    "field": "timestamp_member"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 330
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "x",
                    "field": "timestamp_member"
                },
                {
                    "add": "encoding",
                    "channel": "y",
                    "field": "Age"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "timestamp_member",
                    "value": "2013/10/19"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "timestamp_member",
                    "value": "2012/10/19"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "timestamp_member",
                    "value": "2027/10/19"
                }
            ]
        }
    ]
}

export const yourSpec_2 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "number",
                    "aggregate": "count"
                },
                {
                    "field": "together"
                }
            ],
            "groupby": [
                {
                    "field": "together"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 300
        },
        {
            "add": "chart",
            "mark": {
                "type": "arc"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "theta",
                    "field": "number"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "together",
                    "value": "2 people"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "label",
            "target": [
                {
                    "field": "together",
                    "value": "2 people"
                }
            ]
        }
    ]
}

export const yourSpec_3 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "number",
                    "aggregate": "count"
                },
                {
                    "field": "Age_amount"
                }
            ],
            "groupby": [
                {
                    "field": "Age_amount"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 300
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "x",
                    "field": "Age_amount"
                },
                {
                    "add": "encoding",
                    "channel": "y",
                    "field": "number"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": [
                        "Age_amount"
                    ],
                    "value": "41-60"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": [
                        "Age_amount"
                    ],
                    "value": "under 20"
                }
            ]
        }
    ]
}

export const yourSpec_4 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "Age",
                    "aggregate": "sum"
                },
                {
                    "field": "Province"
                }
            ],
            "groupby": [
                {
                    "field": "Province"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 300
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "x",
                    "field": "Province"
                },
                {
                    "add": "encoding",
                    "channel": "y",
                    "field": "Age"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "Province",
                    "value": "Shanghai"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "Province",
                    "value": "Heilongjiang"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "Province",
                    "value": "Jiangsu"
                }
            ]
        }
    ]
}

export const yourSpec_5 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "Age",
                    "aggregate": "sum"
                },
                {
                    "field": "Age_amount"
                }
            ],
            "groupby": [
                {
                    "field": "Age_amount"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 380,
            "height": 300
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "x",
                    "field": "Age_amount"
                },
                {
                    "add": "encoding",
                    "channel": "y",
                    "field": "Age"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "Age_amount",
                    "value": "41-60"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "Age_amount",
                    "value": "under 20"
                }
            ]
        }
    ]
}

export const yourSpec_6 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "Goto"
                }
            ],
            "groupby": [
                {
                    "field": "Goto"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 480,
            "height": 420
        },
        {
            "add": "chart",
            "mark": {
                "type": "unit"
            }
        }
    ]
}

export const yourSpec_7 = {
    "data": {
        "url": "http://localhost:3000/spreadsheets/hiking.csv",
        "schema": [
            {
                "field": "Gender",
                "type": "categorical"
            },
            {
                "field": "Age",
                "type": "numerical"
            },
            {
                "field": "Age_amount",
                "type": "categorical"
            },
            {
                "field": "Province",
                "type": "categorical"
            },
            {
                "field": "Goto",
                "type": "categorical"
            },
            {
                "field": "number",
                "type": "numerical"
            },
            {
                "field": "together",
                "type": "categorical"
            },
            {
                "field": "timestamp_member",
                "type": "temporal"
            },
            {
                "field": "timestamp_hiking",
                "type": "temporal"
            }
        ]
    },
    "actions": [
        {
            "select": [
                {
                    "field": "number",
                    "aggregate": "avg"
                },
                {
                    "field": "timestamp_hiking"
                }
            ],
            "groupby": [
                {
                    "field": "timestamp_hiking"
                }
            ],
            "filter": []
        },
        {
            "add": "config",
            "mode": "light",
            "width": 480,
            "height": 420
        },
        {
            "add": "chart",
            "mark": {
                "type": "bar"
            }
        },
        {
            "add": "group",
            "actions": [
                {
                    "add": "encoding",
                    "channel": "x",
                    "field": "timestamp_hiking"
                },
                {
                    "add": "encoding",
                    "channel": "y",
                    "field": "number"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "timestamp_hiking",
                    "value": "2005/11/19"
                }
            ]
        },
        {
            "add": "annotation",
            "method": "fill",
            "target": [
                {
                    "field": "timestamp_hiking",
                    "value": "2008/11/19"
                }
            ]
        }
    ]
}