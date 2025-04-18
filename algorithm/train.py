import os
import json

import openai
from wordsegment import load

from common.config import OPENAI_KEY
from common.model import DataSource, Task
from common.fact import DataFact
from story import Story

openai.api_key = OPENAI_KEY


def to_document(nar_json_list: list, filename):
    with open(filename, "w") as f:
        for index, item in enumerate(nar_json_list):
            f.write(f"export const yourSpec_{index} = {item}\n\n")


def train_forbes():
    print("forbes")
    data_source = DataSource(
        file_paths=[
            "./data/forbes/company.csv",
            "./data/forbes/location.csv",
        ],
        ontology_path="./data/forbes/forbes.txt",
    )
    task = Task(
        key_point="Which countries have companies that are not similar to other countries?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_hiking():
    print("hiking")
    data_source = DataSource(
        file_paths=[
            "./data/hiking/participant.csv",
            "./data/hiking/departure.csv",
            "./data/hiking/destination.csv",
        ],
        ontology_path="./data/hiking/hiking.txt",
    )
    task = Task(
        key_point="What are the characteristics of the people who hike?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[1, -1])
    return story, datafacts


def train_movie():
    print("movie")
    data_source = DataSource(
        file_paths=[
            "./data/movie/movie.csv",
            "./data/movie/rating.csv",
            "./data/movie/tag.csv",
            "./data/movie/genre.csv",
        ],
        ontology_path="./data/movie/movie.txt",
    )
    task = Task(
        key_point="What kind of movie is popular?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_startup():
    print("startup")
    data_source = DataSource(
        file_paths=[
            "./data/startup/dead_startup.csv",
            "./data/startup/industry.csv",
            "./data/startup/province.csv",
        ],
        ontology_path="./data/startup/startup.txt",
    )
    task = Task(
        key_point="How the survival time of dead startups has changed over time?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_student():
    print("student")
    data_source = DataSource(
        file_paths=[
            "./data/student/students_performance.csv",
        ],
        ontology_path="./data/student/student.txt",
    )
    task = Task(
        key_point="What kind of students get higher math scores?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_emission():
    print("emission")
    data_source = DataSource(
        file_paths=[
            "./data/canada/emissions.csv",
        ],
        ontology_path="./data/canada/emissions.txt",
    )
    task = Task(
        key_point="What brand of car is more environmentally friendly?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_election():
    print("election")
    data_source = DataSource(
        file_paths=[
            "./data/election/USElection.csv",
        ],
        ontology_path="./data/election/election.txt",
    )
    task = Task(
        key_point="Who is the most popular candidate?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_covid():
    print("covid")
    data_source = DataSource(
        file_paths=[
            "./data/covid/covid.csv",
        ],
        ontology_path="./data/covid/covid.txt",
    )
    task = Task(
        key_point="How China's outbreak situation has changed over time?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_weekend():
    print("weekend")
    data_source = DataSource(
        file_paths=[
            "./data/weekend/weekendplan.csv",
        ],
        ontology_path="./data/weekend/weekendplan.txt",
    )
    task = Task(
        key_point="What weekend plan is more popular?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_sport():
    print("sport")
    data_source = DataSource(
        file_paths=[
            "./data/sport/sportparticipants.csv",
        ],
        ontology_path="./data/sport/sportparticipants.txt",
    )
    task = Task(
        key_point="What sports activities are preferred by men and women respectively?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[])
    return story, datafacts


def train_population():
    print("population")
    data_source = DataSource(
        file_paths=[
            "./data/population/population.csv",
        ],
        ontology_path="./data/population/population.txt",
    )
    task = Task(
        key_point="How China's population compares to other countries?",
    )
    story = Story(data_source=data_source, task=task)
    datafacts, c, e = story.generate(outline_curve=[1, -1, 1])
    return story, datafacts


def getODFLandCL(originDataFact):
    originFactList = []
    captionList = []
    questionList = []
    urlList = []
    # 遍历 "Data Story" 中的每个元素
    for data_fact in originDataFact:
        captionList.append(data_fact.description)
        questionList.append(data_fact.question)
        originFactList.append(data_fact.fact)
        urlList.append(data_fact.csv)
    return originFactList, captionList, questionList, urlList


if __name__ == "__main__":
    load()
    story, originDataFact = train_hiking()
    # story, originDataFact = train_student()
    # story, originDataFact = train_startup()
    # story, originDataFact = train_forbes()
    # story, originDataFact = train_emission()
    # story, originDataFact = train_election()
    # story, originDataFact = train_covid()
    # story, originDataFact = train_weekend()
    # story, originDataFact = train_sport()
    # story, originDataFact = train_population()
    fact_dict = []
    for fact in originDataFact:
        fact_dict.append(fact.to_dict())
    with open("story.json", "w") as file:
        json.dump(fact_dict, file)

    # data_source = DataSource(
    #     file_paths=[
    #         "./data/movie/movie.csv",
    #         "./data/movie/rating.csv",
    #         "./data/movie/tag.csv",
    #         "./data/movie/genre.csv",
    #     ],
    #     ontology_path="./data/movie/movie.txt",
    # )
    # task = Task(
    #     key_point="What kind of movie is popular?",
    # )
    # story = Story(data_source=data_source, task=task)
    originFactList, captionList, questionList, urlList = getODFLandCL(originDataFact)
    factList, schema, uniqueResult = story.transform(
        originFactList,
        urlList,
        False,
        True,
    )
    animationFactList, schema, uniqueResult = story.transform(
        originFactList,
        urlList,
        True,
        True,
    )
