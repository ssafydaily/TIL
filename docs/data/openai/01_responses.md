# responses

- 최신의 **모델 응답 생성 인터페이스**
- 텍스트와 이미지 입력과 텍스트 출력을 지원
- 이전 응답의 출력을 다시 입력으로 사용하여 모델과 **상태 기반 상호 작용**을 생성
- **파일 검색**, **웹 검색**, **컴퓨터 사용**을 위한 내장된 도구를 사용하여 모델의 기능을 확장
- **함수 호출**을 통해 모델이 외부 시스템 및 데이터에 접근하도록 허용


## 모델 응답 생성

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
  model="gpt-4.1",
  input="Tell me a three sentence bedtime story about a unicorn."
)

print(response)
```

> `post https://api.openai.com/v1/responses`

### Request body

- `input` : string or array **`required`**
  - 텍스트, 이미지, 파일 입력

- `model`: string **`required`**
  - gpt-4o, gpt-4o-mini, o3 등



## 응답 객체(response object)

- `id`: string
  - 고유 식별값

- `output`: array

- `output_text`: string or null **SDK Only**




