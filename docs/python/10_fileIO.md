# File Input/Output

## File Methods

### open text file

```python
file_object = open('파일경로(file_path)')           # 읽기모드로 텍스트파일 열기
file_object = open('파일경로(file_path)', '모드(mode)')     # 지정한 모드로 열기
```

|모드(mode)|설명|
|:------:|:--------|
|`'r'`     | 텍스트 파일을 읽기 모드로 열기 |
|`'w'`     | 텍스트 파일을 쓰기 모드로 열기. 동일한 이름의 파일이 있으면 기존 내용은 사라진다. |
|`'a'`     | 텍스트 파일을 추가 모드로 열기. |

### close file

```python
f = open('input.txt')           
f.close()               # 파일닫기
```

### read file

```python
f = open('파일경로(file_path)', 'r')
```

|메서드|설명|
|:------:|:--------|
|`read(size)`| `size`에 해당하는 파일의 내용을 읽어서 문자열로 반환. `size`가 생략되면 파일 끝까지 읽음.|
|`readline()`| 한줄을 읽어서 반환. 더 읽을 내용이 없으면 빈 문자열 반환.|
|`readlines()`| 문자열의 리스트를 반환.|


::: details examples
@[code](./codes/10_02_readtext.py)
:::

### write file
```python
f = open('파일경로(file_path)', 'w')
f.write('hello\n')      # 문자열을 쓰고, 문자열의 크기를 반환
```
::: details examples
@[code](./codes/10_03_writetext.py)
:::

### read line-by-line

@[code](./codes/10_04_readline_by_line.py)

::: details line 단위로 파일 복사하기
@[code](./codes/10_04_readline_and_write.py) 
:::

## Json 

## Pathlib

### 문자열로 파일경로를 처리할 경우

## Directory


## with 문

- with 문은 블록의 실행을 **컨텍스트 관리자** ([with 문 컨텍스트 관리자](https://docs.python.org/ko/3/reference/datamodel.html#context-managers)) 가 정의한 메서드들로 감싸는 데 사용된다. 
- 이것은 `try…except…finally` 사용 패턴을 캡슐화해서 재사용 가능하게 한다.

```python
with EXPRESSION as TARGET:
    SUITE
```
- 의미상 다음 코드와 동일하다.
```python
manager = (EXPRESSION)
enter = type(manager).__enter__
exit = type(manager).__exit__
value = enter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(manager, None, None, None)
```

::: tip 실행 과정
1. **컨텍스트 관리자**를 얻기 위해 *컨텍스트 expression* 이 평가된다.
2. 나중에 사용하기 위해 컨텍스트 관리자의 `__enter__()` 가 로드된다.
3. 나중에 사용하기 위해 컨텍스트 관리자의 `__exit__()` 가 로드된다.
4. **컨텍스트 관리자**의 `__enter__()` 메서드를 호출.
5. with 문에 타깃이 포함되었으면, 그것에 `__enter__()` 의 반환 값을 대입한다. 
    - with 문은 `__enter__()` 메서드가 에러 없이 돌아왔을 때, `__exit__()` 가 항상 호출됨을 보장함. 
    - 타깃에 대입하는 동안 에러가 발생하면, *SUITE* 안에서 에러가 발생한 것과 같이 취급

6. SUIT를 실행한다.
7. 컨텍스트 관리자의 `__exit__()` 메서드를 호출한다. 예외가 발생하면 형(type), 값, traceback이 `__exit__()` 의 인자로 전달되고, 그렇지 않으면 세 개의 `None` 이 인자로 전달된다.
:::

- 다음은 간단한 *파일 읽기* 예제이다.

@[code](./codes/10_01_with.py)

- 파일 객체를 다룰 때 with 키워드를 사용하는 것은 좋은 습관이다.
- 실행중에 예외가 발생하더라도 SUITE가 종료될 때 파일이 정상적으로 닫힌다.
- 동등한 `try-finally` 블록을 쓰는 것에 비교해 훨씬 간단하다.
- `with` 키워드를 사용하지 않으면, `f.close()` 를 호출해서 파일을 닫고 사용한 시스템 자원을 즉시 반납해야 한다.

::: danger 주의
 `with` 키워드를 사용하거나 `f.close()`를 호출하지 않고 `f.write()`를 호출하면 프로그램이 정상적으로 종료되더라도 `f.write()`에 전달된 데이터가 디스크에 기록되지 않을 수 있다.
:::

------------

## `io module`

- `io` 모듈은 다양햔 유형의 **I/O** 를 처리
  - 텍스트(Text), 바이너리(binary), 원시(raw)의 세가지 유형
- `파일 객체(file Object)` 또는 `스트림 객체(stream object)`의 입출력 기능 활용

### Text I/O
- 텍스트 스트림을 생성하는 가장 쉬운 방법ㅇ느 `open()` 을 사용하는 것으로, 선택적으로 인코딩을 지정
- 메모리 텍스트 스트림도 `StringIO` 객체로 제공
```python
f = open("myfile.txt", "r", encoding="utf-8")
f = io.StringIO("some initial text data")
```

### Binary I/O
- 바이너리 I/O는 버퍼링 된(buffered)  I/O 라고도 하며, `bytes` 객체를 생성
- 바이너리 스트림은 `'b'`를 제공하여 `open()` 을 사용
- 인 메모리 바이너리 스트림도 `BytesIO` 객체로 제공

```python
f = open("myfile.jpg", "rb")
f = io.BytesIO(b"some initial binary data: \x00\x01")
```

::: tip
**class io.BytesIO(inintial_bytes=b'')**
- 인 메모리 바이트 버퍼를 사용하는 바이너리 스트림 `BufferedIOBase` 상속
- `close()` 메서드가 호출되면 버퍼가 페기됨
- 


### Raw I/O
- 원시 I/O는 버퍼링을 비활성화 해서 바이너리 모드로 파일을 열어 생성
- `RawIOBase` 참고