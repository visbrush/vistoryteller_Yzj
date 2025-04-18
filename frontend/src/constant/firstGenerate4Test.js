import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../pages/InfoCmponents/other/hikinginsight'
export default {
    schema: [
        {
            "field": "number_range",
            "type": "numerical"
        },
        {
            "field": "Goto",
            "type": "categorical"
        },
        {
            "field": "Age",
            "type": "numerical"
        },
        {
            "field": "Age_range",
            "type": "categorical"
        },
        {
            "field": "Province",
            "type": "categorical"
        },
        {
            "field": "Gender",
            "type": "categorical"
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
    ],
    factList: [yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_3, yourSpec_4,],
    infoTitle: 'Hiking',
    keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
    captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
    titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
    originFactList: [
        { "type": "categorization", "subspace": [], "breakdown": ["number_range"], "measure": [], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["number_range"], "measure": [{ "field": "number_range", "aggregate": "count" }], "focus": [{ "field": "number_range", "operator": "=", "value": "2 people" }] },
        { "type": "value", "subspace": [], "breakdown": ["number_range"], "measure": [{ "field": "Age", "aggregate": "avg" }], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["number_range"], "measure": [{ "field": "number_range", "aggregate": "count" }], "focus": [{ "field": "number_range", "operator": "=", "value": "over 10 people" }] },
        { "type": "difference", "subspace": [], "breakdown": ["number_range"], "measure": [{ "field": "Age", "aggregate": "avg" }], "focus": [{ "field": "number_range", "operator": "=", "value": "2 people" }, { "field": "number_range", "operator": "=", "value": "over 10 people" }] },
    ],
    // explanation: ['The plot supports the theme as xxx']
}