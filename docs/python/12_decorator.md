# Decorator

```python
def printMsg(func):
    def wrapper():
        print(func.__name__, '호출전')
        func()
        print(func.__name__, '종료')
    return wrapper

def helloWorld():
    print('helloWorld 함수 실행중')

printWrapper = printMsg(helloWorld)
printWrapper()
```

- 함수에 적용
- 기존 함수를 수정하지 않고 추가기능을 구현한다.

```python
def printMsg(func):
    def wrapper():
        print(func.__name__, '호출전')
        func()
        print(func.__name__, '종료')
    return wrapper

@printMsg
def helloWorld():
    print('helloWorld 함수 실행중')

helloWorld()
```

- 인자를 전달하는 함수

```python
def printMsg(func):    
    def wrapper(*args, **kwargs):
        print(func.__name__, '호출전')
        result = func(*args, **kwargs)
        print(func.__name__, '종료')
        return result

    return wrapper

def helloWorld(a, b):
    print('helloWorld 함수 실행중')
    return a + b

printWrapper = printMsg(helloWorld)
result = printWrapper(1, 2)
print(result)
```

```python
def printMsg(func):    
    def wrapper(*args, **kwargs):
        print(func.__name__, '호출전')
        result = func(*args, **kwargs)
        print(func.__name__, '종료')
        return result

    return wrapper

@printMsg
def helloWorld(a, b):
    print('helloWorld 함수 실행중')
    return a + b


print(helloWorld(10, 20))