# Structured Output

- 구조화된 출력은 모델이 항상 제공된 JSON 스키마를 준수하는 응답을 생성하도록 보장하는 기능

:::info **구조화된 출력의 이점**
- 신뢰할 수 있는 유형 안전성: 잘못 포맷된 응답을 검증하거나 다시 시도할 필요 없음
- 명시적 거부: 안전 기반 모델 거부는 이제 프로그래밍 방식으로 감지 가능
- 더 간단한 프롬프트: 일관된 형식을 얻기 위해 강화된 표현의 프롬프트가 필요하지 않음
:::

- REST API에서 JSON 스키마를 지원하는 것 외에도, Python 및 JavaScript 용 OpenAI SDK는 각각 [**Pydantic**](./061_pydantic.md) 과 **Zod**를 사용하여 객체 스키마를 쉽게 정의할 수 있도록 지원. 

## 비정형 텍스트에서 정보를 추출하는 방법

::: code-group

```python [Responses]
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(api_key='my-api-key')

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.responses.parse(
    model="gpt-4o-mini",
    input=[
        {
            "role": "system", "content": "이벤트 정보를 추출하시오."
        },
        {
            "role": "user",
            "content": "철수와 영희는 금용일에 열리는 과학 전시회에 갈 예정입니다.",
        },
    ],
    text_format=CalendarEvent,   # <---
)

event = response.output_parsed

print(f"이벤트 이름: {event.name}")
```

```python [Chat Completions]
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(api_key='my-api-key')

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system", "content": "이벤트 정보를 추출하시오."
        },
        {
            "role": "user",
            "content": "철수와 영희는 금용일에 열리는 과학 전시회에 갈 예정입니다.",
        },
    ],
    response_format=CalendarEvent,  # <---
)

event = response.choices[0].message.parsed  # <---

print(f"이벤트 이름: {event.name}")
```
:::

:::tip 지원 모델
- 구조화된 출력은 GPT-4o부터 최신 대규모 언어 모델 에서 사용 가능
- gpt-4-turbo 및 이전 모델에서는 [**JSON 모드**][json_mode]를 대신 사용


:::

[json_mode]: https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat&lang=python#json-mode



## 함수 호출과 `text.format`

> 구조화된 출력은 OpenAI API에서 두 가지 형태로 제공됩니다.
> 1. 함수 호출을 사용할 때
> 2. `json_schema` 응답 형식을 사용할 때


- 함수 호출은 애플리케이션의 모델과 기능을 연결하는 애플리케이션을 구축할 때 유용하다.
- 반대로, 모델이 도구를 호출하는 경우가 아니라 모델이 사용자에게 응답할 때 사용할 구조화된 스키마를 나타내려는 경우에는 구조화된 출력을 사용하는 것이 더 적합하다.

## 구조화된 출력과 JSON 모드

- 구조화된 출력은 JSON 모드 가 발전된 형태
- 두 모드 모두 유효한 JSON 생성을 보장하지만, 구조화된 출력만 스키마 준수를 보장
- 구조화된 출력과 JSON 모드는 모두 Responses API, Chat Completions API, Assistants API, Fine-tuning API 및 Batch API에서 가능

- 가능하다면 JSON 모드 대신 구조화된 출력을 사용하는 것이 좋습니다.

:::info 가능 모델
- `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, `gpt-4o-2024-08-06` 이후 스냅샷, `response_format: {type: "json_schema", ...}`에서만 지원

|         | 구조화된 출력	| JSON 모드 |
|---------|------------|----------|
|유효한 JSON 출력 |	예	| 예 |
| 스키마를 준수   | 예( 지원되는 스키마 참조 ) |	아니요 |
| 호환 모델 |	`gpt-4o-mini`, `gpt-4o-2024-08-06`, 이후 | `gpt-3.5-turbo`, `gpt-4-*`및 `gpt-4o-*` 모델 |
|활성화	| text: { format: { type: "json_schema", "strict": true, "schema": ... } } |	text: { format: { type: "json_object" } }|

:::


## 예제

::: code-group
```python [생각의 사슬]

# --------------
# output

```
```python [구조화된 출력 추출]

# --------------
# output

```

```python [UI 생성]
# --------------
# output

```

```python [Moderation]

# --------------
# output

```

## 구조화된 출력을 `text.format`과 사용

> - 1단계: 스키마 정의
> - 2단계: API 호출에서 스키마 제공
> - 3단계: 예외 상황 처리

### 1단계: 스키마 정의

### 2단계: API 호출에서 스키마 제공

### 3단계: 예외 상황 처리



## 지원되는 스키마

- 구조화된 출력은 [**JSON 스키마 언어**](https://json-schema.org/docs) 의 하위 집합을 지원

:::tip
> 구조화된 출력에는 다음 타입이 지원됩니다.
- String
- Number
- Boolean
- Integer
- Object
- Array
- Enum
- anyOf
:::


:::tip 지원되는 속성
> 지원되는 string속성:
- pattern— 문자열이 일치해야 하는 정규 표현식
- format— 문자열에 대해 미리 정의된 형식입니다
  - date-time, time, date, duration, email, hostname, ipv4, ipv6, uuid

> 지원되는 number속성:
- multipleOf — 이 값의 배수여야 함
- maximum — 최대값
- exclusiveMaximum — 이 값보다 작아야 함
- minimum — 최소값
- exclusiveMinimum— 이 값보다 커야 함

> 지원되는 array속성:
- minItems— 최소 개수
- maxItems— 최대 개수
:::