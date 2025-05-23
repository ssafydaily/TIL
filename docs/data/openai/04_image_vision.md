# Image & Vision 

- 최신 언어 모델은 이미지 입력을 처리하고 분석하는 능력을 **Vision** 이라고 합니다.
- OpenAI API는 이미지를 입력으로 처리하거나 출력으로 생성하는 여러 엔드포인트를 제공하여 강력한 멀티모달 애플리케이션을 구축할 수 있음


| API	       | 지원되는 사용 사례     |
|------------|--------------------|
| 응답 API  	| 이미지를 분석하여 입력으로 사용하거나 출력으로 이미지를 생성 |
| 이미지 API   |	선택적으로 이미지를 입력으로 사용하여 출력으로 이미지를 생성 |
| 채팅 완료 API |	이미지를 분석하여 텍스트나 오디오를 생성하는 입력으로 사용 |

:::info **이미지 생성 또는 편집**

- `gpt-image-1`: 기본적으로 멀티모달 대규모 언어 모델. 텍스트와 이미지를 이해하고 광범위한 세계 지식을 활용하여 더 나은 지시 이행 및 상황 인식을 갖춘 이미지를 생성
- `DALL·E 2와 3`: `GPT Image`처럼 세상에 대한 본질적인 이해가 없는 이라는 특수 이미지 생성 모델을 제공
:::


:::info **이미지 분석**

- 비전(Vision)은 모델이 이미지를 "보고" 이해하는 능력. 이미지에 텍스트가 있으면 모델은 텍스트도 이해할 수 있다. 
- 모델은 사물, 모양, 색상, 질감 등 대부분의 시각적 요소를 이해할 수 있지만, 몇 가지 제약이 있다.
  - [<Badge type="tip" text="참고 보기" vertical="middle"/>][vision_limitation]


[vision_limitation]: https://platform.openai.com/docs/guides/images-vision?api-mode=chat&format=url#limitations


> 모델 이미지를 입력으로 제공
- 이미지 파일에 대한 완전한 URL을 제공하거나 Base64로 인코딩된 데이터 URL로 이미지를 제공하여 생성 요청에 대한 입력으로 이미지를 제공
:::


::: warning
- **주의>** 배열 에 여러 이미지를 포함하여 단일 요청에서 여러 이미지를 입력으로 제공할 수 있지만, 이미지는 토큰으로 간주되어 그에 따라 요금이 청구되는 content이다.
:::


## 이미지 생성 및 편집

### Image API

- `생성(generation)`: 텍스트 프롬프트를 기반으로 처음 부터 이미지 생성
- `편집(edit)`: 새 프롬프트를 사용해서 기존 이미지를 부분 또는 전체 수정
- `변형(variation)`: 기존 이미지를 변형(DALL-E 2만 가능)

> `gpt-image-1` / `dall-e-3` / `dall-e-2` 지원

### Response API
- Responses API를 사용하면 대화나 여러 단계로 구성된 흐름의 일부로 이미지 생성 가능
- 내장 도구 로 이미지 생성을 지원하며, 컨텍스트 내에서 이미지 입력 ​​및 출력을 허용

:::info `Image API에서 추가된 기능`
- **멀티턴 편집** : 프롬프트를 통해 이미지를 반복적으로 고품질로 편집
- **스트리밍** : 최종 출력이 생성될 때 부분 이미지를 표시하여 인지되는 지연 시간을 개선
- **유연한 입력** : 바이트뿐만 아니라 이미지 파일 ID를 입력 이미지로 허용
:::

### 모델 비교

|  모델	     | 엔드포인트                  |	사용 사례                                          |
|-----------|---------------------------|---------------------------------------------------|
|  DALL-E 2	| 이미지 API: 생성, 편집, 변형  |	 낮은 비용, 동시 요청, 인페인팅(마스크를 사용한 이미지 편집) |
|  DALL-E 3	| 이미지 API: 생성 전용	       |  DALL·E 2보다 더 높은 이미지 품질, 더 큰 해상도 지원      |
|  GPT Image | 이미지 API: 생성, 편집-응답 API 곧 지원 예정.	| 뛰어난 지시 이행, 텍스트 렌더링, 세부적인 편집, 실셰게 지식 |


## 이미지 생성


> `gpt-image-1`

::: code-group

```python [Responses API]
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-4.1-mini",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

// Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```python [Image API]
from openai import OpenAI
import base64
client = OpenAI()

prompt = """
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
"""

result = client.images.generate(
    model="gpt-image-1",
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)
```
:::

> `dall-e-3`

```python
from openai import OpenAI
client = OpenAI()

result = client.images.generate(
    model="dall-e-3",
    prompt="a white siamese cat",
    size="1024x1024"
)

print(result.data[0].url)
```
- DALL·E 3를 사용하면 OpenAI가 안전을 위해 프롬프트를 자동으로 다시 쓰고 세부 정보를 더 추가합니다.
- DALL·E 3에서는 이미지 편집 엔드포인트를 사용할 수 없습니다. 

> `dall-e-2`

- `n`: 여러 이미지를 동시에 생성하도록 설정하는 매개변수. 기본적으로 단일 이미지를 반환.
```python
from openai import OpenAI
client = OpenAI()

result = client.images.generate(
    model="dall-e-2",
    prompt="a white siamese cat",
    size="1024x1024",
    quality="standard",
    n=1,
)

print(result.data[0].url)
```


## 이미지 편집


## 출력 사용자 정의

:::tip 이미지 출력 사용자 정의
- 다음 출력 옵션을 구성할 수 있습니다.
  - 크기 : 이미지 크기(예: 1024x1024, 1024x1536)
  - 품질 : 렌더링 품질(예 standard)
  - 형식 : url(기본값),b64_json
:::  