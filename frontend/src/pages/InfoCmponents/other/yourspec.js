export const yourSpec_0 = 
	{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "trustworthy",
		"background-image": {
		  "url": "https://narchart.github.io/editor/background/company_background.png"
		},
		"width": 984, // (optional)
		"height": 984 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "funded status"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.5,
			"corner-radius": 0,
			//"background-image": {
		  //"url": "https://narchart.github.io/editor/background/company_background.png"
		//},
		  }
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "funded status"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		]
	  }
	]
  };
export const yourSpec_1 =
{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "disturbing",
		"width": 370, // (optional)
    "height": 270 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "funded status"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.3,
			"corner-radius": 3,
			"stroke-width": 1,
			"stroke": "white"
		  }
		},
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "#FE5C34",
		  "font-size": 15,
		  "position": "top-left",
		  "top-padding": 5
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "funded status"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "fade",
		"target": []
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		],
		"style": {
		  "color": "#ABABAB"
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		],
		"style": {
		  "text": "3409",
		  "font-color": "#FF4B19",
		  "font-size": 20,
		  "font-weight": "bold",
		  "font-style": "italic"
		}
	  }
	]
  }
export const yourSpec_test =
  {
	  "data": {
		"url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
		"schema": [
		  {
			"field": "industry",
			"type": "categorical"
		  },
		  {
			"field": "funded status",
			"type": "categorical"
		  },
		  {
			"field": "cause of failure",
			"type": "categorical"
		  },
		  {
			"field": "broken year",
			"type": "temporal"
		  },
		  {
			"field": "survival time",
			"type": "numerical"
		  },
		  {
			"field": "location",
			"type": "categorical"
		  }
		]
	  },
	  "actions": [
		{
		  "add": "config",
		  "mode": "light",
		  "background-color":'white',
		  "emotion": "disturbing",
		  "width": 640, // (optional)
	  "height": 640 // (optional)
		},
		{
		  "select": [
			{
			  "field": "survival time",
			  "aggregate": "average"
			},
			{
			  "field": "location"
			},
			{
			  "field": "funded status"
			},
			{
			  "field": "broken year"
			},
			{
			  "field": "industry"
			},
			{
			  "field": "cause of failure"
			}
		  ],
		  "groupby": [
			{
			  "field": "funded status"
			}
		  ],
		  "filter": []
		},
		{
		  "add": "chart",
		  "mark": {
			"type": "bar",
			"style": {
			  "bin-spacing": 0.3,
			  "corner-radius": 3,
			  "stroke-width": 1,
			  "stroke": "white"
			}
		  },
		},
		{
		  "add": "title",
		  "text": "Dead startups in China",
		  "style": {
			"font-color": "#FE5C34",
			"font-size": 37,
			"font-family": "Georgia",
			"font-style": "italic",
			"position": "top-left"
		  }
		},
		{
		  "add": "caption",
		  "text": "We collected data from itjuzi.com and analyzed the startups in China died between 2010 and 2019. Companies that go public have the longest mean survival time.",
		  "style": {
			"font-color": "#FE5C34",
			"font-size": 15,
			"position": "top-left",
			"top-padding": 5
		  }
		},
		{
		  "add": "group",
		  "actions": [
			{
			  "add": "encoding",
			  "channel": "x",
			  "field": "funded status"
			},
			{
			  "add": "encoding",
			  "channel": "y",
			  "field": "survival time"
			}
		  ]
		},
		{
		  "add": "annotation",
		  "method": "fade",
		  "target": []
		},
		{
		  "add": "annotation",
		  "method": "fill",
		  "target": [
			{
			  "field": "funded status",
			  "value": "Public"
			}
		  ],
		  "style": {
			"color": "#ABABAB"
		  }
		},
		{
		  "add": "annotation",
		  "method": "label",
		  "target": [
			{
			  "field": "funded status",
			  "value": "Public"
			}
		  ],
		  "style": {
			"text": "3409",
			"font-color": "#FF4B19",
			"font-size": 20,
			"font-weight": "bold",
			"font-style": "italic"
		  }
		}
	  ]
	}
export const yourSpec_17 =
  {
	  "data": {
		"url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
		"schema": [
		  {
			"field": "industry",
			"type": "categorical"
		  },
		  {
			"field": "funded status",
			"type": "categorical"
		  },
		  {
			"field": "cause of failure",
			"type": "categorical"
		  },
		  {
			"field": "broken year",
			"type": "temporal"
		  },
		  {
			"field": "survival time",
			"type": "numerical"
		  },
		  {
			"field": "location",
			"type": "categorical"
		  }
		]
	  },
	  "actions": [
		{
		  "add": "config",
		  "mode": "light",
		  "emotion": "disturbing",
		  "width": 290, // (optional)
	  "height": 170 // (optional)
		},
		{
		  "select": [
			{
			  "field": "survival time",
			  "aggregate": "average"
			},
			{
			  "field": "location"
			},
			{
			  "field": "funded status"
			},
			{
			  "field": "broken year"
			},
			{
			  "field": "industry"
			},
			{
			  "field": "cause of failure"
			}
		  ],
		  "groupby": [
			{
			  "field": "funded status"
			}
		  ],
		  "filter": []
		},
		{
		  "add": "chart",
		  "mark": {
			"type": "bar",
			"style": {
			  "bin-spacing": 0.3,
			  "corner-radius": 3,
			  "stroke-width": 1,
			  "stroke": "white"
			}
		  },
		  "style": {
			"background-image": {
			  "url": "https://narchart.github.io/editor/background/company_background2.png"
			}
		  }
		},
		{
		  "add": "group",
		  "actions": [
			{
			  "add": "encoding",
			  "channel": "x",
			  "field": "funded status"
			},
			{
			  "add": "encoding",
			  "channel": "y",
			  "field": "survival time"
			}
		  ]
		},
		{
		  "add": "annotation",
		  "method": "fade",
		  "target": []
		},
		{
		  "add": "annotation",
		  "method": "fill",
		  "target": [
			{
			  "field": "funded status",
			  "value": "Public"
			}
		  ],
		  "style": {
			"color": "#ABABAB"
		  }
		},
		{
		  "add": "annotation",
		  "method": "label",
		  "target": [
			{
			  "field": "funded status",
			  "value": "Public"
			}
		  ],
		  "style": {
			"text": "3409",
			"font-color": "#FF4B19",
			"font-size": 20,
			"font-weight": "bold",
			"font-style": "italic"
		  }
		}
	  ]
	}
export const yourSpec_2 =
	{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "",
		"background-color": {
			"color" : 'white', 
			"opacity":0.1,
			},   
		"width": 290, // (optional)
		"height": 170 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "funded status"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.3,
			"corner-radius": 0,
			"stroke-width": 1,
			"stroke-opacity": 0.7,
			"stroke-color": "white",
			"fill-opacity": 1
		  }
		},
		"style": {}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "funded status"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "reference",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		]
	  }
	]
  }

export const yourSpec_3 = 
{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "calm",
		"background-color": {
			"color" : 'white', 
			"opacity":0.1,
			},  
		"width": 290, // (optional)
		"height": 170 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "funded status"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.3,
			"corner-radius": 3,
			"stroke-width": 1,
			"stroke-opacity": 0.7,
			"stroke-color": "white"
		  }
		},
		"style": {
			"background-image": {
			  "url": "https://narchart.github.io/editor/background/line_chart_background2.png"
			}
		  }
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "white",
		  "font-size": 14,
		  "position": "top-left"
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "funded status"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		],
		"style": {
		  "text": "3409 days",
		  "font-color": "#C7FFFF",
		  "font-size": 20,
		  "font-weight": "bold"
		}
	  }
	]
  }
export const yourSpec_4 = 
{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/sales.csv",
	  "schema": [
		{
		  "field": "Year",
		  "type": "temporal"
		},
		{
		  "field": "Brand",
		  "type": "categorical"
		},
		{
		  "field": "Category",
		  "type": "categorical"
		},
		{
		  "field": "Sales",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "positive",
		"background-image": {
		  "url": "https://narchart.github.io/editor/background/car_background4.jpg",
		  "opacity": 0.65
		},
		"width": 493, // (optional)
		"height": 381 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Sales",
			"aggregate": "count"
		  },
		  {
			"field": "Brand"
		  }
		],
		"groupby": [
		  {
			"field": "Brand"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "arc",
		  "style": {
			"inner-radius": 0,
			"outer-radius": 220,
			"text-radius": 240,
			"corner-radius": 50,
			"stroke": "white",
			"stroke-width": 2,
			"stroke-opacity": 0.5,
			"fill-opacity": 0.8
		  }
		},
		"style": {}
	  },
	  {
		"add": "title",
		"text": "Global car sales by key brands, 2007-2011",
		"style": {
		  "position": "center",
		  "font-family": "Times",
		  "font-weight": "bold",
		  "font-color": "black",
		  "font-size": 34,
		  "font-style": "italic",
		  "background-color": "white"
		}
	  },
	  {
		"add": "caption",
		"text": "3 brands accounted for about a half of all the sales.",
		"style": {
		  "font-family": "Times",
		  "font-size": 20,
		  "font-weight": "bold",
		  "font-color": "black",
		  "position": "top-left",
		  "background-color": "white"
		}
	  },
	  {
		"add": "encoding",
		"channel": "theta",
		"field": "Sales"
	  },
	  {
		"add": "encoding",
		"channel": "color",
		"field": "Brand"
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "color": "black"
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "text": "Ford",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "color": "black"
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "text": "BMW",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "color": "black"
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "text": "Toyota",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		}
	  }
	]
  }
export const yourSpec_5 = 
{
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/sales.csv",
	  "schema": [
		{
		  "field": "Year",
		  "type": "temporal"
		},
		{
		  "field": "Brand",
		  "type": "categorical"
		},
		{
		  "field": "Category",
		  "type": "categorical"
		},
		{
		  "field": "Sales",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "none",
		"width": 493, // (optional)
		"height": 381, // (optional)
		"background-color": {
			"color" : 'white', 
			},  
	  },
	  {
		"select": [
		  {
			"field": "Sales",
			"aggregate": "count"
		  },
		  {
			"field": "Brand"
		  }
		],
		"groupby": [
		  {
			"field": "Brand"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "arc",
		  "style": {
			"inner-radius": 100,
			"outer-radius": 200,
			"text-radius": 205,
			"corner-radius": 0,
			"stroke": "blue",
			"stroke-width": 5,
			"stroke-opacity": 0,
			"fill-opacity": 0.7,
			"fill": "black"
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/car_background9.jpg"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Global car sales by key brands, 2007-2011",
		"style": {
		  "position": "top-center",
		  "font-family": "Times",
		  "font-weight": "bold",
		  "font-size": 34,
		  "font-style": "italic"
		}
	  },
	  {
		"add": "caption",
		"text": "3 brands accounted for about a half of all the sales.",
		"style": {
		  "position": "top-center",
		  "font-family": "Times",
		  "font-weight": "bold",
		  "font-size": 20,
		  "font-style": "italic",
		  "top-padding": 10
		}
	  },
	  {
		"add": "encoding",
		"channel": "theta",
		"field": "Sales"
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "color": "#ffd111"
		}
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "color": "#ffd111"
		}
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "color": "#ffd111"
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "text": "Ford: 20.0%",
		  "font-size": 15,
		  "font-family": "Georgia",
		  "font-weight": 800
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "text": "BMW: 16.4%",
		  "font-size": 15,
		  "font-family": "Georgia",
		  "font-weight": 800
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "text": "Toyota: 12.7%",
		  "font-size": 15,
		  "font-family": "Georgia",
		  "font-weight": 800
		}
	  }
	]
  }
export const yourSpec_6 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "",
		"background-image": "",
		"background-color": {
		  "color": "white"
		},
		"width": 493, // (optional)
		"height": 381 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#73C8F3",
			"stroke-width": "2",
			"point": true,
			"point-radius": "8",
			"point-fill": "",
			"point-stroke": "white",
			"point-stroke-width": "1"
		  }
		},
		"style": {
		  "background-image": ""
		}
	  },
	  {
		"add": "title",
		"text": "COVID-19: Confirmed Cases",
		"style": {
		  "font-size": 36,
		  "font-color": "white",
		  "font-family": "Georgia",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line-banner.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of confirmed cases reached its peak on March 19. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Georgia",
		  "font-weight": "bold",
		  "font-size": 15,
		  "position": "top-center",
		  "top-padding": 15
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Confirmed Cases"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/19"
		  }
		],
		"style": {}
	  },
	  {
		"add": "annotation",
		"method": "contour",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/19"
		  }
		],
		"style": {
		  "color": "black"
		}
	  }
	]
  }
export const yourSpec_7 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 1564, // (optional)
		"height": 291 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_8 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "https://bhimgs.com/i/2023/08/06/xfkcrm.jpg",
		"background-color": "",
		"width": 384, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_9 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 384, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_10 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 384, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_11 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": ""
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_12 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "https://bhimgs.com/i/2023/08/06/xfkcrm.jpg",
		"background-color": "",
		"width": 491, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_13 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 491, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_14 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 491, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_15 =  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "https://bhimgs.com/i/2023/08/06/xfkcrm.jpg",
		"background-color": "",
		"width": 770, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  },
		}
	  },
	  {
		"add": "caption",
		"text": "",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_16 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "https://bhimgs.com/i/2023/08/06/xfkcrm.jpg",
		"background-color": "",
		"width": 770, // (optional)
		"height": 284 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_18 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		//"background-image": "",
		"background-color": "red",
		"width": 700.5, // (optional)
		"height": 530.4 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_19 = 
  {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width": 700.5, // (optional)
		"height": 530.4 // (optional)
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14
		}
	  }
	]
  }
export const yourSpec_25 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "trustworthy",
		"background-image": {
		  "url": "https://narchart.github.io/editor/background/company_background.png"
		},
		width:600,
		height:550
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "funded status"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.5,
			"corner-radius": 0
		  }
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "funded status"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		]
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "funded status",
			"value": "Public"
		  }
		]
	  }
	]
  }
export const test_1 = {"data": {"url": "algorithm/data/ml-25m/out.csv", "schema": [{"field": "user_id", "type": "categorical"}, {"field": "movie_id", "type": "numerical"}, {"field": "rating", "type": "numerical"}, {"field": "tag", "type": "categorical"}, {"field": "title", "type": "categorical"}, {"field": "genres", "type": "categorical"}, {"field": "timestamp_tag", "type": "temporal"}, {"field": "timestamp", "type": "temporal"}]}, "actions": [{"select": [{"field": "rating", "aggregate": "max"}, {"field": "genres"}], "groupby": [{"field": "genres"}], "filter": []}, {"add": "chart", "mark": {"type": "bar"}}, {"add": "group", "actions": [{"add": "encoding", "channel": "x", "field": "genres"}, {"add": "encoding", "channel": "y", "field": "rating"}]}, {"add": "annotation", "method": "fill", "target": [{"field": "genres", "value": "Drama"}]}, {"add": "annotation", "method": "fill", "target": [{"field": "genres", "value": "Drama"}]}]}
export const test_2 = {"data": {"url": "algorithm/data/ml-25m/out.csv", "schema": [{"field": "user_id", "type": "categorical"}, {"field": "movie_id", "type": "numerical"}, {"field": "rating", "type": "numerical"}, {"field": "tag", "type": "categorical"}, {"field": "title", "type": "categorical"}, {"field": "genres", "type": "categorical"}, {"field": "timestamp_tag", "type": "temporal"}, {"field": "timestamp", "type": "temporal"}]}, "actions": [{"select": [{"field": "rating", "aggregate": "avg"}, {"field": "title"}], "groupby": [{"field": "title"}], "filter": []}, {"add": "chart", "mark": {"type": "line"}}, {"add": "group", "actions": [{"add": "encoding", "channel": "x", "field": "title"}, {"add": "encoding", "channel": "y", "field": "rating"}]}, {"add": "annotation", "method": "regression", "target": []}, {"add": "annotation", "method": "fill", "target": [{"field": "rating", "value": 820.5}]}]}
export const test_3 = {"data": {"url": "algorithm/data/ml-25m/out.csv", "schema": [{"field": "user_id", "type": "categorical"}, {"field": "movie_id", "type": "numerical"}, {"field": "rating", "type": "numerical"}, {"field": "tag", "type": "categorical"}, {"field": "title", "type": "categorical"}, {"field": "genres", "type": "categorical"}, {"field": "timestamp_tag", "type": "temporal"}, {"field": "timestamp", "type": "temporal"}]}, "actions": [{"select": [{"field": "rating", "aggregate": "count"}, {"field": "genres"}], "groupby": [{"field": "genres"}], "filter": []}, {"add": "chart", "mark": {"type": "arc"}}, {"add": "group", "actions": [{"add": "encoding", "channel": "theta", "field": "rating"}]}, {"add": "annotation", "method": "fill", "target": [{"field": "genres", "value": "Drama"}]}, {"add": "caption", "text": "the proportion of Drama is 1.0"}, {"add": "annotation", "method": "fill", "target": [{"field": "genres", "value": "Drama"}]}]}

export const animation = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
	  "schema": [
		{
		  "field": "Date",
		  "type": "temporal",
		  "pictype": "time"
		},
		{
		  "field": "Country",
		  "type": "geographical",
		  "subtype": "world",
		  "pictype": "map"
		},
		{
		  "field": "Confirmed Cases",
		  "type": "numerical"
		},
		{
		  "field": "Recovered",
		  "type": "numerical"
		},
		{
		  "field": "Deaths",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "exciting",
		"background-image": "",
		"background-color": "",
		"width":550,
		"height":500
	  },
	  {
		"select": [
		  {
			"field": "Recovered",
			"aggregate": "sum"
		  },
		  {
			"field": "Confirmed Cases",
			"aggregate": "sum"
		  },
		  {
			"field": "Date"
		  }
		],
		"groupby": [
		  {
			"field": "Date"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "line",
		  "style": {
			"stroke": "#FF7602",
			"stroke-width": "3",
			"point": true,
			"point-radius": "7",
			"point-fill": "",
			"point-stroke": "",
			"point-stroke-width": "",
			"background-image": ""
		  }
		},
		"style": {
		  "background-image": {
			"url": "https://narchart.github.io/editor/background/line_chart_background2.png"
		  }
		}
	  },
	  {
		"add": "title",
		"text": "Recovered Cases of COVID-19",
		"style": {
		  "font-size": 35,
		  "font-color": "#FF7602",
		  "font-family": "Arial Black",
		  "font-style": "",
		  "font-weight": "bold",
		  "border-color": "",
		  "border-width": 0,
		  "position": "top-center",
		  "background-color": "",
		  "background-image": "https://narchart.github.io/editor/background/line_banner3.png",
		  "top-padding": 0
		}
	  },
	  {
		"add": "caption",
		"text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
		"style": {
		  "font-color": "black",
		  "font-family": "Arial",
		  "font-style": "",
		  "font-weight": "bold",
		  "font-size": 16,
		  "position": "top-center",
		  "top-padding": 10
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Date"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Recovered"
		  }
		],
		"animation": {
		  "duration": 1500
		}
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Date",
			"value": "2020/3/15"
		  }
		],
		"text": "1362",
		"style": {
		  "tooltip-color": "#FF7602",
		  "font-color": "white",
		  "font-family": "Arial Black",
		  "font-size": 14,
		  "text": "1362"
		},
		"animation": {
		  "type": "wipe",
		  "duration": 600
		}
	  }
	]
  }
export const animation1 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/sales.csv",
	  "schema": [
		{
		  "field": "Year",
		  "type": "temporal"
		},
		{
		  "field": "Brand",
		  "type": "categorical"
		},
		{
		  "field": "Category",
		  "type": "categorical"
		},
		{
		  "field": "Sales",
		  "type": "numerical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "positive",
		"background-image": {
		  "url": "https://narchart.github.io/editor/background/car_background4.jpg",
		  "opacity": 0.65,
		},
		"width":550,
		"height":500
	  },
	  {
		"select": [
		  {
			"field": "Sales",
			"aggregate": "count"
		  },
		  {
			"field": "Brand"
		  }
		],
		"groupby": [
		  {
			"field": "Brand"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "arc",
		  "style": {
			"inner-radius": 0,
			"outer-radius": 220,
			"text-radius": 240,
			"corner-radius": 50,
			"stroke": "white",
			"stroke-width": 2,
			"stroke-opacity": 0.5,
			"fill-opacity": 0.8
		  }
		},
		"style": {}
	  },
	  {
		"add": "title",
		"text": "Global car sales by key brands, 2007-2011",
		"style": {
		  "position": "center",
		  "font-family": "Times",
		  "font-weight": "bold",
		  "font-color": "black",
		  "font-size": 34,
		  "font-style": "italic",
		  "background-color": "white"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "caption",
		"text": "3 brands accounted for about a half of all the sales.",
		"style": {
		  "font-family": "Times",
		  "font-size": 20,
		  "font-weight": "bold",
		  "font-color": "black",
		  "position": "top-left",
		  "background-color": "white"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "encoding",
		"channel": "theta",
		"field": "Sales",
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "encoding",
		"channel": "color",
		"field": "Brand",
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "color": "black"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Ford"
		  }
		],
		"style": {
		  "text": "Ford",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "color": "black"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "BMW"
		  }
		],
		"style": {
		  "text": "BMW",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "color": "black"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "label",
		"target": [
		  {
			"field": "Brand",
			"value": "Toyota"
		  }
		],
		"style": {
		  "text": "Toyota",
		  "font-color": "black",
		  "font-weight": "bold",
		  "font-size": 20
		},
		"animation": {
		  "duration": 1000
		}
	  }
	]
  }
export const animation2 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/cars.csv",
	  "schema": [
		{
		  "field": "Name",
		  "type": "categorical"
		},
		{
		  "field": "Miles per Gallon",
		  "type": "numerical"
		},
		{
		  "field": "Cylinders",
		  "type": "numerical"
		},
		{
		  "field": "Displacement",
		  "type": "numerical"
		},
		{
		  "field": "Horsepower",
		  "type": "numerical"
		},
		{
		  "field": "Weight",
		  "type": "numerical"
		},
		{
		  "field": "Acceleration",
		  "type": "numerical"
		},
		{
		  "field": "Year",
		  "type": "temporal"
		},
		{
		  "field": "Origin",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "light",
		"emotion": "",
		"background-image": {
		  "url": "https://narchart.github.io/editor/background/car_background3.jpg",
		},
		"width":550,
		"height":500
	  },
	  {
		"select": [
		  {
			"field": "Horsepower",
			"aggregate": "sum"
		  },
		  {
			"field": "Miles per Gallon",
			"aggregate": "sum"
		  },
		  {
			"field": "Acceleration",
			"aggregate": "sum"
		  },
		  {
			"field": "Weight",
			"aggregate": "sum"
		  },
		  {
			"field": "Name"
		  },
		  {
			"field": "Origin"
		  }
		],
		"groupby": [
		  {
			"field": "Name"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "point",
		  "style": {
			"fill-opacity": 0.4,
			"stroke-width": 1,
			"stroke-opacity": 0.7,
			"fill": "#90E1DC"
		  }
		},
		"style": {}
	  },
	  {
		"add": "title",
		"text": "Technical Specs of Cars in the 1980s",
		"style": {
		  "position": "left",
		  "font-family": "Gil Sans",
		  "font-weight": "bold",
		  "font-size": 30,
		  "font-color": "#15777C",
		  "font-style": "italic",
		  "border-width": 2,
		  "border-color": "#15777C"
		},
		"animation": {
		  "type": "wipe",
		  "duration": 1000
		}
	  },
	  {
		"add": "caption",
		"text": "Pontiac grand prix is the car that had the highest horsepower in the 1980s. Size encodes acceleration.",
		"style": {
		  "font-family": "Gil Sans",
		  "font-size": 16,
		  "font-weight": "regular",
		  "font-color": "#364A45",
		  "position": "left",
		  "top-padding": 0
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "Horsepower"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "Miles per Gallon"
		  }
		],
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "encoding",
		"channel": "size",
		"field": "Acceleration",
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "circle",
		"target": [
		  {
			"field": "Horsepower",
			"value": 230
		  }
		],
		"style": {
		  "color": "#F9CF00"
		},
		"animation": {
		  "type": "wipe",
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "tooltip",
		"target": [
		  {
			"field": "Horsepower",
			"value": 230
		  }
		],
		"text": "Car name: pontiac grand prix",
		"style": {
		  "font-family": "Gil Sans",
		  "font-size": 12,
		  "font-weight": "regular",
		  "font-color": "white",
		  "tooltip-color": "#00797D",
		  "text": "Car name: pontiac grand prix"
		},
		"animation": {
		  "type": "wipe",
		  "duration": 1000
		}
	  }
	]
  }
export const animation3 = {
	"data": {
	  "url": "https://narchart.github.io/editor/spreadsheets/deadstartup.csv",
	  "schema": [
		{
		  "field": "industry",
		  "type": "categorical"
		},
		{
		  "field": "funded status",
		  "type": "categorical"
		},
		{
		  "field": "cause of failure",
		  "type": "categorical"
		},
		{
		  "field": "broken year",
		  "type": "temporal"
		},
		{
		  "field": "survival time",
		  "type": "numerical"
		},
		{
		  "field": "location",
		  "type": "categorical"
		}
	  ]
	},
	"actions": [
	  {
		"add": "config",
		"mode": "dark",
		"emotion": "negative",
		"width":550,
		"height":500
	  },
	  {
		"select": [
		  {
			"field": "survival time",
			"aggregate": "average"
		  },
		  {
			"field": "location"
		  },
		  {
			"field": "funded status"
		  },
		  {
			"field": "broken year"
		  },
		  {
			"field": "industry"
		  },
		  {
			"field": "cause of failure"
		  }
		],
		"groupby": [
		  {
			"field": "industry"
		  }
		],
		"filter": []
	  },
	  {
		"add": "chart",
		"mark": {
		  "type": "bar",
		  "style": {
			"bin-spacing": 0.3,
			"corner-radius": 3
		  }
		},
		"style": {}
	  },
	  {
		"add": "title",
		"text": "Dead Startups in China",
		"style": {
		  "font-color": "#FFCD00",
		  "font-size": 34,
		  "font-family": "Georgia",
		  "font-weight": "bold",
		  "background-image": "https://narchart.github.io/editor/background/company_banner2.png",
		  "position": "top-center"
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "caption",
		"text": "We collected data from itjuzi.com and analyzed the startups in China died between 2010 and 2019. Companies from the new industry have the longest mean survival time.",
		"style": {
		  "font-color": "#FFCD00",
		  "font-weight": "bold",
		  "font-size": 14,
		  "position": "top-left",
		  "top-padding": 10
		},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "group",
		"actions": [
		  {
			"add": "encoding",
			"channel": "x",
			"field": "industry"
		  },
		  {
			"add": "encoding",
			"channel": "y",
			"field": "survival time"
		  }
		],
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "fill",
		"target": [
		  {
			"field": "industry",
			"value": "New Industry"
		  }
		],
		"style": {},
		"animation": {
		  "duration": 1000
		}
	  },
	  {
		"add": "annotation",
		"method": "arrow",
		"target": [
		  {
			"field": "industry",
			"value": "New Industry"
		  }
		],
		"style": {
		  "color": "white"
		},
		"animation": {
		  "type": "fly",
		  "duration": 1000
		}
	  }
	]
  }
export const animation4 = 
	{
  "data": {
    "url": "https://narchart.github.io/editor/spreadsheets/covid19World.csv",
    "schema": [
      {
        "field": "Date",
        "type": "temporal",
        "pictype": "time"
      },
      {
        "field": "Country",
        "type": "geographical",
        "subtype": "world",
        "pictype": "map"
      },
      {
        "field": "Confirmed Cases",
        "type": "numerical"
      },
      {
        "field": "Recovered",
        "type": "numerical"
      },
      {
        "field": "Deaths",
        "type": "numerical"
      }
    ]
  },
  "actions": [
    {
      "add": "config",
      "mode": "light",
      "emotion": "calm",
      "background-image": "",
      "background-color": "",
	  "width":550,
	  "height":500
    },
    {
      "select": [
        {
          "field": "Recovered",
          "aggregate": "sum"
        },
        {
          "field": "Confirmed Cases",
          "aggregate": "sum"
        },
        {
          "field": "Date"
        }
      ],
      "groupby": [
        {
          "field": "Date"
        }
      ],
      "filter": []
    },
    {
      "add": "chart",
      "mark": {
        "type": "line",
        "style": {
          "stroke": "#DDDDDD",
          "stroke-width": "3",
          "point": true,
          "point-radius": "10",
          "point-fill": "",
          "point-stroke": "",
          "point-stroke-width": ""
        }
      },
      "style": {
        "background-image": ""
      }
    },
    {
      "add": "title",
      "text": "Recovered Cases of COVID-19",
      "style": {
        "font-size": 26,
        "font-family": "Georgia",
        "font-style": "",
        "font-weight": "bold",
        "border-color": "#70A2B1",
        "border-width": 3,
        "position": "top-center",
        "background-color": "",
        "background-image": "",
        "top-padding": 0
      },
      "animation": {
        "type": "wipe",
        "duration": 1000
      }
    },
    {
      "add": "caption",
      "text": "During March 2020, the number of recovered cases reached its peak on March 15. Data source: WHO.",
      "style": {
        "font-color": "black",
        "font-family": "Georgia",
        "font-style": "",
        "font-weight": "bold",
        "font-size": 15,
        "position": "top-left"
      },
      "animation": {
        "duration": 1000
      }
    },
    {
      "add": "group",
      "actions": [
        {
          "add": "encoding",
          "channel": "x",
          "field": "Date"
        },
        {
          "add": "encoding",
          "channel": "y",
          "field": "Recovered"
        }
      ],
      "animation": {
        "duration": 1000
      }
    },
    {
      "add": "annotation",
      "method": "desaturate",
      "target": [],
      "animation": {
        "duration": 1000
      }
    },
    {
      "add": "annotation",
      "method": "fill",
      "target": [
        {
          "field": "Date",
          "value": "2020/3/15"
        }
      ],
      "style": {},
      "animation": {
        "duration": 1000
      }
    }
  ]
}

 //export const yourSpec={'yourSpec_0':yourSpec_0, 'yourSpec_1':yourSpec_1}

  