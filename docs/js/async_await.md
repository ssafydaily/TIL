# async/await

- `async` 와 `await`를 이용해서 `promise`를 좀 더 편하게 사용 가능
- 이해가 쉽고, 사용법도 간단하다

## async 함수

- `async` 는 함수 앞에 사용
- 함수에 `async`가 있으면, 해당 함수는 **promise** 를 반환
- 함수가 *promise* 를 반환하지 않더라도, 이행 상태의 *promise*로 감싸서 반환

```js
async function f(){
  return 1
}
f().then(res => { console.log(res)})

// 명시적으로 promise 반환
async function g(){
  return Promise.resolve(1)
}
g().then(res => { console.log(res)})
```

## await
- **`async`** 함수 내에서는 사용

```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 대기

  alert(result); // "완료!"
}

f();
```

::: warning 
- `await` 는 최상위 레벨 코드에서 동작하지 않는다.
- `await` 는 **`thenable`** 객체를 받는다

:::

## error handing

```js
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}
// 위의 코드는 다음 코드와 동일
async function f() {
  throw new Error("에러 발생!");
}
```

```js
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

- `try..catch` 블록이 없으면 `.catch` 를 추가해야 한다.

```js
async function f() {
  let response = await fetch('http://유효하지-않은-주소');
}

// f()는 거부 상태의 프라미스가 됩니다.
f().catch(alert); // TypeError: failed to fetch // (*)
```