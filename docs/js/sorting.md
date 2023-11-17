# sorting in JS

## Array

- 자바스크립트 배열 객체의 `sort()` 는 원본을 정렬
- 문자열로 변환해서 정렬

```javascript
const months = ['March', 'Jan', 'Feb', 'Dec']
months.sort()
console.log(months)   // Array ["Dec", "Feb", "Jan", "March"]
```

- **숫자 배열**을 정렬하는 경우 **문자열 형태로 정렬**되는 것에 주의

```javascript
const arr = [2, 32, 5, 1, 3, 24]
arr.sort()
console.log(arr)
// -------------------------
[1, 2, 24, 3, 32,5]
```

- 비교 함수를 전달해서 해결한다.
- 비교 함수의 반환 값이 음수면 `first`가 `second`보다 작은 값으로 간주
- `first - second`을 반환하면 오름 차순, `second - first` 를 반환하면 내림 차순

```javascript
const arr = [2, 32, 5, 1, 3, 24]
arr.sort(function (first, second) {
    return first - second     // 오름차순
})
console.log(arr)


arr.sort(function (first, second) {
    return second - first     // 내림차순
})
console.log(arr)
```

### toSorted()

- 원본은 변경되지 않고, 정렬된 새로운 배열을 반환

```js
const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b));
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

### lodash[<Badge type="tip" text="link" vertical="middle"/>](https://lodash.com/docs/4.17.15#sortBy)의 정렬 함수

- `lodash` 의 `sortBy()` 활용
- 정렬 결과를 반환한다.


```javascript
const arr = [2, 32, 5, 1, 3, 24]
sorted_arr = _.sortBy(arr)
console.log(arr)
console.log(sorted_arr)
```

## Object 정렬

```javascript
const users = [
    { name : "song", age : 21},
    { name : "jong", age : 25},
    { name : "kim", age : 13},
    { name : "lee", age : 44}
]
// 이름순 정렬
users.sort(function(a, b) {
    return a.name < b.name ? -1: (a.name > b.name ? 1: 0)
})

// 나이 내림 차순 정렬
users.sort(function(a, b) {
    return b.age - a.age
})
```

-------