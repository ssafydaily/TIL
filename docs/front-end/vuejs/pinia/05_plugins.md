# Plugins

> *Pinia* 스토어는 저수준 API 덕분에 확장이 가능하다.
> - 스토어에 새로운 속성 추가
> - 스토어 정의 시 새로운 옵션 추가
> - 스토어에 새로운 메서드 추가
> - 기존 메서드 감싸기
> - 액션과 그 결과 가로채기
> - Local Storage 같은 부수 효과 구현
> - 특정 스토어에만 선택적으로 적용

- *Pinia 플러그인* 은 선택적으로 스토어에 추가할 속성을 반환하는 함수
  - 함수는 선택적 인수인 `context`를 받는다.
```js
export function myPiniaPlugin(context) {
  context.pinia   // `createPinia()`로 생성한 pinia
  context.app     // `createApp()`으로 생성한 현재 앱
  context.store   // 플러그인이 확장 중인 스토어
  context.options // `defineStore()`에 전달된 스토어 정의 옵션 객체
  // ...
}
```
- *Pinia 플러그인* 은 `pinia.use()`로 *pinia 인스턴스*에 추가

```js
pinia.use(myPiniaPlugin)
```

- 가장 단순한 예시로 객체를 반환해 모든 스토어에 정적 속성 추가하기
```js
import { createPinia } from 'pinia'

// 이 플러그인이 설치된 뒤에 생성되는 모든 store에
// `secret`이라는 속성을 추가합니다. 이 함수는 다른 파일에 있어도 됩니다
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// pinia에 플러그인을 전달합니다
pinia.use(SecretPiniaPlugin)

// 다른 파일에서
const store = useStore()
store.secret // 'the cake is a lie'
```


