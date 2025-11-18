JavaScript에서 객체나 배열을 복사할 때 **메모리 참조**를 어떻게 다루느냐에 따라 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)로 나뉩니다.

이해를 돕기 위해, JavaScript의 데이터 타입은 크게 두 가지로 나뉩니다.

* **원시 타입 (Primitives):** `string`, `number`, `boolean`, `null`, `undefined`, `symbol`. 이들은 값을 직접 저장합니다.
* **참조 타입 (Reference Types):** `object`, `array`, `function`. 이들은 값이 저장된 메모리 주소(참조)를 저장합니다.

복사에서 문제가 되는 것은 바로 이 **참조 타입**입니다.

---

## 얕은 복사 (Shallow Copy)

얕은 복사는 객체의 **최상위(top-level) 속성만** 복사합니다. 만약 속성 값이 원시 타입이면 값을 그대로 복사하지만, 참조 타입(다른 객체나 배열)이면 **메모리 주소(참조)만** 복사합니다.

**결과:** 원본 객체와 복사본 객체는 최상위 수준에서는 분리되지만, 내부에 중첩된 객체가 있다면 **이 중첩된 객체는 서로 공유**하게 됩니다.

### 얕은 복사 예시 (Spread 연산자)

가장 흔한 얕은 복사 방법은 전개 연산자(`...`)나 `Object.assign()`을 사용하는 것입니다.

**JavaScript**

```
// 원본 객체
const original = {
  name: "Alice",
  level: 10,
  items: {
    weapon: "Sword",
    potion: 5
  }
};

// 1. 얕은 복사 (Spread 연산자)
const shallowCopy = { ...original };

// 2. 복사본의 최상위 속성 변경
shallowCopy.name = "Bob"; // 원본에 영향 없음

// 3. 복사본의 중첩 객체 속성 변경
shallowCopy.items.weapon = "Axe";

// 4. 결과 확인
console.log("--- 얕은 복사 결과 ---");
console.log("원본:", original);
console.log("복사본:", shallowCopy);

/*
결과:
--- 얕은 복사 결과 ---
원본: {
  name: "Alice",
  level: 10,
  items: { weapon: "Axe", potion: 5 } // <-- 원본의 중첩 객체가 변경됨
}
복사본: {
  name: "Bob",
  level: 10,
  items: { weapon: "Axe", potion: 5 }
}
*/
```

**분석:** `shallowCopy.name`을 변경해도 `original.name`은 바뀌지 않습니다. 하지만 `shallowCopy.items.weapon`을 변경하자 `original.items.weapon`도 함께 변경되었습니다. 이는 `original.items`와 `shallowCopy.items`가 **동일한 메모리 주소를 참조**하고 있기 때문입니다.

---

## 깊은 복사 (Deep Copy)

깊은 복사는 객체 내부의 **모든 속성(중첩된 객체와 배열 포함)**을 재귀적으로 복사하여 완전히 새로운 객체를 만듭니다.

**결과:** 원본 객체와 복사본 객체는 **어떤 메모리 주소도 공유하지 않는** 완전히 독립적인 존재가 됩니다.

### 깊은 복사 예시 (structuredClone)

ES2022 (Modern JavaScript)부터는 `structuredClone()`이라는 내장 함수를 사용하는 것이 가장 표준적이고 강력한 방법입니다.

**JavaScript**

```
const original = {
  name: "Alice",
  level: 10,
  items: {
    weapon: "Sword",
    potion: 5
  },
  lastLogin: new Date() // Date 객체도 잘 복사됨
};

// 1. 깊은 복사 (structuredClone)
const deepCopy = structuredClone(original);

// 2. 복사본의 최상위 속성 변경
deepCopy.name = "Bob";

// 3. 복사본의 중첩 객체 속성 변경
deepCopy.items.weapon = "Axe";

// 4. 결과 확인
console.log("--- 깊은 복사 결과 ---");
console.log("원본:", original);
console.log("복사본:", deepCopy);

/*
결과:
--- 깊은 복사 결과 ---
원본: {
  name: "Alice",
  level: 10,
  items: { weapon: "Sword", potion: 5 }, // <-- 원본이 변경되지 않음
  lastLogin: ... (Date 객체)
}
복사본: {
  name: "Bob",
  level: 10,
  items: { weapon: "Axe", potion: 5 },
  lastLogin: ... (Date 객체)
}
*/
```

**분석:** `deepCopy.items.weapon`을 변경해도 `original.items.weapon`은 전혀 영향을 받지 않았습니다. `structuredClone()`이 `items` 객체 자체를 새로 복사했기 때문입니다.

### 💡 다른 깊은 복사 방법 (한계점)

`structuredClone`이 나오기 전에는 주로 `JSON` 트릭을 사용했습니다.

**JavaScript**

```
// JSON 트릭 (한계가 있음)
const jsonDeepCopy = JSON.parse(JSON.stringify(original));
```

> **주의:** 이 방법은 간단하지만 치명적인 단점이 있습니다.
>
> * `Date` 객체는 문자열로 변환됩니다.
> * `Map`, `Set` 같은 객체는 빈 객체 `{}`로 변환됩니다.
> * `function`, `undefined`, `Symbol` 속성은 무시되거나 `null`로 변환됩니다.
>
> `structuredClone()`은 함수(function)를 제외한 대부분의 타입(Date, Map, Set, RegExp 등)을 올바르게 처리합니다.

---

## 요약 비교

| **특징**      | **얕은 복사 (Shallow Copy)**       | **깊은 복사 (Deep Copy)**                 |
| ------------------- | ---------------------------------------- | ----------------------------------------------- |
| **복사 대상** | 최상위 속성만 복사                       | 모든 속성 (중첩 포함) 재귀적 복사               |
| **중첩 객체** | 원본과**메모리 주소 공유**         | 원본과**완전히 분리**(새 메모리)          |
| **원본 영향** | 중첩 객체 수정 시**원본도 변경됨** | 복사본 수정 시**원본에 영향 없음**        |
| **주요 방법** | `...`(Spread),`Object.assign()`      | `structuredClone()`, (Lodash `_.cloneDeep`) |
| **성능**      | 빠름 (참조만 복사)                       | 느림 (모든 것을 새로 생성)                      |

대부분의 경우 얕은 복사로 충분하지만, 복사본의 중첩 객체를 수정할 때 원본이 변경되면 안 되는 상황에서는 반드시 깊은 복사를 사용해야 합니다.
