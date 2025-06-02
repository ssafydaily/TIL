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

