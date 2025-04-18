import json

from llmx import llm, TextGenerationConfig

from agents import Scripter, Summarizer, Analyst, Reviewer
from common.config import MODEL_NAME, OPENAI_KEY, OPENAI_API_BASE
from common.model import DataSource, Task
from common.fact import DataFact
from common.preamble import FREYTAG_PREAMLE
from logger import logger
from common.fact2json import datafacts2json

STRUCTURE_TO_PREAMBLE = {"Freytag": FREYTAG_PREAMLE}

class Story:
    def __init__(self, data_source: DataSource, task: Task) -> None:
        self.data_source = data_source
        self.task = task
        self.summarizer = Summarizer()
        self.scripter = Scripter()
        self.analyst = Analyst()
        self.reviewer = Reviewer()

    def generate(self, outline_curve=[-1, 0, 0.5]):
        data_summary_list = self._summarize()
        outline, explanation, operation, data_facts = self._explore(
            outline_curve, data_summary_list
        )
        data_story = self._generate(data_facts, data_summary_list)
        data_story = self._critic(outline, data_story, data_summary_list)

        # data_story = []

        # data_story_instance = [
        # {
        #    'data fact': {
        #        'type': 'association', 
        #        'subspace': [], 
        #        'breakdown': ['funded_status'], 
        #        'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 
        #        'focus': []
        #     }, 
        #     'description': ['Startups that remain unfunded tend to have a shorter average survival time, highlighting the critical role of initial funding in early-stage success.'], 
        #     'question': 'Are unfunded startups more likely to fail early compared to funded ones', 
        #     'stage': '',
        #     'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\9efef5d3-bc59-4272-8cb4-73d76bd60ba7.csv'
        # },  
        # {
        #     'data fact': {
        #         'type': 'trend', 
        #         'subspace': [], 
        #         'breakdown': ['broken_year', 'funded_status'], 
        #         'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 
        #         'focus': []
        #     }, 
        #         'description': ['Over the years, the average survival time of startups has shown a declining trend, regardless of their funding status.'], 
        #         'question': 'Are unfunded startups more likely to fail early compared to funded ones', 
        #         'stage': '', 
        #         'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\9efef5d3-bc59-4272-8cb4-73d76bd60ba7.csv'
        # }
        #     ,  {'data fact': {'type': 'rank', 'subspace': [], 'breakdown': ['industry'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': [{'field': 'industry', 'value': 'New Industry'}, {'field': 'industry', 'value': 'Education'}, {'field': 'industry', 'value': 'Tool'}]}, 'description': ["In the realm of startup survival, the 'New Industry' sector outpaces both 'Education' and 'Tool' industries in terms of average survival time."], 'question': 'Are unfunded startups more likely to fail early compared to funded ones', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\9efef5d3-bc59-4272-8cb4-73d76bd60ba7_sorted.csv'}
        #     ,  {'data fact': {'type': 'categorization', 'subspace': [], 'breakdown': ['dataid'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': []}, 'description': ['The categorization of startup failures reveals a diverse landscape, each uniquely identified and counted to understand the breadth of the issue.'], 'question': 'Are start ups really failing due to internal management', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\a18a4fb1-64e5-46ba-bda1-4fe3db3a65d1.csv'}
        #     ,  {'data fact': {'type': 'distribution', 'subspace': [], 'breakdown': ['industry'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['The average survival time of startups varies significantly across different industries, highlighting the diverse challenges and opportunities faced by each sector.'], 'question': 'What are the patterns in startup survival times over the years', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\497dc655-1f7c-4a83-923e-1083bef6568f.csv'}
        #     ,  {'data fact': {'type': 'trend', 'subspace': [], 'breakdown': ['industry', 'location'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['Across various industries and locations, the average survival time of startups has shown a discernible downward trend.'], 'question': 'What are the patterns in startup survival times over the years', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\497dc655-1f7c-4a83-923e-1083bef6568f.csv'}
        #     ,  {'data fact': {'type': 'value', 'subspace': [], 'breakdown': [], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['On average, startups have a survival time that spans several years before they face closure.'], 'question': 'What are the patterns in startup survival times over the years', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\cf95a46d-74c6-4fd3-ae89-7f195678e200.csv'}
        #     ,  {'data fact': {'type': 'extreme', 'subspace': [], 'breakdown': ['industry'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': [{'field': 'industry', 'value': 'New Industry'}]}, 'description': ['In the realm of new industries, startups are facing particularly harsh conditions, exhibiting the shortest average survival time compared to other sectors.'], 'question': 'What are the patterns in startup survival times over the years', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\cf95a46d-74c6-4fd3-ae89-7f195678e200.csv'}
        #     ,  {'data fact': {'type': 'trend', 'subspace': [], 'breakdown': ['industry', 'location', 'broken_year'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['Over the years, the average survival time of startups has shown a distinct trend across various industries and locations, segmented by the year they ceased operations.'], 'question': 'How does startup survival time vary by industry and location', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\275c8804-55ed-4da3-8df3-805b033609af.csv'}
        #     ,  {'data fact': {'type': 'distribution', 'subspace': [], 'breakdown': ['industry', 'location', 'broken_year'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['The average survival time of startups varies significantly across different industries, locations, and the years they ceased operations.'], 'question': 'How does startup survival time vary by industry and location?', 'stage': '', 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\275c8804-55ed-4da3-8df3-805b033609af.csv'}
        # ]
#         data_story_instance = [
#             {
#             'data fact': {
#                 'type': 'trend', 
#                 'subspace': [], 
#                 'breakdown': ['broken_year', 'funded_status'], 
#                 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 
#                 'focus': []
#             }, 
#                 'description': ['Over the years, the average survival time of startups has shown a declining trend, regardless of their funding status.'], 
#                 'question': 'Are unfunded startups more likely to fail early compared to funded ones', 
#                 'stage': '', 
#                 'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\9efef5d3-bc59-4272-8cb4-73d76bd60ba7.csv'
#         },
#         {
#            'data fact': {
#                'type': 'association', 
#                'subspace': [], 
#                'breakdown': ['funded_status'], 
#                'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 
#                'focus': []
#             }, 
#             'description': ['Startups that remain unfunded tend to have a shorter average survival time, highlighting the critical role of initial funding in early-stage success.'], 
#             'question': 'Are unfunded startups more likely to fail early compared to funded ones', 
#             'stage': '',
#             'csv': 'uploads/dc8445f4-d50c-4883-b061-3b8bef308920\\9efef5d3-bc59-4272-8cb4-73d76bd60ba7.csv'
#         }
#         ,  {'data fact': {'type': 'categorization', 'subspace': [], 'breakdown': ['dataid'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': []}, 'description': ['The categorization of startup failures reveals a diverse landscape, each uniquely identified and counted to understand the breadth of the issue.'], 'question': 'Are start ups really failing due to internal management', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\a18a4fb1-64e5-46ba-bda1-4fe3db3a65d1.csv'}
# ,  {'data fact': {'type': 'distribution', 'subspace': [], 'breakdown': ['cause_of_failure'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': []}, 'description': ['The distribution of startup failures reveals various causes, each contributing uniquely to the landscape of entrepreneurial challenges.'], 'question': 'What are the most common causes of startup fail', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\55dcf11a-ae89-491a-8708-bd5442594fd8.csv'}
# ,  {'data fact': {'type': 'rank', 'subspace': [], 'breakdown': ['cause_of_failure'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': [{'field': 'cause_of_failure', 'value': 'no business model'}, {'field': 'cause_of_failure', 'value': 'no market need'}, {'field': 'cause_of_failure', 'value': 'get outcompeted'}]}, 'description': ['Among the reasons for startup failures, lacking a business model, absence of market need, and being outcompeted rank as the top causes.'], 'question': 'What are the most common causes of startup fail', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\55dcf11a-ae89-491a-8708-bd5442594fd8_sorted.csv'}
# ,  {'data fact': {'type': 'rank', 'subspace': [], 'breakdown': ['industry'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': [{'field': 'industry', 'value': 'E-Commerce'}, {'field': 'industry', 'value': 'Social Media'}, {'field': 'industry', 'value': 'Local Business'}]}, 'description': ['E-Commerce, Social Media, and Local Business industries lead the chart in startup failures, highlighting sectors most vulnerable in the current economic landscape.'], 'question': 'How do the survival rates of startups vary', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\7147f76e-cc46-4dcb-b0c9-e2da8823beca_sorted.csv'}
# ,  {'data fact': {'type': 'trend', 'subspace': [], 'breakdown': ['broken_year', 'location'], 'measure': [{'field': 'survival_time', 'aggregate': 'avg'}], 'focus': []}, 'description': ['Over the years, the average survival time of startups has shown a declining trend across various locations.'], 'question': 'What are the trends in survival', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\47c0e40d-3658-48cd-bec6-bc3c7b84e2f3.csv'}
# ,  {'data fact': {'type': 'proportion', 'subspace': [], 'breakdown': ['cause_of_failure', 'location'], 'measure': [{'field': 'dataid', 'aggregate': 'count'}], 'focus': [{'field': 'cause_of_failure', 'value': 'no business model'}]}, 'description': ['A significant proportion of startup failures, irrespective of location, can be attributed to the absence of a viable business model.'], 'question': 'What are the trends in survival', 'stage': '', 'csv': 'uploads/71f3df4d-fa56-4144-828e-66a1f40fb7c8\\47c0e40d-3658-48cd-bec6-bc3c7b84e2f3.csv'}
#             ]

#         for fact_dict in data_story_instance:
#             data_fact = DataFact()
#             data_fact.from_dict(fact_dict)
#             data_story.append(data_fact)

        conversation = []
        conversation.append(self.analyst.summarize_what_has_been_done())
        conversation.append(self.scripter.summarize_what_has_been_done())
        conversation.append(self.reviewer.summarize_what_has_been_done())
        print("Generate finish!")
        for fact in data_story:
            data_fact_dict = fact.to_dict()
            print(", ", data_fact_dict)
        return data_story, conversation, explanation

    def _summarize(self):
        logger.info("Summary")
        data_summary_list = []
        for key, value in self.data_source.dataframe.items():
            print(OPENAI_API_BASE)
            data_summary = self.summarizer.summarize(
                data=value,
                # text_gen=llm("openai", api_key=OPENAI_KEY, base_url=OPENAI_API_BASE),
                text_gen=llm("openai", api_key=OPENAI_KEY),
                file_name=key + ".csv",
                n_samples=3,
                summary_method="llm",
                textgen_config=TextGenerationConfig(
                    n=1, model=MODEL_NAME, use_cache=True
                ),
            )
            data_summary_list.append(data_summary)
        return data_summary_list

    def _explore(self, outline_curve, data_summary_list):
        logger.info("Plan")
        print("Plan")
        story_outline, explanation = self.scripter.decompose_key_point(
            data_summary_list,
            self.task.key_point,
            self.data_source,
            outline_curve,
            self.task.isHuawei,
        )
        story_operation = []
        story_operation = self.analyst.answerInLanguage(story_outline)
        data_facts = self.analyst.language2operation(
            story_outline, story_operation, self.data_source
        )
        return story_outline, explanation, story_operation, data_facts

    def _generate(self, data_facts, data_summary_list):
        logger.info("Act")
        print("Act")
        data_story = self.scripter.filter_facts(data_facts)
        data_story = self.scripter.caption(
            data_story=data_story,
            data_summary=data_summary_list,
            key_point=self.task.key_point,
        )
        result = []
        print(data_story)
        for fact in data_story:
            result.append(fact.to_dict())
            print(fact)
        logger.info(result)
        return data_story

    def _critic(self, outline, data_story, data_summary):
        logger.info("Critic")
        for i in range(2):
            logger.info("{}th optimize".format(i + 1))
            critic_result = self.reviewer.critic(data_story, self.task.key_point)
            logger.info(str(critic_result))
            print(str(critic_result))
            if critic_result.final_score() > 1.8:
                break
            suggestions = self.reviewer.suggest(
                critic_result, data_story, data_summary, self.task.key_point
            )
            data_story = self.analyst.optimize(
                outline=outline,
                suggestion=suggestions,
                data_story=data_story,
                critic_result=critic_result,
                data_source=self.data_source,
            )
            data_story = self.scripter.caption(
                data_story=data_story,
                data_summary=data_summary,
                key_point=self.task.key_point,
            )
        critic_result = self.reviewer.critic(data_story, self.task.key_point)
        print(str(critic_result))
        critic_result = self.reviewer.critic(data_story[:5], self.task.key_point)
        print(str(critic_result))
        return data_story

    # url传入一个urllist，datafacts传入生成的datafacts的list
    def transform(self, datafacts, url, animation, isMergeTable):
        schema = self.data_source.schema
        uniqueResults = self.data_source.uniqueResults
        jsonlists = datafacts2json(
            datafacts=datafacts,
            url=url,
            animation=animation,
            isMergeTable=isMergeTable,
        )
        # uniqueresults是用来设置edit面板选项的
        # 返回的是每个datafact的json和它用到的csv的schema和uniqueresults
        return jsonlists, schema, uniqueResults
