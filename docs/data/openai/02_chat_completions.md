# Chat Completions

- 대화를 구성하는 메시지 목록에서 모델 응답을 생성

## Chat Completions 생성

### Request Body

```python
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "developer", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)
```


- `message` : array **`required`**
  - 지금 까지의 대화를 구성하는 메시지들의 리스트
  - 메시지 유형
    - `개발자(developer) 메시지`: 사용자가 보낸 메시지와 관계없이 모델이 따라야 하는 개발자 제공 지침입니다. o1 모델 이상에서는 developer메시지가 이전 system메시지를 대체.
    - `시스템(system) 메시지`: 사용자가 보낸 메시지와 관계없이 모델이 따라야 하는 개발자 제공 지침
    - `사용자(user) 메시지`: 최종 사용자가 보낸 메시지로, 프롬프트나 추가 컨텍스트 정보가 포함
    - `어시스턴트(assistant) 메시지`: 사용자 메시지에 대한 응답으로 모델이 보낸 메시지


- `model`: string **`required`**
  - gpt-4o, gpt-4o-mini, o3 등

### Response object


```json
{
  "id": "chatcmpl-B9MHDbslfkBeAs8l4bebGdFOJ6PeG",
  "object": "chat.completion",
  "created": 1741570283,
  "model": "gpt-4o-2024-08-06",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The image shows a wooden boardwalk path running through a lush green field or meadow. The sky is bright blue with some scattered clouds, giving the scene a serene and peaceful atmosphere. Trees and shrubs are visible in the background.",
        "refusal": null,
        "annotations": []
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  // ...
}

```

- `choices`: array
  - `finish_reason`: string, 토큰 생성이 중단된 이유, 
  - `index`: 배열의 인덱스
  - `message`: Object, 모델이 생성한 chat comletions 메시지
    - `content`: 메시지 내용
    - `role`: 메시지 작성자의 역할
    - `annotation`: 웹 검색 도구를 사용할 때와 같이 메시지에 대한 추가 내용