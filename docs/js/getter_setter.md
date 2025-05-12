# Computed & Watch

## Javascript 접근자

객체의 프로퍼티는 *데이터 프로퍼티(data property)* 와 *접근자 프로퍼티(accessor property)* 의 두 종류로 나뉩니다.

- *데이터 프로퍼티(data property)* : 객체의 프로퍼티는 데이터 프로퍼티
- *접근자 프로퍼티(accessor property)* : 본질은 함수이고, 값을 획득(get)하고 설정(set)하는 역할을 담당 
  - 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보입니다.

#### getter 와 setter

- 접근자 프로퍼티는 getter와 setter 메소드로 표현
- getter와 setter 메소드는 `get` ,`set` 으로 표현

```javascript
et obj = {
  get propName() {
    // getter, obj.propName을 실행할 때 실행되는 코드
  },

  set propName(value) {
    // setter, obj.propName = value를 실행할 때 실행되는 코드
  }
};
//----------------------------------------------
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
```

- getter 메서드만 가지고 있기 때문에 `user.fullName=`을 사용해 값을 할당하려고 하면 에러가 발생

- getter와 setter를 ‘실제’ 프로퍼티 값을 감싸는 래퍼(wrapper)처럼 사용하면, 프로퍼티 값을 원하는 대로 통제할 수 있다.

---