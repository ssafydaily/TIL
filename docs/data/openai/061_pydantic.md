# [pydantic](https://docs.pydantic.dev/latest/)

> 설치
- python 3.9+ 설치되었다면 pip 사용가능

```bash
pip install pydantic
```
- 몇가지 의존성이 있음
  - `pydantic-core` : Rust 기반 코어, 유효성 검사
  - `typing-extensions` : 표준 라이브러리 타이핑 모듈의 백포트
  - `anotated-types` :  `typing.Annotated` 와 타입 지원


## Pydantic 사용 이유

### 스키마 유효성 검사를 지원하는 타입 힌트
- Pydantic이 검증하는 스키마는 일반적으로 Python 타입 힌트로 정의
- 정적 타이핑 도구(mypy, Pyright등) 및 IDE( PyCharm, VSCode 등)와도 원활하게 통합

### 성능
- Pydantic의 핵심 검증 로직은 별도의 패키지(pydantic-core)에 구현
  - 대부분 타입에 대한 검증은 Rust로 구현
- Pydantic은 Python을 위한 가장 빠른 데이터 검증 라이브러리 중 하나
- 컴파일 언어로 작성된 다른 성능 중심 라이브러리와 달리 Pydantic은 함수형 검증기를 통한 사용자 정의 지원

### 직렬화
- 또한 모델 인스턴스를 직렬화하고 역직렬화하는 데 사용할 수 있는 표준 JSON 스키마를 생성할 수 있습니다.
- 세 가지 방법으로 모델을 직렬화
  1. dict 연관된 Python 객체
  2. "jsonable" 타입으로만 구성된 dict
  3. JSON 문자열로.


### JSON 스키마
- 모든 Pydantic 스키마에 대해 JSON 스키마를 생성
- 자체 문서화 API가 가능하고 JSON 스키마 형식을 지원하는 다양한 도구와 통합 가능
- OpenAPI 3.1 과 호환되는 최신 버전의 JSON 스키마 사양( 2020-12 )을 준수

### 엄격 모드와 강제 변환
- 기본적으로 Pydantic은 일반적인 잘못된 타입을 허용하고 데이터를 올바른 타입으로 강제 변환
- Pydantic애는 엄격 모드가 있는데, 타입이 강제 변환되지 않고 입력 데이터가 스키마와 정확히 일치하지 않으면 유효성 검사 오류 발생
- 이 문제를 해결하기 위해 Pydantic은 JSON을 한 번에 파싱하고 검증


### 데이터 클래스, TypedDict

- 스키마를 생성하고 검증 및 직렬화를 수행하는 네 가지 방법

1. `BaseModel` — 인스턴스 메서드를 통해 사용 가능한 많은 공통 유틸리티를 갖춘 Pydantic의 자체 슈퍼 클래스
2. `Pydantic 데이터 클래스`  — 표준 데이터 클래스를 감싸고 추가 검증을 수행하는 래퍼
3. `TypeAdapter` — 모든 유형의 유효성 검사 및 직렬화에 맞게 조정하는 일반적인 방법
4. `validate_call` — 함수를 호출할 때 유효성 검사를 수행하는 데코레이터

## 핵심 개념

### 모델




#### `config_dict`
- `config_dict` 는 모델 클래스의 속성으로 정의되며, 모델의 동작 방식을 설정하는 데 사용

```python
from pydantic import BaseModel, Field

class Product(BaseModel):
    name: str = Field(..., min_length=2)
    price: float

    model_config = {
        "extra": "forbid",
        "str_strip_whitespace": True,
        "validate_default": True,
    }

```

> 자주 사용되는 키들

| 키                                   | 설명                                                 |
| ----------------------------------- | -------------------------------------------------- |
| `title`                             | JSON Schema 제목 지정                                  |
| `extra`                             | `allow`, `ignore`, `forbid` – 모델에 정의되지 않은 필드 처리 방식 |
| `frozen`                            | `True`이면 불변 객체로 동작 (`__hash__` 및 `__eq__` 지원)      |
| `str_strip_whitespace`              | 문자열의 앞뒤 공백 자동 제거                                   |
| `str_min_length` / `str_max_length` | 문자열 기본 길이 제한 설정                                    |
| `validate_default`                  | 기본값도 검증 대상에 포함시킬지 여부                               |
| `populate_by_name`                  | alias 대신 필드 이름으로도 값을 채울 수 있도록 허용                   |
| `use_enum_values`                   | Enum을 문자열이 아닌 실제 값으로 직렬화/역직렬화                      |
| `coerce_numbers_to_str`             | 숫자를 문자열로 강제 변환할지 여부                                |
| `json_schema_extra`                 | OpenAPI용 JSON Schema 커스텀 정보 추가                     |
| `arbitrary_types_allowed`           | 사용자 정의 타입 사용 허용 여부                                 |
