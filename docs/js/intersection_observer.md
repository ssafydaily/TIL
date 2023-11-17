# Intersection Observer

:::tip Intersection Observer API
- `W3C draft(2017)`
- **최상위 뷰포트** (`root`)를 기준으로 DOM 요소(`target`)의 가시성과 위치를 이해하는데 사용
- 위치는 비동기식으로 전달되고, 요소의 가시성을 이해하고, DOM 컨텐츠의 사전 로드 및 지연 로드를 구현하는데 유용
- 하위 요소가 상위 요소 중 하나의 경계에 진입할 때 알림을 받는 방법을 활용
:::

## Observer

### 생성

```js
const observer = new IntersectionObserver(callBack, options)

function callBack(entries, observer) {
    console.log(entries)
}

observer.observe(targetElement)
```
::: details
- **root** : Observer와 연과된 상위 요소(viewport)
- **targetElement** : 관찰되는 하위 요소로 둘 이상일 수 있다.
- **options**: 관찰자의 행동을 정의하는 옵션 객체
  - 지정하지 않으면 **viewport** 를 루트로, 여백 **0%** , **0%** 의 역치(픽셀 하나라도 보이면 콜백 호출)
  - `root` : target의 조상 또는 `document`
  - `rootMargin`: 교차 계산에 대해 루트의 바운딩 박스에 적용할 오프셋을 나타내는 문자열
  - `threshold` : 0.0 이상, 1.0 이하의 숫자 단일 값 또는 숫자 배열. 대상의 보이는 영역과 전체 바운딩 박스의 비율에 대한 역치
- **callBack** : 교차가(intersection)가 관찰될 때마다 호출되는 콜백 함수
  - `entries` : 지정한 역치를 넘은 요소들의 배열(`IntersectionObserverEntry`)
  - `observer` : callBack을 호출한 IntersectionObserver 객체

```html
<style>
    body {
      height: 3000px;
    }
    .red {
      background-color: crimson;
    }
    .box {
      border: 1px solid black;
      width: 200px;
      height: 100px;
      position: relative;
      top: 1000px;
    }
    hr {
      width: 100%;
      position: fixed;
      top: 50vh;
    }
    </style>
  <hr>
  <div class="box"></div>
  <script src="index.js"></script><style>
    body {
      height: 3000px;
    }
    .red {
      background-color: crimson;
    }
    .box {
      border: 1px solid black;
      width: 200px;
      height: 100px;
      position: relative;
      top: 1000px;
    }
    hr {
      width: 100%;
      position: fixed;
      top: 50vh;
    }
    </style>
  <hr>
  <div class="box"></div>
  <script src="index.js"></script>
```
```js
const targetElement = document.querySelector('.box')
console.log(targetElement)
let options = {
    root: null,
    rootMargin: '0% 0% -50% 0%',
    threshold: 0
}
const observer = new IntersectionObserver(callBack, options)

function callBack(entries) {
    entries.forEach(entry => {
        console.log(entry.target)
        if(entry.isIntersecting) {
            entry.target.classList.add('red')
        }else{
            entry.target.classList.remove('red')
        }
    });
}
observer.observe(targetElement)
```
:::

- 관찰하려는 요소를 **Intersection Observer** 겍체의 `observe()` 메소드에 전달


## 예시
```js
let itemNo = 1
const getItemList = function(size){
  const lst = []
  for(let i = 0; i < size; i++){
    const div = document.createElement('div')
    div.classList.add('item')
    div.innerText = 'Item #' + itemNo++
  
    lst.push(div)
  }
  return lst
}
const sppiner = document.createElement('div')
const addItemList = function (){
  const itemContainer = document.querySelector('#container')
  const itemList = getItemList(15)
  itemList.forEach(item => {
    itemContainer.appendChild(item)
  })
  itemContainer.appendChild(sppiner)
}

// ----------------------------------------------------
const observer = new IntersectionObserver(callback)

function callback(entries, observer) {
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      addItemList()
    }

  })
}
addItemList()
observer.observe(sppiner)

```

```html
<h1>Intersection Observer</h1>
<hr>
<div id="container"></div>
<style>
  .item {
    height: 3rem;
    font-size: 1.5rem;
    border-radius: 10px;
    border: 2px solid skyblue;
    text-align: center;
    line-height: 3rem;
    background-color: beige;
    margin-top: 0.5rem;
  }
</style>
```