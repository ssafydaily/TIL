# python-dotenv

`python-dotenv`는 파이썬 프로젝트에서 환경 변수를 쉽게 관리할 수 있도록 도와주는 라이브러리


## 📄 공식 사이트

**PyPI (Python Package Index)**: [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/)

-----

## 💡 소개

- 프로젝트를 개발하다 보면 API 키, 데이터베이스 접속 정보 등 민감한 정보를 코드에 직접 작성하게 되는 경우가 있다. 
- 이런 정보를 코드에 포함하면 보안에 매우 취약하며, 특히 Git과 같은 버전 관리 시스템에 올리면 외부에 유출될 위험이 커진다.

- `python-dotenv`는 이러한 민감한 정보들을 `.env`라는 별도의 파일에 저장하고, 파이썬 코드에서 이 값을 마치 시스템 환경 변수처럼 불러와 사용하게 해준다. 
- 이를 통해 **보안을 강화**하고, 각기 다른 개발 환경(로컬, 테스트, 프로덕션 등)에 맞는 **설정을 유연하게 관리**할 수 있습니다.



## 💻 설치

- `pip`를 사용하여 간단하게 설치

```bash
pip install python-dotenv
```



## 🛠️ 사용법

- 프로젝트의 루트 디렉토리에 `.env` 파일을 생성
- `KEY=VALUE` 형식으로 환경 변수를 저장한 뒤, 파이썬 코드에서 불러와 사용

**1. `.env` 파일 생성**

- 프로젝트의 최상위 경로에 `.env` 파일을 만들고 아래와 같이 변수를 저장합니다.

```
# .env 파일

DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword123
API_KEY=abcdef123456
```

**2. `.gitignore`에 `.env` 추가**

- 민감한 정보가 담긴 `.env` 파일이 Git 저장소에 올라가지 않도록 `.gitignore` 파일에 추가

```
# .gitignore 파일

.env
```

**3. 파이썬 코드에서 환경 변수 불러오기 (예시 코드)**

- `load_dotenv()` 함수를 호출하여 `.env` 파일의 변수들을 로드한 후, `os.getenv()` 또는 `os.environ`을 통해 가져오기

```python
# main.py

import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수를 로드합니다.
load_dotenv()

# os.getenv()를 사용하여 환경 변수를 가져옵니다.
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
api_key = os.getenv("API_KEY")

# 가져온 변수를 출력하여 확인합니다.
print(f"데이터베이스 호스트: {db_host}")
print(f"데이터베이스 사용자: {db_user}")
print(f"API 키: {api_key}")

# 존재하지 않는 키를 조회하면 None을 반환합니다.
non_existent_key = os.getenv("NON_EXISTENT_KEY")
print(f"존재하지 않는 키: {non_existent_key}")
```

**실행 결과:**

```
데이터베이스 호스트: localhost
데이터베이스 사용자: myuser
API 키: abcdef123456
존재하지 않는 키: None
```



