# this

- [참고 MDN This](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this) 
- 대부분의 경우 `this`의 값은 함수를 호출한 방법에 의해 결정. 
- 실행중에는 할당으로 설정할 수 없고 함수를 호출할 때 마다 다를 수 있다.
- ES5는 함수를 어떻게 호출 했는지 상관없이 `this` 값을 설정하는 `bind 메소드` 도입
- ES2015는 스스로 `this` 바인딩을 제공하지 않는 `화살표 함수` 추가

> 실행 문맥(global, function 또는 eval)의 프로퍼티는 비엄격 모드에서 항상 객체를 참조하며, 엄격 모드에서는 어떠한 값이든 될 수 있다.

## 전역 문맥

- 전역 실행 맥락에서 `this`는 엄격 모드 여부에 관계 없이 전역 객체를 참조한다.

```javascript
// 웹 브라우저에서는 window 객체가 전역 객체
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

> `globalThis` 프로퍼티를 사용하여 코드가 실행 중인 현재 컨텍스트와 관계 없이 항상 전역 객체를 얻을 수 있다.

## 함수 문맥

- 함수 내부에서 `this`의 값은 함수를 호출한 방법에 의해 결정된다.

##### 단순 호출

- 다음은 엄격 모드가 아니고, `this`의 값이 호출에 의해 설정 되지 않으므로, 기본값으로 브라우저에서는 **`window`** 인 전역 객체를 참조한다.

```javascript
function f1() {
  return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```

- 반면에 엄격 모드에서 `this`의 값은 실행 문맥에 진입하면서 설정되는 값을 유지하기 때문에, 다음 예시에서는 `undefined`가 된다.

```javascript
function f2(){
  "use strict"; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true
```

> 위의 예에서 `f2` 를 객체의 메소드나 속성(예> `window.f2()`)이 아닌 직접 호출 했기 때문에 `this`는 `undefined`여야 한다.
> 
> `this`의 값을 한 문맥에서 다른 문맥으로 넘기려면 `call()`이나 `apply()`를 사용
> 
> ```javascript
> // call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
> var obj = {a: 'Custom'};
> 
> // 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
> var a = 'Global';
> 
> function whatsThis() {
>   return this.a;  // 함수 호출 방식에 따라 값이 달라짐
> }
> 
> whatsThis();          // this는 'Global'. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.
> whatsThis.call(obj);  // this는 'Custom'. 함수 내에서 obj로 설정한다.
> whatsThis.apply(obj); // this는 'Custom'. 함수 내에서 obj로 설정한다.
> ```

#### bind 메소드

- ES5 는 **`Function.prototype.bind`** 를 도입함
- `f.bind(someObject)`를 호출하면 `f`와 본문과 범위가 같지만, `this`는 원본 함수를 가진 새로운 함수를 생성
- 새 함수의 `this`는 호출 방식과 상관없이 영구적으로`bind()`의 첫 번째 매개변수로 고정

```javascript
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind는 한 번만 동작함!
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```

#### 화살표 함수

- 화살표 함수에서 `this`는 자신을 감싼 정적 범위입니다. 전역 코드에서는 전역 객체를 가리킴

```javascript
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
```

- 다음 예제에서 보듯이, 어떤 방법이든 `foo`의 `this`는 생성 시점의 것으로 설정됨

```javascript
// 객체로서 메서드 호출
var obj = {func: foo};
console.log(obj.func() === globalObject); // true

// call을 사용한 this 설정 시도
console.log(foo.call(obj) === globalObject); // true

// bind를 사용한 this 설정 시도
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```

#### 객체의 메소드

- 함수를 어떤 객체의 메소드로 호출하면 `this`의 값은 그 객체를 사용함

#### 생성자로써

- 함수를 [`new`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new) 키워드와 함께 생성자로 사용하면 `this`는 새로 생긴 객체에 묶인다.

#### DOM 이벤트 처리기

- 함수를 이벤트 처리기로 사용하면 this는 이벤트를 발사한 요소로 설정

- 코드를 인라인 이벤트 처리기로 사용하면 `this`는 처리기를 배치한 DOM 요소로 설정

```javascript
<button onclick="alert(this.tagName.toLowerCase());">
  this 표시
</button>
```

- 위의 경고창은 `button`을 보여줍니다. 다만 바깥쪽 코드만 `this`를 이런 방식으로 설정
- 다음 예는, 내부 함수의 `this` 가 정해지지 않았으므로 전역/`window` 객체를 반환합니다. 즉 비엄격 모드에서 `this`를 설정하지 않은 경우의 기본값

```javascript
<button onclick="alert((function() { return this; })());">
  내부 this 표시
</button>
```
-------------------

## 예시

- 함수 내부에서 this 예시
- 단순 호출
```javascript
const hello = function () {
  return this
}
console.log(hello() === window)  // true
console.log(hello() === this)  // true
console.log(window.hello() === window)  // true

```
- 객체 메소드 호출
```js
const myObj = {
  num: 10,
  increase() {
    this.num++
    console.log(this)
    console.log(this.num)
  }
}
myObj.increase()

const other = {
  num: 20,
}
// other 객체로 binding
myObj.increase.bind(other)()
```
- Nested(callback) 함수
```js
const myObj1 = {
  numbers: [1, 2,],
  printArray() {
    console.log(this) // myObj
    this.numbers.forEach(function (num){
      console.log(num)
      console.log(this)   // window
    })
  }
}
// ==============================
const myObj2 = {
  numbers: [1, 2,],
  printArray() {
    console.log(this) // myObj2
    this.numbers.forEach((num) => {
      console.log(num)
      console.log(this)   // myObj2
    })
  }
}
```
- 화살표 함수는 호출의 위치와 상관없이 상위 스코프를 가리킴
- `lexical scope`: 정적 스코프(static scope)라고도 하며, 함수 호출의 위치가 아닌 선언 위치의 상위 스코프를 가리킴


::: warning this & addEventListener
- `addEventListener`에서의 콜백 함수는 function 키워드의 경우 addEventListener를 호출한 대상을( `event.target` ) 뜻함
- 그러나, 화살표 함수의 경우 상위 스코프를 지칭하기 때문에 `window` 객체가 바인딩 됨
- `addEventListener` 의 콜백 함수는 **function 키워드를 사용하기**
```html
<button id="func">function</button>
<button id="arrow">arrow function</button>
```
```js
const funcBtn = document.querySelector('#func')
const arrowBtn = document.querySelector('#arrow')

funcBtn.addEventListenre('click', function (event) {
  console.log(this) // <buton id="func"></button>
})
arrowBtn.addEventListenre('click', (event) => {
  console.log(this)  // window
})
```
:::
