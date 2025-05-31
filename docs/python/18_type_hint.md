# 파이썬 타입 힌트

- 파이썬의 **타입 힌트(Type Hint)** 는 코드에 변수, 함수 매개변수, 반환값 등이 어떤 **자료형**을 가져야 하는지를 명시하는 기능
- 파이썬은 기본적으로 **동적 타이핑** 언어지만, 타입 힌트를 통해 **정적 분석 도구**(예: `mypy`, `pyright`)가 코드를 검사할 수 있음


## 1. 기본 문법

### 변수

> 변수 선언 시 콜론(`:`) 뒤에 타입을 명시하여 정적 타입 힌트를 제공합니다:
- `name`: 문자열 타입의 변수
- `age`: 정수 타입의 변수
- `height`: 부동소수점 타입의 변수
- `is_student`: 불리언 타입의 변수


```python
name: str = "Alice"
age: int = 30
height: float = 165.5
is_student: bool = False
```

### 함수

#### 파라미터와 반환값에 타입 지정

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

함수 정의에서는 매개변수와 반환값의 타입을 명시할 수 있습니다:
- `greet()`: 문자열 매개변수를 받아 문자열을 반환하는 함수
- `add()`: 두 개의 정수를 받아 정수를 반환하는 함수


```python
def add(x: int, y: int) -> int:
    return x + y
```


## 2. 컬렉션 타입

- `typing` 모듈을 이용해서 리스트, 딕셔너리 등에도 타입을 지정할 수 있습니다.

```python
from typing import List, Dict, Tuple, Set

names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 95, "Bob": 88}
position: Tuple[int, int] = (10, 20)
flags: Set[bool] = {True, False}
```

- `List[str]`: 문자열 요소를 가진 리스트
- `Dict[str, int]`: 문자열 키와 정수 값을 가진 딕셔너리
- `Tuple[int, int]`: 두 개의 정수 요소를 가진 튜플
- `Set[bool]`: 불리언 요소를 가진 집합


## 3. Optional (None 허용)

```python
from typing import Optional

def get_name(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None
```

- 매개변수:
  - `user_id (int)`: 조회할 사용자의 고유 식별자

- 반환값:
  - `Optional[str]`: 사용자 ID가 1인 경우 "Alice" 문자열을 반환하고, 그렇지 않으면 `None`을 반환합니다.



## 4. Union (여러 타입 허용)

```python
from typing import Union

def process(data: Union[int, str]) -> str:
    return str(data)
```

## 5. 타입 별칭

```python
from typing import List

Vector = List[float]

def scale(v: Vector, factor: float) -> Vector:
    return [x * factor for x in v]
```
- `Vector`와 `List[float]`는 동일한 타입 의미
- 매개 변수:
  - `v (Vector)`: 부동소수점 벡터
  - `factor (float)`: 벡터의 각 요소에 곱할 스케일 인자

- 반환값:
    `Vector`: 스케일링된 새로운 벡터

"
## 6. Callable (함수 타입)

```python
from typing import Callable

def operate(x: int, y: int, func: Callable[[int, int], int]) -> int:
    return func(x, y)
```
- 매개변수:
  - `x (int)`: 첫 번째 정수 입력값
  - `y (int)`: 두 번째 정수 입력값
  - `func (Callable[[int, int], int])`: 두 정수를 입력받아 정수를 반환하는 함수

- 반환값:
    `int`: 주어진 함수를 x와 y에 적용한 결과


## 7. 제네릭(Generic)

```python
from typing import TypeVar, List

T = TypeVar('T')

def first_item(items: List[T]) -> T:
    return items[0]
```
- `T` 라는 `TypeVar` 를 사용하는데, 이는 "어떤 타입이든 될 수 있는" 자리표시자 역할
- `def first_item(items: List[T]) -> T:` 는 파이썬에게 "이 함수는 어떤 타입 T의 리스트를 받아서, 그와 같은 타입 T의 항목을 반환한다"고 알려줌


## 8. 클래스와 타입 힌트

```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
```



## 9. `Annotated` (메타 정보 포함, Python 3.9+)

```python
from typing import Annotated

Age = Annotated[int, "Must be >= 0"]

def set_age(age: Age) -> None:
    pass
```
- `Annotated[int, "Must be >= 0"]` 는 "이는 정수 타입이고, 여기 추가 정보가 있으며, 값은 0 이상어어야 한다"라는 의미
- 함수 매개변수에서 이 Age 타입을 사용하면, 데이터 타입 요구사항과 추가 제약 조건을 모두 볼 수 있음
- Annotated가 실제 실행 시간에 정말 음수가 아닌지 확인해주지는 않음
- 문서화 역할을 하며, 정적 타입 검사기, IDE, 또는 다른 도구들이 오류 감지와 코드 자동완성을 제공하는 데 사용

## 10. Python 3.9+ 이후 내장 자료형을 직접 사용 가능

- 3.9 이전 버전에서는 `list[str]` 대신 `typing.List[str]`을 사용
  - `from typing import List` 라는 import 문이 필요
- 3.9 버전부터는 파이썬의 내장 list 타입을 직접 사용 가능함


```python
# Python 3.9 이상
def get_names() -> list[str]:
    return ["Alice", "Bob"]

# Python 3.8 이하에서는 typing.List 필요
```

## 장점

- **가독성 향상**
- **IDE 자동완성 및 오류 감지 강화**
- **디버깅 시간 감소**
- **코드 문서화 효과**

## 정리

| 개념    | 예시                                       |
| ----- | ---------------------------------------- |
| 기본 타입 | `x: int`, `name: str`                    |
| 리스트   | `List[int]` 또는 `list[int]` (3.9+)        |
| 딕셔너리  | `Dict[str, float]` 또는 `dict[str, float]` |
| 옵셔널   | `Optional[str]` 또는 `Union[str, None]`    |
| 유니언   | `Union[int, str]`                        |
| 함수 타입 | `Callable[[int, int], int]`              |
| 제네릭   | `TypeVar`, `List[T]`                     |


