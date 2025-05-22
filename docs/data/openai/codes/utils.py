# 1. python dotenv 패키지 설치
# 2. '.env' 파일에 OPEN_API_KEY 작성

import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')