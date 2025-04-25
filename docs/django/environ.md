# 환경 변수 관리


## Installation

```bash
$ pip install django-environ

$ pip freeze > requirements.txt
```

::: info

> `settings.py`의 `INSTALLED_APPS`에 추가할 필요 없음.

:::

## `.env` 파일 생성

- 예시
```bash
DEBUG=on
TMDB_TOKEN=your-tmdb-token
SECRET_KEY=your-secret-key
DATABASE_URL=psql://user:un-githubbedpassword@127.0.0.1:8458/database
SQLITE_URL=sqlite:///my-local-sqlite.db
```

## `settings.py` 

```python
import environ
import os

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

TMDB_TOKEN = env('TMDB_TOKEN')
SECRET_KEY = env('SECRET_KEY')

```


## 환경 변수 불러오기

```python

from django.conf import settings

TMDB_TOKEN = settings.TMDB_TOKEN
SECRET_KEY = settings.SECRET_KEY

```


