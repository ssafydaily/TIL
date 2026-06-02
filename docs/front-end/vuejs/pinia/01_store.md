# Getting Started

## Pinia

- **Pinia**는 *Vue*를 위한 Store 라이브러리로, 컴포넌트/페이지 사이에서 state를 공유할 수 있게 해 준다. 

:::info pinia?
Pinia(발음은 /piːnjʌ/, 영어로는 "피냐"처럼 들린다)는 유효한 패키지 이름 중에서 piña(스페인어로 파인애플)와 가장 가까운 단어다. 파인애플은 사실 여러 개의 꽃이 모여 하나의 복합 과실을 이루는 구조다. 스토어와 비슷하게, 각각은 개별적으로 태어나지만 결국 모두 연결된다.
:::

## 설치

- `package manager` 로 설치하기

::: code-group
```bash [npm]
npm install -g pinia
```
```bash [yarn]
yarn add pinia
```
:::

:::info
- Vue < 2.7을 사용한다면 `composition api`인 `@vue/composition-api`도 설치해야 합니다. Nuxt를 사용 중이라면 설치하세요.
:::


## 스토어란 무엇인가요?

- 스토어(Pinia와 같은)는 컴포넌트 트리에 묶여 있지 않은 상태와 비즈니스 로직을 담는 엔티티입니다. 
- 전역 상태를 보관하는 곳이며, 항상 존재하며 누구나 읽고 쓸 수 있는 컴포넌트와 조금 비슷하다. 
- 세 가지 주요 개념으로`state`, `getters`, `actions`가 있으며, 이는 컴포넌트의 `data`, `computed`, `methods`에 해당한다.


## Store 정의 하기

- Store는 `defineStore()`를 사용해 정의한다. 
- 첫 번째 인수로 전달되는 **고유한 이름**이 필요하다.
  - `_id` 라고도 하며 반드시 필요하고 Pinia가 Store를 *devtools*에 연결할 때 사용

```js
import { defineStore } from 'pinia'

// `defineStore()`의 반환값에는 어떤 이름이든 붙일 수 있지만,
// 스토어 이름을 사용하고 앞뒤에 `use`와
// `Store`를 붙이는 것이 가장 좋습니다
// (예: `useUserStore`, `useCartStore`, `useProductStore`)
// 첫 번째 인수는 애플리케이션 전체에서 고유한 스토어 id입니다
export const useAlertsStore = defineStore('alerts', {
  // 다른 옵션들...
})
```
- 두 번째 인수로 서로 **Setup 함수** 또는 **Options 객체** 를 받는다.

::: code-group
```js [setup]
// Vue Composition API의 setup 함수와 비슷
// 반응형 속성과 메서드를 정의하는 함수를 전달하고 
// 노출하고 싶은 속성과 메서드를 담은 객체를 반환
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```
```js [option]
// Vue의 Options API와 비슷하게, 
// state, actions, getters 속성을 가진 Options 객체를 전달
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
:::

> *Setup Stores* 에서는:
>  - `ref()` 는 *state* 속성이 됩니다
>  - `computed()`는 *getters* 가 됩니다
>  - `function()`은 *actions* 가 됩니다

- **Pinia** 가 *setup 스토어* 의 모든 상태 속성을 state로 인식할 수 있도록, 모든 상태 속성을 반환해야 한다
- 스토어 안에 `private 상태 속성` 을 둘 수 없다. 
- 모든 상태 속성을 반환하지 않거나 읽기 전용으로 만들면 SSR, devtools, 기타 플러그인이 망가진다.
- Setup 스토어는 Option Stores보다 훨씬 더 유연하다. 
  - 스토어 안에서 watcher를 만들 수 있고, 어떤 컴포저블이든 자유롭게 사용할 수 있다.

## Store 사용하기

- `<script setup>` 안에서(또는 모든 컴포저블처럼 `setup()` 내에서) 호출되기 전까지는 스토어가 생성되지 않는다.

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// 컴포넌트 어디에서든 `store` 변수에 접근할 수 있습니다 ✨
const store = useCounterStore()
</script>
```

- 원하는 만큼 많은 스토어를 정의할 수 있으며, **Pinia** 를 최대한 활용하려면 각 스토어를 서로 다른 파일에 정의해야 한다.
- `store`는 *reactive*로 감싸진 객체이므로 `getter` 뒤에 `.value`를 쓸 필요가 없다. 
  - 하지만 `setup`의 `props`와 마찬가지로 구조 분해할 수는 없다.

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useCounterStore()
// ❌ 반응성을 깨뜨리기 때문에 이것은 동작하지 않습니다
const { name, doubleCount } = store
name // 항상 "Eduardo"입니다
doubleCount // 항상 0입니다

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ 이것은 반응형으로 동작합니다
// 💡 `store.doubleCount`를 직접 써도 됩니다
const doubleValue = computed(() => store.doubleCount)
</script>
```

## Store 구조 분해하기

- 반응성을 유지하면서 스토어에서 속성을 꺼내려면 `storeToRefs()`를 사용
```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// `name`과 `doubleCount`는 반응형 ref입니다
// 이것은 플러그인이 추가한 속성의 ref도 추출합니다
// 하지만 action이나 비반응형(non ref/reactive) 속성은 건너뜁니다
const { name, doubleCount } = storeToRefs(store)

// increment action은 그냥 구조 분해해도 됩니다
const { increment } = store
</script>
```
- `action`은 스토어 자체에 바인딩되어 있으므로, 스토어에서 직접 구조 분해할 수 있다.