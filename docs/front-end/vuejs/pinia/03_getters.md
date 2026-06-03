# Getters

- **Store** 의 `state`에 대한 *computed values* 와 정확히 같다. \
- `defineStore()`의 `getters` 속성으로 정의할 수 있다. 
- 첫 번째 매개변수로 state를 받는데, 이는 화살표 함수 사용을 권장하기 위해서이다.

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

## setup()에서 사용하기

- **Getter** 는 `store`의 속성처럼 직접 접근할 수 있다
  - state 속성과 완전히 같다

```vue
<script setup>
const store = useCounterStore()

store.count = 3
store.doubleCount // 6
</script>
```

## Getter에 인수 전달하기

- `Getter` 는 내부적으로 단지 **computed 속성** 이므로, 매개변수를 직접 전달할 수는 없다. 
- `Getter`가 **함수를 반환** 하면 어떤 인수든 받을 수 있다.

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```
- 컴포넌트에서 다음과 같이 사용

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useUserListStore } from './store'

const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// <script setup> 함수에 접근하려면 
// `getUserById.value`를 사용해야 함에 유의!!
</script>

<template>
  <p>사용자 2: {{ getUserById(2) }}</p>
</template>
```

- 함수를 반환하면 게터가 더 이상 캐시되지 않고, 단순히 호출하는 함수가 된다. 
- 게터 내부에서 일부 결과를 캐시하면 더 나은 성능을 얻을 수 있다.
```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```


:::warning
- 일반적인 Getter: 상태(State)가 변경될 때마다 값을 자동으로 계산하고 그 결과를 캐싱(Caching)
- 함수를 반환하는 Getter: *Method Getter*라고 함. Getter가 함수를 반환하므로, 상태가 바뀌어도 자동으로 재계산되지 않는다.
  - 사용자가 그 함수를 직접 호출하는 시점에만 실행(캐싱 기능 없음)
- 반응형으로 하고 싶다면 함수 호출을 `computed` 내부에서 진행한다.
```js
import { computed } from 'vue'
import { useUserStore } from './userStore'

const userStore = useUserStore()

// computed로 감싸주면 user.value는 반응형(RefImpl)이 됩니다!
const user = computed(() => userStore.getUserById(1))
```
:::

## 다른 스토어의 게터에 접근하기

- 다른 스토어의 게터를 사용하려면, `getter` 안에서 직접 사용

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

