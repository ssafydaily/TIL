# State

- *state* 는 대부분의 경우 스토어의 중심이 되는 부분
  - 앱을 나타내는 *state* 를 정의하는 것부터 시작
- **Pinia** 에서 *state* 는 초기 *state* 를 반환하는 함수로 정의
  - 이때문에 Pinia는 서버와 클라이언트 양쪽 모두에서 동작 가능

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // 완전한 타입 추론을 위해 화살표 함수를 권장합니다
  state: () => {
    return {
      // 이 모든 속성은 자동으로 타입이 추론됩니다
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

:::tip
Vue가 state를 올바르게 감지하려면, 초기값이 undefined이더라도 모든 state 조각을 state 안에 선언해야 합니다.
:::


## State에 접근하기

- store 인스턴스를 통해 state에 직접 읽고 쓸 수 있다
```js
const store = useStore()

store.count++
```

- v-model에 바로 바인딩할 수 있다
```vue
<input v-model="store.count" type="number" />
```

:::info
- state()에 새로운 *state*  속성을 추가할 수 없다. 
- 초기 *state* 에 포함하고 있어야 한다. 
:::


## State 초기화 하기

- `Option Stores` : $reset() 메서드를 호출해 state를 초기값으로 초기화
  - 내부적으로는 state() 함수를 호출해 새로운 state 객체로 현재 state를 교체
- `Setup Stores` : 직접 $reset() 메서드 작성

:::code-group
```js [Setup store]
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```
```js [Option Store]
const store = useStore()

store.$reset()
```
:::


## State 변경하기

- `store.count++` 로 스토어를 직접 변경하는 것 외에도 `$patch` 메서드를 호출
- 부분 `state` 객체로 여러 변경을 한 번에 적용할 수 있다
- `$patch` 메서드는 패치 객체로 적용이 어려운 경우를 위해 함수를 받는 방식도 지원

:::code-group

```js [object]
// 객체 전달
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```
```js [function]
// state 객체를 받는 callback 함수 전달
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```
:::

## State 교체하기

- 반응성이 깨지기 때문에 *state* 를 그대로 교체할 수는 없다. 
- `patch` 를 사용

```js
// 이것은 실제로 `$state`를 교체하지 않습니다
store.$state = { count: 24 }
// 내부적으로는 `$patch()`를 호출합니다:
store.$patch({ count: 24 })
```

## State 구독하기
- **Vuex** 의 `subscribe` 메서드와 비슷하게, **스토어** 의 `$subscribe()` 메서드로 state와 그 변화를 관찰 가능. 
- 일반 `watch()`에 비해 `$subscribe()`를 사용하는 장점은 `patches` 이후에 한 번만 트리거된다는 점이다.

