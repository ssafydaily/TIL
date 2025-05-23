# Text generation & Prompting

- **OpenAI API**를 사용하면 *ChatGPT* 처럼 **LLM**을 사용하여 프롬프트에서 텍스트를 생성
- 모델은 `코드`, `수학 방정식`, `구조화된 JSON 데이터` 또는 산문 등 거의 모든 종류의 텍스트 응답 생성이 가능


## 간단한 요청 보내기

::: code-group

```python [responses]
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4.1",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output_text)

```

```python [chat completions]
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4.1",
    messages=[
        {
            "role": "user",
            "content": "Write a one-sentence bedtime story about a unicorn."
        }
    ]
)

print(completion.choices[0].message.content)

```
:::

--------

- 모델에서 생성된 응답
  - reponses => `output` 속성
  - chat completions => `choices` 속성

::: code-group

```json [responses]
// output 응답 속성
[
    {
        "id": "msg_67b73f697ba4819183a15cc17d011509",
        "type": "message",
        "role": "assistant",
        "content": [
            {
                "type": "output_text",
                "text": "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",
                "annotations": []
            }
        ]
    }
]

```

```json [chat completions]
// choices 속성에 있음
[
    {
        "index": 0,
        "message": {
            "role": "assistant",
            "content": "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",
            "refusal": null
        },
        "logprobs": null,
        "finish_reason": "stop"
    }
]
```
:::

## 메시지 역할 및 지시 사항

> responses
- `instructions` 변수는 모델이 응답을 생성할 때 어떻게 동작해야 하는지에 대한 개략적인 지침을 제공
- 여기에는 어조, 목표, 정답 예시 등이 포함
- 제공된 지침은 `input` 매개변수의 프롬프트보다 우선

-------

> chat completions
- 메시지 역할(role)을 사용하여 다양한 수준의 권한으로 모델에 지침을 제공

| developer	   | user	      | assistant        |
|--------------|------------|------------------|
| developer메시지는 애플리케이션 개발자가 제공하는 지침으로, user메시지보다 우선 |	user메시지는 최종 사용자가 제공하는 지침으로, developer 메시지 뒤에 우선순위가 지정 | 	모델에 의해 생성된 메시지에는 assistant 역할 |

-------


## Markdown 및 XML을 사용한 메시지 서식 지정

- 개발자 메시지에는 다음 섹션이 포함되며, 보통 다음 순서대로 표시됩니다(단, 정확한 최적 콘텐츠와 순서는 사용하는 모델에 따라 다를 수 있음).

  - 정체성: 보조자의 목적, 의사소통 스타일, 높은 수준의 목표
  - 지침: 원하는 응답을 생성하는 방법에 대한 지침. 어떤 규칙을 따라야 할까요? 모델은 무엇을 해야 하고, 무엇을 하지 말아야 할까요? 이 섹션에는 모델이 사용자 지정 함수를 호출 하는 방법 등 사용 사례와 관련된 여러 하위 섹션이 포함될 수 있음
  - 예시: 모델에서 원하는 출력과 함께 가능한 입력의 예를 제공
  - 컨텍스트: 모델이 응답을 생성하는 데 필요한 추가 정보(예: 훈련 데이터 외의 비공개/독점 데이터 또는 특히 관련성이 높다고 판단되는 기타 데이터)를 제공. 이러한 콘텐츠는 일반적으로 프롬프트 끝부분에 배치하는 것이 가장 좋습니다. 생성 요청에 따라 다른 컨텍스트를 포함할 수 있기 때문입니다.



```markdown 

[코드 생성을 위한 개발자 메시지]

# Identity

- 당신은 Vue.js로 코드를 작성하는 코딩 어시스턴트입니다.

# Instructions

- 코드는 Javascript는 ES6+ 를 준수해야 합니다.
- Vue의 코드는 composiiton api 방식에 작성됩니다.
- 코드는 마크다운의 코드 블럭 스타일로 생성합니다.

# Examples

<user_query>
객체들을 저장하는 todos라는 배열을 ref형 변수로 작성하시오.
</user_query>

<assistant_response>

import { ref } from 'vue'

const todos = ref([
  { id: 1, title: '할일 1', isCompleted: false},
  { id: 2, title: '할일 1', isCompleted: false},
])

</assistant_response>
```


## Few-shot learning

- 퓨샷 러닝을 사용하면 모델을 미세 조정하는 대신 프롬프트에 소수의 입출력 예제를 포함시킴으로써 대규모 언어 모델에 새로운 작업을 유도할 수 있음
- 모델은 제공된 예제에서 패턴을 암묵적으로 **취득**하여 프롬프트에 적용
- 예제를 제공할 때는 원하는 출력을 가진 다양한 입력을 예시로 제공하기


## 관련 맥락(context) 포함시키기

- 모델이 응답을 생성하는 데 사용할 수 있는 추가적인 맥락 정보 제공
- 모델 생성 요청에 관련 맥락을 추가하는 기법을 검색 증강 생성(RAG) 라고도 함
  - 벡터 데이터베이스에 쿼리하여 얻은 텍스트를 프롬프트에 포함
  - OpenAI의 내장 파일 검색 도구를 사용하여 업로드된 문서를 기반으로 콘텐츠를 생성
  - 그외, 다양한 방법 활용

