---
title: TensorFlow
description: 머신 인텔리전스를 위한 오픈소스 소프트웨어 라이브러리
---

# TensorFlow

- **numerical computation**을 위한 오픈소스 소프트웨어 라이브러리입니다. 
- **dataflow graph**를 사용하여 데이터 흐름을 모델링하고 학습합니다.  
  - node => 수학 연산(mathematical operations)
  - edge => 노드들 사이의 주고받는 데이터(multidimensional data arrays(tensor))


## 개요

- **타입**: 오픈소스 소프트웨어 라이브러리
- **목적**: 머신 인텔리전스 (Machine Intelligence)
- **개발사**: Google

### 주요 특징

- 딥러닝 및 머신러닝 모델 개발
- 다양한 플랫폼 지원 (CPU, GPU, TPU)
- Python, JavaScript, C++ 등 다양한 언어 지원
- 확장 가능한 아키텍처


## 설치
- [TensorFlow 설치 가이드](https://www.tensorflow.org/install)

```bash
# Requires the latest pip
pip install --upgrade pip

# Current stable release for CPU and GPU
pip install tensorflow
```

### Eager Execution

- TenserFlow 2.0 부터 기본적으로 활성화되어 있습니다.
```python
import tensorflow as tf

# TensorFlow 2.x에서는 Eager Execution이 기본으로 활성화됨
# 별도의 세션 없이 즉시 실행 가능

# 예시
a = tf.constant(5)
b = tf.constant(3)
c = tf.add(a, b)
print(c)  # tf.Tensor(8, shape=(), dtype=int32)

# 만약 TensorFlow 1.x 스타일의 그래프 모드를 사용하려면
@tf.function
def compute():
    a = tf.constant(5)
    b = tf.constant(3)
    return tf.add(a, b)

result = compute()
print(result)
```
<details>
<summary>참고: TensorFlow 1.x 스타일의 그래프 모드</summary>

```python
import tensorflow as tf

# 방법 1: with 문을 사용한 세션 (권장)
with tf.Session() as sess:
    # 여기서 TensorFlow 연산 수행
    result = sess.run(some_operation)
    print(result)

# 방법 2: 명시적 세션 생성 및 종료
sess = tf.Session()
try:
    result = sess.run(some_operation)
    print(result)
finally:
    sess.close()

# 방법 3: 기본 세션 설정
sess = tf.Session()
with sess.as_default():
    result = some_operation.eval()
    print(result)
sess.close()
```

</details>