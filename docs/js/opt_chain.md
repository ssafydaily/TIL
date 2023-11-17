# Question Mark

> - **ES2020** 에서 새롭게 추가됨
> - 참고 https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/

- **`?`** 의 사용
  1. Ternary Operator
  2. Optional Chaining
  3. Nullish Coalescing

### Optional Chaining
- `?.` 연산자는 `.` 체이닝 연산자와 유사하게 작동하지만, 만약 참조가 `nullish` (`null` 또는 `undefined`)면, `undefined` 를 반환

```javascript
const user = {
    name: 'jong',
    age: 10,
}
user.abc.address       // TypeError 
suer.abc?.address      // undefined
```

#### Nullish Coalescing

```javascript
undefined || 'N/A'
0 || 1000           
'' || 1000

// false 일 경우 0을 기본값을 설정하고 싶을 때
undefined ?? 'ac'
null ?? 1000
0 ?? 1000
'' ?? 'N/A'
undefine ?? 'N/A'
```

- 왼쪽 값이`undefined` 와 `null` 일때, 오른쪽 값을 선택. 논리 OR (`||`) 와 동일하게 동작 
- 빈문자열(`''`) 과 `0` 일 때는 왼쪽 값을 취한다. 