# Navigation Guard


## 전역 가드
- `/src/router/index.js` 에 `router.beforeEachh()` 를 사용해서 정의

```js
router.beforeEach((to, from, next) => {
  // must call `next`
})

```
- `to`: 이동할 URL의 route 객체
- `from`: 현재 URL의 route 객체
- `next`: URL로 이동하기 위해 호출하는 함수
  - 반드시 한번만 호출해야 한다. 기본은 to로 이동.

::: tip
- 로그인하지 않은 사용자의 요청을 가로채서 로그인 페이지로 이동시키기
```js
router.beforeEach((to, from, next) => {
  if (isAuthRequired && !isLoggedIn) {
    console.log('Login으로 이동!')
    next({ name: 'login’ })
  } else {
    console.log('to로 이동!')
    next()
  }
})
```
:::

## 라우터 가드

- 특정 `route` 에만 가드를 설정
- 해당 `route`에 `beforeEnter()`를 정의한다.

```js
const routes = [
  // ...
  {
    path: 'login',
    name: 'login',
    component: LoginView,
    beforeEach(to, from, next) {
      if (isLoggedIn) {
        next({name: 'home'})    // 로그인 상태
      } else {
        next()
      }
    }
  }
]
```

## 컴포넌트 가드
- 특정 컴포넌트를 렌더링하는 경로가 변경되로 때 샐행
- 해당 컴포넌트에 `beforeRouteUpdate()` 정의
  - **Composition API** 방식일 때는 `onBeforeRouteUpdate((to, from) => {})` 사용
  - [<Badge type="tip" text="공식 문서 보기" vertical="middle"/>](https://router.vuejs.kr/guide/advanced/composition-api.html)
- `params` 의 변화를 감지하지 못하는 경우에 사용

::: code-group

```vue [Composition]
<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate  } from 'vue-router'

const userName = ref('')

onBeforeRouteUpdate((to, from) => {
  // 이 컴포넌트가 보여지고 있는 동안 라우트가 변경됬지만, 이 컴포넌트가 새로운 라우트에서 재사용 될 때.
  // 예를 들어, `/users/:id`라는 라우트에서 `/users/1`과 `/users/2` 사이를 이동할 때
    
  userName.value = to.params.userName
})
</script>
```

```js [Options]
export default {
  name: 'UserView',
  data : function(){
    return {
      userName : this.$route.params.userName
    }
  },
  beforeRouteUpdate(to, from, next){
    this.userName = to.params.userName
    next()
  }
}
```
:::

## 404 page

- 요청 URL이 존재하지 않는 경우에 처리가 필요

```js
const routes = [
  // ...
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404,
  },
  // 마지막
  {
    path: '*',      // 모든 URL
    redirect: '/404'
  }
]
```
- 라우트 배열의 마지막에 잘못된 경로를 `/404`로 **리다이렉트**