FROM python:3.9.10-slim

RUN apt-get update
COPY requirements.txt /
RUN pip install -U pip
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
RUN pip config set install.trusted-host  pypi.tuna.tsinghua.edu.cn
RUN pip3 install -r /requirements.txt

COPY . /server
WORKDIR /server