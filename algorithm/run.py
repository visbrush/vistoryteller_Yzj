from flask import Flask, request, jsonify, g, session
from flask_restful import Resource, reqparse
from flask_cors import CORS
from common.flask_uploads import (
    UploadSet,
    configure_uploads,
    ALL,
    DATA,
    patch_request_class,
)
import werkzeug, os, json
import pandas as pd

import openai
import uuid

from common.config import OPENAI_KEY, UPLOAD_SERVER
from common.model import DataSource, Task
from common.fact import DataFact
from story import Story

openai.api_key = OPENAI_KEY


app = Flask(
    __name__,
    instance_relative_config=True,
    static_url_path="/uploads",
    static_folder="./uploads",
)
CORS(app)

UPLOAD_FOLDER = "uploads/"
app.config["UPLOAD_FOLDER"] = os.path.join(".", UPLOAD_FOLDER)
# mySecretKey = os.urandom(24)
# print('mySecretKey',mySecretKey)
# app.config['SECRET_KEY'] = mySecretKey
app.config["SECRET_KEY"] = b"your_secret_key_here"


# 检查是否有上传文件的文件夹，没有则创建
if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    print("in not os.path.exists(app.config['UPLOAD_FOLDER'])")
    os.makedirs(app.config["UPLOAD_FOLDER"])

# 配置上传文件的设置
csvs = UploadSet("data", ALL, default_dest=lambda app: "data")
configure_uploads(app, csvs)
patch_request_class(app)


def parse_json(value):
    try:
        return json.loads(value)
    except ValueError as e:
        raise ValueError("Invalid JSON format")


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
        urlList.append(f"{UPLOAD_SERVER}/{data_fact.csv}")
        # print(data_fact.question)
    return originFactList, captionList, questionList, urlList


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    print(data)
    # # 从 JSON 数据中提取 csv_file_paths 和 txt_file_path
    # csv_file_paths = data.get("csv_file_paths", [])
    # txt_file_path = data.get("txt_file_path", "")
    linux_csv_file_paths = data.get("csv_file_paths", [])
    linux_txt_file_path = data.get("txt_file_path", "")
    csv_file_paths = [path.replace("\\", "/") for path in linux_csv_file_paths]
    txt_file_path = linux_txt_file_path.replace("\\", "/")
    # print(linux_csv_file_paths)
    # print(linux_txt_file_path)
    # print(csv_file_paths)
    # print(txt_file_path)
    key_point = data.get("keyPoint")
    uuid = data.get("uuid")
    outline_curve = data.get("outline_curve", [])
    if len(outline_curve) == 0:
        outline_curve = [-1, 0, 0.5, 1]

    data_source = DataSource(file_paths=csv_file_paths, ontology_path=txt_file_path)
    task = Task(key_point=key_point)
    story = Story(data_source=data_source, task=task)

    print("outline_curve", outline_curve)
    originDataFact, conversation, explanation = story.generate(
        outline_curve=outline_curve
    )
    originFactList, captionList, questionList, urlList = getODFLandCL(originDataFact)
    infoTitle = "story of " + data_source.name

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
    with open("narrativeChart.json", "w") as file:
        json.dump(factList, file)

    
    # print("questionList: ", questionList)

    # print("conversation: ", conversation)

    return jsonify(
        {
            "schema": schema,
            "uniqueResult": uniqueResult,
            "originFactList": originFactList,
            "captionList": captionList,
            "factList": factList,
            "infoTitle": infoTitle,
            "animationFactList": animationFactList,
            "questionList": questionList,
            "conversation": 
            # [
            #     'I\'ve loaded datasets, filtered them for unfunded records, grouped by industry, calculated average survival times, and ranked industries based on these times to analyze failure causes.',
            #     'I\'ve analyzed how plots relate to the theme of startup failures, identifying trends and key factors, and also considered different entities like funding status and causes of failure.',
            #     'I\'ve analyzed responses from an LLM agent, focusing on their content, context, and effectiveness. This helps in understanding the agent\'s capabilities and areas needing improvement.'
            # ],
            [
                'I\'ve analyzed startup data to identify failure causes, calculated failure rates by industry, and examined survival times based on various factors. This involved categorizing, counting, and computing proportions and trends within the dataset.',
                'I\'ve analyzed various aspects of startup failures, identifying internal and external causes, and highlighting industry-specific trends and survival times. I\'ve also categorized startups by failure reasons and locations.',
                'I\'ve been refining Data Fact 5 to better analyze startup failures by industry and cause, using the \'Reveal\' strategy to gradually unfold complexities and enhance understanding of survival times.'
            ],
            "explanation": explanation,
        }
    )


@app.route("/generateNarJson", methods=["POST"])
def generateNarJson():
    # 在这里添加算法生成的逻辑
    print("generateNarJson")
    data = request.get_json()

    datafact = data.get("datafact", "{}")
    csv_file_paths = data.get("csv_file_paths", [])[:1]
    txt_file_path = data.get("txt_file_path", "")
    key_point = "What is the most common industry for failed startups?"
    print(csv_file_paths)

    data_source = DataSource(file_paths=csv_file_paths, ontology_path=txt_file_path)
    url_path = data_source.getDataFactData(datafact)
    task = Task(key_point=key_point)
    story = Story(data_source=data_source, task=task)
    fact = DataFact()
    fact.from_dict({"data fact": datafact})

    if not isinstance(datafact, list):
        datafact = [datafact]
        changedJson, schema, uniqueResult = story.transform(
            datafact,
            # f"https://visline.idvxlab.com:6039/{merged_path}",
            f"{UPLOAD_SERVER}/{url_path}",
            False,
            True,
        )
        animationJson, schema, uniqueResult = story.transform(
            datafact,
            # f"https://visline.idvxlab.com:6039/{merged_path}",
            f"{UPLOAD_SERVER}/{url_path}",
            True,
            True,
        )
    print("changedJson", changedJson)
    json_data = json.loads(changedJson[0])
    animation_json_data = json.loads(animationJson[0])
    response_data = {
        "jsonData": json_data,
        "animationJsonData": animation_json_data,
    }

    return jsonify(response_data)
    # except Exception as e:
    #     return "Generate failed"


@app.route("/upload", methods=["POST"])
def upload():
    parser = reqparse.RequestParser()
    parser.add_argument(
        "txt",
        type=werkzeug.datastructures.FileStorage,
        location="files",
        required=True,
        help="Missing TXT file.",
    )
    parser.add_argument(
        "csv",
        type=werkzeug.datastructures.FileStorage,
        location="files",
        action="append",
        help="Missing CSV file.",
    )

    args = parser.parse_args()
    txt_file = args["txt"]
    csv_files = args["csv"]
    response_data = {"txt_filename": txt_file.filename}

    try:
        # 生成唯一的 uuid
        unique_id = str(uuid.uuid4())
        # 检查路径是否存在，如果不存在则创建
        upload_folder = "uploads"
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        # 创建以 uuid 为名的文件夹
        upload_folder = os.path.join("uploads", unique_id)
        os.makedirs(upload_folder)

        # 保存上传的 TXT 文件到 uploads/uuid 文件夹下
        txt_file_path = os.path.join(upload_folder, txt_file.filename)
        txt_file.save(txt_file_path)

        # 保存上传的 CSV 文件
        csv_file_paths = [
            os.path.join(upload_folder, csv_file.filename) for csv_file in csv_files
        ]
        for csv_file, csv_file_path in zip(csv_files, csv_file_paths):
            csv_file.save(csv_file_path)

        response_data = {
            "status": 200,
            "message": "Upload successful",
            "txt_file_path": txt_file_path,
            "csv_file_paths": csv_file_paths,
            "uuid": unique_id,
        }
        return jsonify(response_data)

        # 存储在会话中
        # try:
        #     session['data_source'] = {'csvs': csv_file_paths, 'txt': txt_file_path}
        #     return {'status': 200, 'message': 'Upload successful'}
        # except Exception as e:
        #     print(f"Error storing data in session: {e}")
        #     return {'status': 500, 'message': 'Internal Server Error'}

    except Exception as e:
        return {"status": 500, "message": "Internal Server Error"}


if __name__ == "__main__":
    app.run(host="localhost", port=6039, debug=True)
