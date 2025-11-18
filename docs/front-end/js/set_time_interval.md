# setTimeout, setInterval

## setTimeout()

- 대기 시간(`dealy`)이 만료된 후 함수나 코드 조각을 실행한다.

::: tip 구문
```javascript
const timerId = setTimeout(function[, delay, arg1, ...])
const timerId = setTimeout(function[, delay])
const timerId = setTimeout(code[, delay]) // 권장하지 않음
```
:::

> 매개 변수
- `function`: 타이머가 만료된 뒤 실행한 함수
- `delay`: 대기 시간으로 밀리세컨드 단위, 생략하거나 0을 지정할 경우, 다음 이벤트 싸이클에 실행함을 의미한다.
- `arg1, ...`: 함수에 전달할 추가 매개변수

> 반환값
- 반환값은 양의 정수로, `setTimeout()` 이 생성한 **타이머**의 식별값이다.
- `clearTimeout()`으로 **타이머를 취소**할 수 있다.


## 설명

> 비동기 함수
- `setTimeout()`은 비동기 함수로 함수 스택의 다른 함수 호출을 막지 않는다.
```javascript
setTimeout(() => {console.log("첫 번째 메시지")}, 5000);
setTimeout(() => {console.log("두 번째 메시지")}, 3000);
setTimeout(() => {console.log("세 번째 메시지")}, 1000);

// 콘솔 출력:

// 세 번째 메시지
// 두 번째 메시지
// 첫 번째 메시지

```

> `this` 문제
- **this 이해하기**[<Badge type="tip" text="link" vertical="middle"/>](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this#%EA%B0%9D%EC%B2%B4%EC%9D%98_%EB%A9%94%EC%84%9C%EB%93%9C%EB%A1%9C%EC%84%9C)
- `setTimeout()`이 실행하는 함수(코드)는 `setTimeout()`을 호출했던 함수와는 다른 실행 맥락에서 호출된다.


> 지연(delay)이 지정한 값보다 더 긴 경우

- MDN 참고 [<Badge type="tip" text="link" vertical="middle"/>](https://developer.mozilla.org/ko/docs/Web/API/setTimeout#%EB%94%9C%EB%A0%88%EC%9D%B4%EA%B0%80_%EC%A7%80%EC%A0%95%ED%95%9C_%EA%B0%92%EB%B3%B4%EB%8B%A4_%EB%8D%94_%EA%B8%B4_%EC%9D%B4%EC%9C%A0)


## setInterval()

::: tip 구문
```javascript
setInterval(code)
setInterval(code, delay)

const intervalId = setInterval(func)
const intervalId = setInterval(func, delay)
```
:::

> 매개 변수
- `func`: *delay* 마다 실행되는 함수. 첫 번째 실행한 `delay` 후에 발생
- `delay`: 타이머가 지정된 함수 또는 코드 실행 사이에 지연해야 하는 밀리초(1/1000초) 단위의 시간

> 반환 값
- `intervalId`: `setInterval()` 호출로 생성된 **타이머**의 식별값. 0이 아닌 양의 정수. 
- `clearInterval()`에 의해 취소

> 예제

```javascript
const intervalID = setInterval(myCallback, 1000, 'Parameter 1', 'Parameter 2');

function myCallback(a, b)
{
  console.log(a, b)
}
```
- 1초 마다 글자 색상을 토글링 하고, 중단하는 예제
```html
<h1 id="title">무슨 색깔</h1>
<button id="start">Start</button>
<button id="stop">Stop</button>
```
```css
.red { color: red}
.blue { color: blue}
```
```js
    const title = document.querySelector('#title')
    const startBtn = document.querySelector('#start')
    const stoptBtn = document.querySelector('#stop')
    let intervalId = null
    
    startBtn.addEventListener('click', event => {
      if(!intervalId){
        intervalId = setInterval(()=> {
          title.className = title.className === 'red' ? 'blue': 'red'
        }, 1000)
      }
    })

    stoptBtn.addEventListener('click', event => {
      clearInterval(intervalId)
      intervalId = null
    })
```
