function get_spec(chartType, node1,node2) {
    if (chartType === "accessibilityout") {
        return {
            "chart": {
                "type": "accessibilityout",
                "width": 100,
                "height": 100
            },
            "fact": {
                "subspace": [],
                "breakdown": [{}],
                "measure": [{ "field": node1, "aggregate": "out" }],
                "focus": []
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    } else if (chartType === "accessibilityin") {
        return {
            "chart": {
                "type": "accessibilityin",
                "width": 100,
                "height": 100
            },
            "fact": {
                "subspace": [],
                "breakdown": [{}],
                "measure": [{ "field": node1, "aggregate": "in" }],
                "focus": []
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    } else if (chartType === "neighborin") {
        return {
            "chart": {
                "type": "neighborin",
                "width": 100,
                "height": 100
            },
            "fact": {
                "subspace": [],
                "measure": [{}],
                "measure": [{ "field": node1, "aggregate": "in" }],
                "focus": []
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    } else if (chartType === "neighborout") {
        return {
            "chart": {
                "type": "neighborout",
                "width": 100,
                "height": 100
            },
            "fact": {
                "subspace": [],
                "measure": [{ "field": node1, "aggregate": "out" }],
                "breakdown": [{}],
                "focus": []
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    }else if (chartType === "connectivity") {
        return {
            "chart": {
                "type": "connectivity",
                "width": 100,
                "height": 100
            },
            "fact": {
                "subspace": [],
                "measure": [{ "field": [node1,node2], "aggregate": "out" }],
                "breakdown": [{}],
                "focus": []
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    }
}



export default get_spec;