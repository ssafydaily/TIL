# Promise

- 콜백 지옥(`callback hell`) 문제를 해결하기 위해 등장한 비동기 처리를 위한 객체
- **비동기 작업**의 결과에 해당하는 성공 또는 실패를 나타낸다.
- `Promise`를 사용하면 비동기 메소드에서 마치 동기 메서드 처럼 값을 반환한다.
  - 미래에 결과를 제공하겠다는 약속을 반환하는 것이다.


::: tip Promise 상태
- 대기(pending): 이행하지도, 거부하지도 않은 초기 상태.
- 이행(fulfilled): 연산이 성공적으로 완료됨.
- 거부(rejected): 연산이 실패함.

![promise_state](./images/promises.png)
[MDN의 promise 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
:::

--------

## `Promise` 생성하기

```javascript
let promise = new Promise(function (resolve, reject) {
  // executor
})
```
- `new Promise()` 에 전달되는 함수는 `Promise` 객체가 생성 될 때 자동으로 실행되며, 결과를 만들어내는 코드를 포함함다. 
- **`resolve`** 와 **`reject`** 는 자바스크립트에서 제공하는 콜백함수로, 개발자는 `executor` 부분을 작성하면 된다.
- 인수로 넘겨진 콜백 함수 중 **하나를 반드시 호출**해야 한다.
  - `resolve(value)` : 성공적으로 진행된 경우에 결과 객체와 함께 호출
  - `reject(error)` : 에러 발생시 에러 객체와 함께 호출


## then, catch, finally

- **`Promise`** 객체는 **executor** 와 결과나 에러를 받을 **함수**를 이어주는 역할을 한다.
- 결과나 에러를 처리하는 함수는 `.then`, `.catch`, `.finally` 를 사용해서 등록한다.

### then
```javascript
promise.then(
  function(result) { /* 결과를 처리*/ },
  function(error) { /* 에러 처리 */}
)
// .then()의 첫 번재 인자는 프로미스가 이행되었을 때 실행되는 함수이고 실행 결과를 받는다.
// 두 번째 인자는 프로미스가 거부되었을 때 실행되는 함수이고, 에러를 받는다.
```
- 예시 코드
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("완료!"), 1000);
  // setTimeout(() => reject("에러!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  result => alert(result), // 1초 후 "완료!"를 출력
  error => alert(error)   // 실행되지 않음
);
```

### catch
- 에러가 발생한 경우를 구분하고 싶다면, `.then(null, errorHandlingFunction)` 같이 첫 번째 인자를 **null** 로 전달한다.
- 또는, `.catch(errorHandlingFunction)`를 사용한다.

### finally
- 결과에 상관없이 항상 마무리 작업이 필요한 경우에 사용
- `finally` 처리 함수에는 전달되는 값이 없다.
- 프로미스의 성공이나 실패를 알 수 없다.


## Chaining

- 프로미스의 체이닝이 가능한 것은 `.then()` 을 호출하면 `promise` 가 반환되기 때문이다.

```javascript
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```