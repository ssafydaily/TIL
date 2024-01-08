# Function

- 함수를 사용해야 하는 이유?

- 함수 정의 방법
  
  - def
  - 함수이름
  - 함수의 매개변수(parameter)와 인자(argument)
  - 함수의 body
    - docstring
    - code

- 함수는 항상 하나의 객체를 return 한다.
  
  - 값이 2개 이상이면 튜플로 반환한다.
  - 명시적으로 return이 없다면 python이 None 을 반환해준다.

- 함수의 입력값
  
  - 위치 인자
  - 기본 인자
  - 가변 인자
  - 키워드 인자
  - 키워드 가변 인자

> 주의 사항
> 
> - 기본 인자 다음에 위치 인자 사용할 수 없다.
> - 

### Argument vs. Parameter

#### return value

#### Positional argument 위치 인자

```python
def func(arg1, arg2, arg3):
    print(arg1, arg2, arg3)

func(1, 2, 3)
func(arg2=2, arg3=3, arg1=1)
```

#### 기본 인자

- **arg_name=default_value**

```python
def func(arg1, arg2='default', arg3=False):
    print(arg1, arg2, arg3)

# func()
func(1)
func(1, 'name')
func(1, 'name', True)
func(arg2='name', arg3=True, arg1=10)
# func(arg1='name', arg2=True, 10)
```

#### 가변 인자

- **`*arg`** -> 인자들이 튜플로 패킹된다.

```python
def func(*arg):
    print(arg)

func()
func(1)
func(1, 'name')
func(1, 'name', True)
func(arg2='name', arg3=True, arg1=10)
```

- 위치 인자나 키워드 인자들과 같이 사용하는 경우 주의 사항

```python
def func(first, *second):
    print(first, second)

func(1)
func(1, 'name')
func(1, 'name', True)
#=====================================
def func(*first, second):
    print(first, second)

func(1, 'name', second=True)
func(1, 'name', True)
```

#### 키워드 가변 인자

- **`**kwarg`** --> `dict` 로 패킹된다.

```python
def func(**kwarg):
    print(kwarg)

func(a=1, b=True, c='three')    
```

- 마찬가지로, 위치인자와 같이 사용하는 경우 주의

```python
def func(arg, **kwarg):
    print(kwarg)

func(1, name='james') 

def func(**kwarg, arg):
    print(kwarg)

func(a=1, b=True, arg=3)  # syntax error
```

## 함수 스코프