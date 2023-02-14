FROM python:3.10

WORKDIR /code
RUN apt-get update -y
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

