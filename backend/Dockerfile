FROM python:3.8

WORKDIR /app
COPY ./poetry.lock ./pyproject.toml /app/

RUN pip install -U pip poetry && poetry config virtualenvs.create false && poetry install

COPY ./ /app
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0"]
