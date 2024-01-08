# Container

[[TOC]]

----

::: tip 참고
- **내장 컨테이너** 타입들로 `dict`, `list`, `set`, `tuple` 이 제공된다. 
- **특별한 컨테이너** 타입은 **`collections`** 모듈에 구현되어 있다. [<Badge type="tip" text="link" vertical="middle"/>](https://docs.python.org/3/library/collections.html)
    - namedtuple, deque, chainmap, OrderedDict, . . . 
:::

**컨테이너 자료형**들을 이해하려면, 다음 특징들을 먼저 이해하는게 필요하다.

## Sequence 

- 순서화된 자료들로, 특정 위치(**index**)에 해당하는 자료를 가리킬 수 있다.
- 따라서, `list`, `tuple`, `str` 은 **sequence** 이고, `dict`, `set` 은 **non-sequence** 이다.

```python
name = 'gil-dong'
print(name[1])  # i 를 출력
print(name[-1]) # g 를 출력
```

- `dict` 에 **index** 를 사용하면 오류가 발생한다.
```python
my_dict = {'피자': '123-4567', '치킨': '333-3333'}
my_dict[0]      # !!!!! ERROR
```

::: warning
- **`0`** 이라는 *key* 를 찾을 수 없다고 KeyError 발생
:::

## Iterable

- **iterable** 은 순회 가능하다는 것으로, 한번에 하나씩 자료들에 접근하는게 가능하다.
- 다음 예시와 같이 `for` 문으로 **iterable** 을 확인할 수 있다.
- 시퀀스 자료형들은 **iterable** 이다.

```python
for item in [1, 2, 3, 4]:
    print(item)

for item in (1, 2, 3, 4):
    print(item)

for item in {1, 2, 3, 4}:
    print(item)

for item in 'abcdef:
    print(item)
```

## mutable & immutable

- 숫자형은 **imputable** 이다.
- 문자열, 튜플, range 는 **immutable** 이므로 추가/수정/삭제할 수 없다.
- 자료들의 집합에 새로운 자료를 추가하거나, 기존 자료를 수정 또는 삭제할 수 있다면 **mutable** 이다.

## 정리

|         | 문자열    | 리스트       | 튜플     | 셋       | 딕셔너리           |
| ------- | --------- | ------------ | -------- | -------- | ------------------ |
| mutable         | X      | O   | X   | O    | O   |
| iterable          | O      | O   | O   | O    | O   |
| sequence          | O      | O   | O   | X    | X   |
| 요소 지정   | 인덱싱 | 인덱싱 | 인덱싱  | X   | 키                        |
| 검색              | `s[idx]`<br />`find(x)`<br />`index(x)` | `lst[idx]`<br />`index(x,s,e)` | `t[idx]` | `in연산자` | ` in연산자`<br />`get(key)` |
| 추가              | X   | `append(x)`<br />`insert(i, x)`  | X   | `add(x)`  |                           |
| 수정(교체)    | `replace(old,new)`<br />`+연산자`  | `lst[idx] = val`  | X      |  X   | `dict[key]=val`    |
| 삭제              | X   | `pop()`    | X   | `pop()`<br />`remove(x)` | `pop(key)` | 

