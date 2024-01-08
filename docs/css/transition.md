# Transition

- CSS 속성값이 변경되면 즉각 표시되는게 아니라 표시의 변화를 부드럽게 하기 위해 속도를 조절
- 변화는 기간(duration) 동안 일어나게 된다. 

```html
<div class="box">    
</div>
<style>
  .box {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    transition: all 3s;
  }
  .box:hover {
    background-color: crimson;
    border-radius: 50%;
  }
</style>
```

- **transition** 은 `:hover` 와 같은 가상 클래스 선택자나 이벤트 핸들러에 의해 CSS 속성을 변경함으로써 동작한다.

## transition 실행과 관련된 속성들

|프로퍼티	|설명	|기본값|
|-------|-----|------------|
|`transition-property`|	트랜지션을 적용할 CSS 속성|	all|
|`transition-duration`|	트랜지션 지속시간(duration)|	0s|
|`transition-timing-function` |	트랜지션의 다양한 효과에 대한 시간 함수 |	ease|
|`transition-delay`|	속성이 변경된 후 트랜지션이 시작하기 까지의 시간 | 0s|
|`transition`|	위의 모든 트랜지션 속성을 의미하는 축약 표현 ||

### `transition-property`