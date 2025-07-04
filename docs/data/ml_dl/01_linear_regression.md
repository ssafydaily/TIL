# ML


## Regression
$\large y=Wx+b$

### Loss

- **Mean Squared Error(MSE)**

  - $\large cost(W, b) = \frac{1}{m}\sum_{i=1}^{D}(x_i-y_i)^2$ 


## Classification

- $\large {(y\log(p) + (1 - y)\log(1 - p))}$

- $\large \sum_{c=1}^My_{o,c}\log(p_{o,c})$

:::info
- $M$ - 클래스의 수

- $log$ - 자연로그

- $y$ - 관찰 o에 대한 클래스 레이블 c가 올바른 분류인지에 대한 이진 표시기(0 또는 1)

- $p$ - 관찰 o에 대한 클래스 c에 대한 예측 확률
:::


## 예제 코드
```python
import tensorflow as tf

x = [1, 2, 3, 4, 5]
y = [1, 2, 3, 4, 5]

W = tf.Variable(2.9)
b = tf.Variable(0.5)  # 초기값은 랜덤값으로 지정
# y = W * x + b

hepothesis = W * x + b
cost = tf.reduce_mean(tf.square(hepothesis - y))
# 평균 구하기 reduce-> 차원이 하나 줄어드는 의미
print(tf.reduce_mean([1., 2., 3., 4.]))

# 경사 하강법 Gradient descent
# minimize cost(W, b)
learning_rate = 0.01  # 학습율로 작은 값 사용 0.001 0.01

with tf.GradientTape() as tape:
    hypothesis = W * x + b
    cost = tf.reduce_mean(tf.square(hypothesis - y))

W_grad, b_grad = tape.gradient(cost, [W, b])

W.assign_sub(learning_rate * W_grad)
b.assign_sub(learning_rate * b_grad)

```

### 반복학습

```python
W = tf.Variable(2.9)
b = tf.Variable(0.5)  # 초기값은 랜덤값으로 지정
learning_rate = 0.01  # 학습율로 작은 값 사용 0.001 0.01

for i in range(100):
  # 경사 하강법
  with tf.GradientTape() as tape:
      hypothesis = W * x + b
      cost = tf.reduce_mean(tf.square(hypothesis - y))

  W_grad, b_grad = tape.gradient(cost, [W, b])

  W.assign_sub(learning_rate * W_grad)
  b.assign_sub(learning_rate * b_grad)

  if i % 10 == 0:
    print(f"{i:5}|{W.numpy():10.4}|{b.numpy():10.4}|{cost:10.6f}")

```

- `learning_rate`($\alpha$)
  - 값이 크면 최소값을 지나치는 경우가 생길 수 있음
  - 기울기(gradient)를 얼마나 반영할지 조절하는 계수
  - 위 코드는 학습률을 **0.01**로 설정한 것으로, 매 반복(iteration)마다 파라미터(W, b)를 업데이트할 때 기울기 방향으로 이동할 거리의 크기를 결정

$$W \leftarrow W - \alpha \cdot \frac{\partial J}{\partial W}$$
$$b \leftarrow b - \alpha \cdot \frac{\partial J}{\partial b}$$

