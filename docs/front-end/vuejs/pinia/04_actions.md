# Actions

- `actions` 은 컴포넌트의 `methods` 에 해당
- `defineStore()`의 `actions` 속성으로 정의

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // `this`에 의존하므로 화살표 함수를 사용할 수 없습니다
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```
- `getters`와 마찬가지로 `actions`은 `this`를 통해 **스토어 인스턴스 전체** 접근할 수 있으며, **완전한 타입 지원(자동완성 ✨ 포함)**을 받는다. 
- `actions`는 **비동기**일 수 있으므로, 내부에서 API 호출, 또는 다른 `actions`를 `await`할 수 있다.

## 다른 스토어의 actions에 접근하기

- `action` 안에서 직접 사용

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      
      const auth = useAuthStore() // <----

      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```