FROM python:3.10

WORKDIR /code
RUN apt-get update -y
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "manage.py","runserver","0.0.0.0:8000" ]