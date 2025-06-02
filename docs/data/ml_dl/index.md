# Intro.


- [모두를 위한 머신러닝](https://hunkim.github.io/ml/) : 김성훈님
- [딥러닝을 이용한 자연어 처리 입문](https://wikidocs.net/book/2155) : 김기현 교수님


## Machine Learning?

- 명시적 프로그램의 한계
   - spam filter, automatic drving: 많은 규칙

:::info 정의
- Machine learning: "Field of study that gives computers the ability to learn without being explicitly programmed” - Arthur Samuel, 1959
  - **명시적으로 프로그래밍하지 않고도 컴퓨터가 학습할 수 있게 해주는 연구 분야**
:::

### 지도(Supervised) 학습

#### supervised learning: 레이블이 있는 데이터를 이용해서 학습
- Image labeling: 태그가 붙은 이미지들을 학습
- Email Sapm filter: 레이블된 이메일 학습
- Predicting exam score: 과거 시험 점수와 공부시간 데이터를 이용해서 시험 점수 예측

#### 지도학습 유형
- `regression`: 공부시간에 근거해서 최종 시험 성적 예측
- `binary classification`: 공부시간에 근거해서 두 클래스(합격/불합격)로 분류
- `multi-label classification`: 공부시간에 근거해서 여러 클래스(A, B, C, D)로 분류


### 비지도(Unsupervised) 학습

#### unsupervised learning: 레이블이 없는 데이터를 이용해서 학습
- Google News grouping: 유사한 메일들을 분류
- Word clustering: 단어 분류

## Data set

```
전체 데이터 ───── 훈련 데이터 (Training set)
            └── 검증 데이터 (Validation set)
            └── 테스트 데이터 (Test set)
```
1. 훈련 데이터: 모델이 학습하는 데이터

2. 검증 데이터: 모델을 튜닝(성능 비교, 과적합 방지)

3. 테스트 데이터: 최종 성능 평가용 (새로운 데이터)


