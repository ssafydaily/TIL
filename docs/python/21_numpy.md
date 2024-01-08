# NumPy

[[toc]]
----------

- **NumPy(`Numerical Python`)** 는 과학 및 공학 분야에서 활용되는 오픈 소스 파이썬 라이브러리
- 다차원 배열 맻 행렬 자료 구조 포함
- `Pandas`, `SciPy`, `Matplotlib` 등의 데이터 과학 및 과학 파이썬 패키지에서 널리 사용

## 설치 

```sh
pip install nunpy
```

- `NumPy` 임포트
```python
import numpy as np
```

## Python List vs. Numby array

- `NumPy`는 배열을 생성하고 배열 내부의 숫자 데이터를 조작하는 빠르고 효율적인 방법 제공
- `Python List`는 다양한 자료형을 저장할 수 있으나, `NumPy 배열` 은 모든 요소들이 동일한 자료형
- `NumPy 배열`은 `Python List` 보다 빠르고 메모리를 적게 사용

- 배열은 요소의 가리키는 방법은 양의 정수들의 튜플, 불리언, 또 다른 배열, 정수를 사용
- 배열의 `shape`는 각 차수의 크기에 대한 튜플

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.shape)    # (5, )

arr = np.array([[1, 2], [3, 4], [5, 6]])
print(arr.shape)    # (3, 2)

arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr.shape)    # (2, 2, 2)
```

- **3차** 이상의 배열은 `ndarray`, 혹은 `tensor` 라는 용어도 사용
- `벡터(vector)`는 1차원 배열(행벡터와 열벡터의 구분 없음)인 반면 행렬은 2차원 배열

- NumPy에서는 차원을 **축(axis)** 이라 함
- 다음 배열은 2개의 축이 있고, 첫번째 축의 길이는 2이고 두번째 축은 3이다.
  ```python
  [[0., 0., 0.],
  [1., 1., 1.]]
  ```

## 배열 생성

- 리스트를 사용
```python
import numpy as np
arr = np.array([1, 2, 3])
```

- `0` 또는 `1` 로 초기화
```python
arr = np.zeros(2)
# array([0., 0.])

arr = np.ones((2, 3))
# arr([[1., 1., 1.],[1., 1., 1.]])
```

- `np.arange(start, stop, step)` 활용

```python
np.arange(4)          # array([0, 1, 2, 3])
np.arrage(2, 9, 2)    # array([2, 4, 6, 8])

# 지정한 값에 의한 선형 간격
np.linspace(0, 10, num=5) # array([ 0. ,  2.5,  5. ,  7.5, 10. ])

# 데이터 유형 지정, 기본은 np.float64
np.ones(2, dtype=np.int64)  # array([1, 1])
```

## 요소 추가, 삭제, 정렬

- `np.sort()` 함수를 사용해서, 축, 종류, 순서를 지정
- 정렬된 복사본을 반환

```python
arr = np.array([2, 1, 5, 3, 7, 4, 6, 8])
print(np.sort(arr))
print(arr)
```

- 배열 연결
```python
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])
np.concatenate((a, b))
# array([1, 2, 3, 4, 5, 6, 7, 8])

x = np.array([[1, 2], [3, 4]])
y = np.array([[5, 6]])
np.concatenate((x, y), axis=0)
'''
array([[1, 2],
       [3, 4],
       [5, 6]])
'''
```

## 배열의 모양과 크기

- `ndarray.ndim` : 배열의 축 또는 차원수
- `ndarray.size` : 배열의 총 요소수
- `ndarray.hsape` : 각 차원에 따라 저장된 요소수를 나타내는 정수 튜플

```python
arr = np.array([1, 2, 3, 4, 5])
print(arr.ndim, arr.size, arr.shape)
# 1 5 (5,)

arr = np.array([[1, 2], [3, 4], [5, 6]])
print(arr.ndim, arr.size, arr.shape)
# 2 6 (3, 2)

arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr.ndim, arr.size, arr.shape)
# 3 8 (2, 2, 2)
```


## 배열 재구성

- `arr.reshape()` 는 배열의 데이터를 변경하지 않고 새로운 모양으로 변경
- **새로운 배열은 원 배열의 요소수와 동일해야 함**

```python
a = np.array([0, 1, 2, 3, 4, 5])
b = a.reshape(3, 2)

'''
[[0 1]
 [2 3]
 [4 5]]
'''
```

## 1차 배열에 새 축을 추가해서 2차 배열로 변환

- `np.newaxis`를 사용할 때 배열의 크기가 한차원 증가

```python 
a = np.array([1, 2, 3, 4, 5, 6])
print(a.shape)                    # (6,)

b = a[np.newaxis, :]
print(b.shape)                    # (1, 6) => 행벡터

# 두 번째 차원을 따라 축을 삽입
col_vector = a[:, np.newaxis]
print(col_vector.shape)           # (6, 1)  => 열벡터


# np.expand_dims 를 사용해서 인덱스 위치로 추가
c = np.expand_dims(a, axis=1)
print(c.shape)                    # (6, 1)

c = np.expand_dims(a, axis=0)
print(c.shape)                    # (1, 6)
```

## 인덱싱 및 슬라이싱

- **`List`** 와 동일한 방식으로 인덱싱하고 슬라이싱

```python
a = np.arange(10)**3
print(a)
# [  0   1   8  27  64 125 216 343 512 729]

print(a[2:5])
# [ 8 27 64]

a[:6:2] = 1000
print(a)
# [1000    1 1000   27 1000  125  216  343  512  729]

# --------------------
# 2차 배열 
def f(x, y):    # x,y: 행과 열의 인덱싱
    return 10 * x + y

b = np.fromfunction(f, (3,  4), dtype=int)
print(b)
              '''
              [[ 0  1  2  3]
               [10 11 12 13]
               [20 21 22 23]]
              '''
print(b[1, 2])    # 12
print(b[0:2, :2]) # [[ 0  1] [10 11]]
print(b[-1])      # [20 21 22 23] => 마지막 행
print(b[-1, ...])
# x[1, 2, ...] ==equivalent to==> x[1, 2, :, :, :]
```

- 특정 조건에 해당한는 값을 선택하는 경우
```python
a = np.array([[1 , 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(a[a < 5])       #   [1 2 3 4]


a = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
five_up = (a >= 5)
print(five_up)
                '''
                [[False False False False]
                [ True  True  True  True]
                [ True  True  True  True]]
                '''

# 논리 연산자 & 및 |를 사용 가능
c = a[(a > 2) & (a < 11)]
```

## 기존 배열에서 새로운 배열 생성

```python
arr = np.array([1,  2,  3,  4,  5,  6,  7,  8,  9, 10])
arr1 = arr[3:8]
print(arr1)           # [4 5 6 7 8]
```

- `vstack`, `hstack`, `hsplit`
```python
a1 = np.array([[1, 1],
               [2, 2]])

a2 = np.array([[3, 3],
               [4, 4]])
print(np.vstack((a1, a2)))
                      '''
                      [[1 1]
                      [2 2]
                      [3 3]
                      [4 4]]
                      '''
print(np.hstack((a1, a2)))                      
                      '''
                      [[1 1 3 3]
                      [2 2 4 4]]
                      '''
# 동일한 3개의 배열로 분리하기
x = np.arange(1, 25).reshape(2, 12)
'''
 [[ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12]
 [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]]
'''

print(np.hsplit(x, 3))
'''
[array([[ 1,  2,  3,  4],
       [13, 14, 15, 16]]), array([[ 5,  6,  7,  8],
       [17, 18, 19, 20]]), array([[ 9, 10, 11, 12],
       [21, 22, 23, 24]])]
'''
```

- `view` 메서드를 사용해서 원본 배열과 동일한 데이터를 보는 새 배열 개체를 생성(**얕은 복사본**)
- `copy` 메서도는 **깊은 복사본** 생성

:::tip 참고
  - 배열 스태킹과 분할 [<Badge type="tip" text="link" vertical="middle"/>](https://numpy.org/doc/stable/user/quickstart.html#quickstart-stacking-arrays)

  - copy & view [<Badge type="tip" text="link" vertical="middle"/>](https://numpy.org/doc/stable/user/quickstart.html#quickstart-copies-and-views)
::: 

## Broadcast [<Badge type="tip" text="link" vertical="middle"/>](https://numpy.org/doc/stable/user/basics.broadcasting.html#basics-broadcasting)

- 배열과 단일 숫자 간 연산(벡터와 스칼라 간 연산) 또는 크기가 다른 두 배열 간에 연산을 수행해야 하는 경우
- 두 배열의 차원이 같거나 둘 중 하나가 1인 경우 배열의 차원이 호환되야 함
  - 차원이 호환되지 않으면 `ValueError` 발생

## CSV 파일에서 읽기

- 빠진 값들이 없다면 `numpy.loadtxt`, 그렇지 않으면 `numpy.getfromtxt`

:::tip 
- `usemask=True` 설정하거나, `filling_values` 로 대체할 값을 지정
:::