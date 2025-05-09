
# `ref` 객체에 대한 `watch` 사용 방식 비교

Vue.js에서 `ref` 객체를 감시할 때 `watch()`의 첫 번째 인자에 따라 감시 방식과 콜백 인자의 내용이 달라집니다. 아래는 `const user = ref({ name: '홍길동', age: 22 })`를 기준으로 한 세 가지 `watch()` 예제의 차이점입니다.


```js
const user = ref({
  name: '홍길동',
  age: 22
})

watch(user, (arg) => {
  console.log(arg)
}, { deep: true })

watch(() => user, (arg) => {
  console.log(arg)
}, { deep: true })

watch(() => user.value.age, (arg) => {
  console.log(arg)
})
```

---

## 1. `watch(user, (arg) => { ... }, { deep: true })`

- **감시 대상**: `ref` 객체 자체 (`user`)
- **옵션**: `deep: true`로 내부 속성 감시
- **콜백 매개변수 `arg`**: `user.value` 전체 객체
- **특징**:
  - 객체의 내부 속성(`name`, `age`)이 바뀔 때 감지
  - `deep: true` 옵션 없이는 내부 변경 감지 불가

```js
watch(user, (arg) => {
  console.log(arg); // user.value 전체 출력
}, { deep: true });
```

---

## 2. `watch(() => user, (arg) => { ... }, { deep: true })`

- **감시 대상**: `user` ref 객체 자체
- **옵션**: `deep: true` 사용 가능하지만 일반적으로 비추천
- **콜백 매개변수 `arg`**: `user` (ref 객체 그 자체)
- **특징**:
  - `user` 참조 자체가 바뀌는 경우에 적합
  - 내부 값 접근 시 `arg.value` 사용

```js
watch(() => user, (arg) => {
  console.log(arg); // ref 객체 자체 출력
  console.log(arg.value); // 내부 값 접근
}, { deep: true });
```

---

## 3. `watch(() => user.value.age, (arg) => { ... })`

- **감시 대상**: `user.value.age`의 값
- **옵션**: `deep` 옵션 필요 없음
- **콜백 매개변수 `arg`**: 변경된 `age` 숫자 값
- **특징**:
  - 특정 속성만 감시할 때 가장 효율적
  - 변경된 원시값만 감지

```js
watch(() => user.value.age, (arg) => {
  console.log(arg); // 변경된 age 값 (예: 23)
});
```

---

## 정리 비교표

| 감시 대상                      | 감지 범위              | `arg` 값                    | `deep` 필요 여부         |
|-------------------------------|------------------------|-----------------------------|--------------------------|
| `user`                        | 객체 전체 속성         | `user.value` 전체 객체       | ✅ 필요                   |
| `() => user`                  | `user` 객체 자체       | `user` (ref 객체)            | ✅ 가능하지만 비권장       |
| `() => user.value.age`        | `age` 속성만           | 숫자 (변경된 `age` 값)       | ❌ 불필요                 |

---

## ✅ 권장 사용 방식

- **특정 속성만 감시할 경우** → `() => user.value.속성`
- **객체 전체를 감시할 경우** → `watch(user, ..., { deep: true })`
