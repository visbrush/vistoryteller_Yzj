DATA_STORY_PREAMBLE = """
A `data story` is a representation of a series of meaningfully connected story pieces (i.e., `data fact`s) in the form of a narrative visualization. Such form of representation is frequently used in a data-driven storytelling process due to its efficiency in terms of supporting the comprehension and memorization of the telling content.
"""

DATA_FACT_PREAMBLE = """
A `data fact` represents a piece of information extracted from the dataset. A `data fact` can be defined by a 5-tuple in the format of JSON: {`type`, `subspace`, `breakdown`, `measure`, `focus`}.
    `type` indicates the type of information described by the fact, according to the characteristics of the data information contained in each type, we divide the types into two groups. The first group can be used to analyze both categorical and temporal data, including `value`, `rank`, `proportion`, `categorization`, `distribution`, `difference`, `extreme` and `outlier`. The second group can be only used to analyze temporal data, including `trend`, `autocorrelation`, `seasonality` and `similarity`. 
    `subspace` describes the data scope of the fact, which is defined by a set of data filters.
    `breakdown` is a data column based on which the the data items in the `subspace` are further divided into groups, such as "Province".
    `measure` specifies how data items in the breakdown are aggregated based on which columns and using what method, such as sum, average, count, minimum, or maximum.
    `focus` indicates a set of specific data items that need attention, which derived from `breakdown` and within the data scope specified by the `subspace`. 
"""

DATA_FACT_DEFINATION = """Value: Retrieve the exact value of data attributes under a specific criterion. Such facts answer the question 'What is the value of {A, B, ...} under the standards {X, Y, ...}?'. For example, '46 horses won two out of three Triple Crown races.'
Difference: Compare any two or more data attributes, or compare the target object with previous values along a time series. Such facts answer the question 'What is the difference between data attributes {A, B, ...} in a given set S?'. For example, 'The Royal Hospital in London has more congested beds compared to the national average in the UK.'
Proportion: Measure the proportion of selected data attributes within a specified set. Such facts answer the question 'What is the proportion of data attributes {A, B, ...} in a given set S?'. For example, 'Proteins make up 66% of the diet on Sundays.'
Trend: Show the general trend over a period of time. Such facts answer the question 'What is the trend of data attributes {A, B, ...} over the time period T?'. For example, 'From 1990 to 2013, the budget for the border patrol program has been rising.'
Categorization: Select data attributes that meet specific criteria. Such facts answer the question 'What are the data attributes {A, B, ...} that meet criteria {X, Y, ...}?'. For example, 'In 2004, Joshua and Samuel were two popular names among boys.'
Distribution: Show the value distribution of selected data attributes, or display the segmentation of all data attributes. Such facts answer the question 'What is the summary/overall distribution of data attributes {A, B, ...}?'. For example, 'The distribution of unicorn companies is roughly normal, varying with their age.'
Rank: Sort data attributes according to their values and show the segmentation of selected data attributes. Such facts answer the question 'What is the order of selected data attributes {A, B, ...}?'. For example, 'The primary reason for consumer engagement in showroom sales is ‘better online prices’.'
Association: Identify useful relationships between two data attributes or among multiple attributes. Such facts answer the question 'What is the correlation between data attributes {A, B, ...} in a given set S?'. For example, 'The quantity of quality food is negatively correlated with the distance of supplier cities from the eastern markets.'
Extreme: Find extreme data cases within data attributes or within a certain range. Such facts answer the question 'Regarding attributes {A, B, ...}, what are the highest/lowest N or the most extreme values?'. For example, 'In the collected data set, the character with the most maxims is Oscar Wilde himself, with 12.'
Outlier: Explore unexpected data attributes or statistical outliers in a given set. Such facts answer the question 'What are the unusual data attributes {A, B, ...} in a given set S?'. For example, 'Compared to other Beatles songs, 'Rocky Raccoon' uses the most unique vocabulary.'"
"""

FREYTAG_PREAMLE = """
Freytag's Pyramid, or Freytag's structure, is a narrative structure of classical dramas and stories, including three stages:
    - Setting: This stage provides contextual information of the `data story` and grabs the audience's attention.
    - Rising-Climax: This stage builds the tension of the story and shows supporting facts that lead to the climax, which presents the central insights of the story.
    - Resolution: This stage gives conclusions and take-away messages, which will help the audience quickly review the story, easily make connections between the beginning and the end.###
"""

NONNARRATIVE_KEYPOINT_EXAMPLE = """
- Example Key Ponit: Reveals the significance of the United States national debt.
- Example supported questions:
{
    "questions": [What is the current status of debt?, What is the change in the total debt amount over time?How to analyze the relationship between fiscal appropriations and debt.],
}
"""


DATA_FACT_RULES = """
1. When `type` equals to `difference`. The field in `breakdown` must be a categorical or temporal column. The field of `focus` must equal to the field of `breakdown` and the value of `focus` must contain two specific values.
2. When `type` equals to `categorization`. The field in `breakdown` must be a categorical column. The field of `measure` and the field of `focus` is empty.
3. When `type` equals to `proportion`. The field in `breakdown` must be a categorical or temporal column. The field of `focus` must equal to the field of `breakdown` and the value of `focus` must contain one specific value.
4. When `type` equals to `distribution`. The field in `breakdown` must be a categorical column. The `focus` could be empty or contain one specific value.
5. When `type` equals to `rank`. The field in `breakdown` must be a categorical or temporal column. The `focus` is empty.
6. When `type` equals to `association`. The field in `breakdown` must be categorical or temporal column. The `measure` must contain two fields with same aggregate method. `focus` is empty.
7. When `type` equals to `extreme`. The field in `breakdown` must be categorical or temporal column. The `focus` is empty.
8. When `type` equals to `outlier`. The field in `breakdown` must be categorical or temporal column. The `focus` is empty.
9. When `type` equals to `value`. The field of `measure` must be a numerical column. The field in `breakdown` and the field of `focus` is empty.
10. When `type` equals to `trend`, `autocorrelation`, `seasonality` or `similarity`. The field in `breakdown` must be temporal column. The `focus` is empty.
11. If the `measure` is not specified to be empty, the field of `measure` must be a column. The `aggregate` can be one of sum, avg or count.
12. The `breakdown` must not be a numerical column!!!
"""

STORY_NARRATIVE_PATTERN = """
- Compare: comparing two or more `data fact`s with different `breakdown`, `type` or `subspace`, which can draw respective conclusions from them. 
- Repetition: Showing `data fact`s with same `breakdown`, `type` or `subspace` repetitively can increase a message's importance and memorability, and can help tie together different arguments about a given dataset. 
- Reveal: This strategy involves a gradual unfolding of `data fact`s within the `data story`, steadily disclosing information that culminates in presenting the complete picture and the ultimate argument.
- Slowing down: The pace of narration is deliberately reduced, directing attention to a specific `data fact` and allowing the user to engage with the information independently.
- Speeding up: This technique involves quickening the pace to convey information rapidly and maintain the audience's engagement. It is particularly effective when there's a need to convey a sense of urgency, highlight key trends, or efficiently present a series of interconnected data points. 
"""
