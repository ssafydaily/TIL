```python
from google.colab import drive
drive.mount('/content/drive')
```

    Mounted at /content/drive


# 정규 표현식

## []문자 - 메타 클래스
- `[`와 `]` 사이의 문자들과의 매치
- `[abc]`라는 표현식의 의미는 a, b, c 중 한개의 문자와 매치를 뜻한다.
- 두 문자 사잉; 하이픈(`-`)을 사용하면 두 문자 사이의 범위를 의미
- `[a-zA-z]`: 모든 알파벳
- `[0-9]`: 모든 숫자
- 주의할 메타 문자 1가가 `^`인데, 반대(not)라는 의미를 갖는다.
  - `[^0-9]`: 숫자가 아닌 문자만 매치


**자주 사용하는 문자 클래스**
- `\d` : 숫자와 매치, `[0-9]`와 동일
- `\D` : 숫자 아닌 것과 매치, `[^0-9]`와 같다
- `\s` : 공백문자와 매치, `[\t\n\r\f\v]` 와 동일
- `\S` : 화이트스페이스 문자가 아닌 것과 매치 `[^\t\n\r\f\v]`와 동일
- `\w` : 문자+숫자(alphanumeric)와 매치, `[a-zA-Z0-9_]`와 동일한 표현
- `\W` : 문자+숫자(alphanumeric)가 아닌 문자와 매치, `[^a-zA-Z0-9_]`와 동일

## .(dot) 문자 - `\n` 제외 모든 문자
- `a.b` : "a + 모든문자 + b"
  - a와 b라는 문자 사이에 어떤 문자가 들어가도 모두 매치된다는 의미

- `a[.]b` : [] 안에 사용되면 메타 문자가 아니라, 문자 그대로를 의미

## `*` 문자
- 반복을 의미하는 메타 문자
- `ca*t` : * 의 앞에 있는 a가 0개 이상 반복 가능
  > ct : 매치, cat: 매치, caaat: 매치

## `+` 문자
- 적어도 1번 이상 반복될 때 사용

## {} 문자와 ? 문자
- 반복 횟수를 3회만 또는 1회부터 3회까지 제한하고 싶을 때 {} 사용
  - `{m, n}` : 반복 횟수가 m부터 n까지
  - `{,n}`: 반복 횟수 n 이하
  - `{m, }`: 반복 횟수 m 이상
  - `{m}` : 반드시 m번 반복

- `?` 메타 문자가 의미하는 것은 `{0, 1}`
  - `ab?c` : "a + b가_있어도_되고_없어도_됨 + c"

## 정규 표현식을 지원하는 re 모듈
```python
>>> import re
>>> p = re.compile('ab*')
```
- `re.compile` 을 사용해서 정규 표현식을 컴파일한다.
- 반환되는 객체를 저장한다.

> - 패턴이란 정규식을 컴파일한 결과
> - 정규식을 컴파일할 때 특정 옵션을 줄 수 있다.

## 정규식을 이용한 문자열 검색
| Method | 목적 |
|--------|-----|
| match() | 문자열의 처음부터 정규식과 매치 되는지 조사|
| search()| 문자열 잔체를 검색하여 정규식과 매치되는지 조사|
| findall() | 정규식과 매치되는 모든 문자열(substring)을 리스트로 반환|
| finditer() | 정규식과 매치되는 모든 문자열(substring)을 반복 가능한 객체로 반환|


### match()


```python
import re
p = re.compile('[a-z]+')
m = p.match('python')
print(m)
```

    <re.Match object; span=(0, 6), match='python'>



```python
print(p.match('pyt1hon1'))
```

    <re.Match object; span=(0, 3), match='pyt'>



```python
print(p.match('1 python'))
```

    None


### search()


```python
print(p.search('python'))
```

    <re.Match object; span=(0, 6), match='python'>



```python
print(p.search('1121 1212 python'))
```

    <re.Match object; span=(10, 16), match='python'>



```python
print(p.search('1121 1212 pyt1hon'))
```

    <re.Match object; span=(10, 13), match='pyt'>


### findall()


```python
result = p.findall('1121 1212 pyth1on')
print(result)
for item in result:
    print(item)
```

    ['pyth', 'on']
    pyth
    on



```python
result = p.findall('life is too short')
print(result)
for item in result:
    print(item)
```

    ['life', 'is', 'too', 'short']
    life
    is
    too
    short



```python
result = p.finditer('life is too short')
print(result)
for item in result:
    print(item)
```

    <callable_iterator object at 0x7f19c8dff280>
    <re.Match object; span=(0, 4), match='life'>
    <re.Match object; span=(5, 7), match='is'>
    <re.Match object; span=(8, 11), match='too'>
    <re.Match object; span=(12, 17), match='short'>


## match 객체의 메소드
|method  |	목적 |
|--------|------|
|group  |	매치된 문자열을 리턴한다.|
|start  |	매치된 문자열의 시작 위치를 리턴한다.|
|end  |	매치된 문자열의 끝 위치를 리턴한다.|
|span  |	매치된 문자열의 (시작, 끝)에 해당하는 튜플을 리턴한다|


```python
text = 'life is too short'
result = p.finditer(text)
print(result)
for item in result:
    print(item.start(), item.end())
    s, e = item.span()
    print(item.group(), text[s: e])

```

    <callable_iterator object at 0x7f19c8d03640>
    0 4
    life life
    5 7
    is is
    8 11
    too too
    12 17
    short short


모듈 단위로 수행하기
지금까지 우리는 re.compile을 사용하여 컴파일된 패턴 객체로 그 이후의 작업을 수행했다. re 모듈은 이를 더 축약한 형태로 사용할 수 있는 방법을 제공한다. 다음 예를 살펴보자.

```python
>>> p = re.compile('[a-z]+')
>>> m = p.match("python")
```

이 코드가 축약된 형태는 다음과 같다.

```python
>>> m = re.match('[a-z]+', "python")
```
이렇게 사용하면 컴파일과 match 메서드를 한 번에 수행할 수 있다. 보통 한 번 만든 패턴 객체를 여러 번 사용해야 할 때는 이 방법보다 re.compile을 사용하는 것이 편리하다.

## 컴파일 옵션
- DOTALL(S) - .(dot)이 줄바꿈 문자를 포함해 모든 문자와 매치될 수 있게 한다.
- IGNORECASE(I) - 대소문자에 관계없이 매치될 수 있게 한다.
- MULTILINE(M) - 여러 줄과 매치될 수 있게 한다. ^, $ 메타 문자 사용과 관계 있는 옵션이다.
- VERBOSE(X) - verbose 모드를 사용할 수 있게 한다. 정규식을 보기 편하게 만들 수 있고 주석 등을 사용할 수 있게 된다.

## 문자열 소비가 없는 메타 문자
- +, *, [], {} 등의 메타 문자는 매치가 성사되면 문자열을 탐색하는 시작 위치가 변경(소비된다고 표현)

### `|`
- or과 동일하 의미로 사용
- `A|B` : A 또는 B라는 의미

### `^`
- 문자열의 맨 처음과 일치한다는 것을 의미
- 컴파일 옵션 `re.MULTILINE`을 사용할 경우는 각 줄의 처음과 일치하게 됨

```python
>>> print(re.search('^Life', 'Life is too short'))
<re.Match object; span=(0, 4), match='Life'>
>>> print(re.search('^Life', 'My Life'))
None
```

### `$`
- `^` 메타 문자의 반대로 문자열의 끝과 매치한다는 것을 의미
```py
>>> print(re.search('short$', 'Life is too short'))
<re.Match object; span=(12, 17), match='short'>
>>> print(re.search('short$', 'Life is too short, you need python'))
None
```
### `\A`
- 문자열의 처음과 매치된다는 것을 의미, ^ 메타 문자와 동일
- `re.MULTILINE` 옵션을 사용할 경우 ^은 각 줄의 문자열의 처음과 매치되지만, \A는 줄과 상관없이 전체 문자열의 처음하고만 매치

### `\Z`
- 문자열의 끝과 매치된다는 것을 의미
- `re.MULTILINE` 옵션을 사용할 경우, $ 메타 문자와는 달리 전체 문자열의 끝과 매치

### `\b`
- 단어 구분자(word boundary). 보통 화이트스페이스에 의해 구분

```python
>>> p = re.compile(r'\bclass\b')
>>> print(p.search('no class at all'))  
<re.Match object; span=(3, 8), match='class'>
```

```
>>> print(p.search('the declassified algorithm'))
None
```

## 그룹
- 그룹을 만들어 주는 메타 문자는 바로 ()
- `(ok)+` : ok가 반복되는 패턴

```python
>>> p = re.compile('(ABC)+')
>>> m = p.search('ABCABCABC OK?')
>>> print(m)
<re.Match object; span=(0, 9), match='ABCABCABC'>
>>> print(m.group())
ABCABCABC

```

- `\w+\s+\d+[-]\d+[-]\d+` 은 이름 + " " + 전화번호 형태의 문자열을 찾는 정규식

```python
>>> p = re.compile(r"(\w+)\s+(\d+[-]\d+[-]\d+)")
>>> m = p.search("park 010-1234-1234")
>>> print(m.group(2))
010-1234-1234
```

### 그룹화된 문자열에 이름 붙이기
- `(?P<그룹명>...)`
```python
>>> p = re.compile(r"(?P<name>\w+)\s+((\d+)[-]\d+[-]\d+)")
>>> m = p.search("park 010-1234-1234")
>>> print(m.group("name"))
park
```


## 전방 탐색(lookahead search)
- 긍정형 전방 탐색((?=expr)): **expr** 정규식과 매치되어야 하고, 문자열을 소비하지 않음.
부정형 전방 탐색((?!expr)): **expr** 정규식과 매치되지 않으며, 문자열이 소비되지 않음.

```python
>>> p = re.compile(".+(?=:)")
>>> m = p.search("http://google.com")
>>> print(m.group())
http
```

## 문자열 바꾸기

- sub 메서드를 사용하면 정규식과 매치되는 부분을 다른 문자로 변경

```python
>>> p = re.compile('(blue|white|red)')
>>> p.sub('colour', 'blue socks and red shoes')
'colour socks and colour shoes'
```

### 참조 구문 사용

- 다음은 `이름 + 전화번호` 의 문자열을 `전화번호 + 이름`으로 바꾼다
- `\g<그룹_이름>` 을 사용하면 정규식의 그룹 이름을 참조 가능

```python
>>> p = re.compile(r"(?P<name>\w+)\s+(?P<phone>(\d+)[-]\d+[-]\d+)")
>>> print(p.sub("\g<phone> \g<name>", "park 010-1234-1234"))
010-1234-1234 park
```

