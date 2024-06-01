# 제어문

## **lable** 을 이용한 `break` 활용

```java
out: for (int i = 0; i < 5; i++) {
			for (int j = 0; j < 5; j++) {
				if(i == 3 || j == 2)
					break out;    // out 라벨이 붙은 for문을 벗어남.
				System.out.println(String.format("%d %d", i, j));
				
			}
		}
```

## for문으로 배열 순회

- 전통적인 방식
```java
int[] numbers = {1, 2, 3, 4, 5};

// 인덱스로 순회하기
for (int i = 0; i < numbers.length; i++) {
    System.out.println("인덱스:" + i + ": " + numbers[i]);
}
```

- 향상된 방식
```java
int[] numbers = {1, 2, 3, 4, 5};

// 인덱스 없이 순회하기
for (int number : numbers) {
    System.out.println("요소: " + number);
}
```

### 향상된 for 루프 장점
- **가독성** : 코드가 더 간결하고 읽기 쉬워지고, 배열이나 컬렉션의 요소를 순회하는 목적이 명확히 드러남

- **오류 감소** : 인덱스를 직접 조작하지 않으므로 인덱스 관련 오류가 감소함

- **편의성** : 인덱스를 사용하지 않고도 배열이나 컬렉션의 각 요소에 쉽게 접근할 수 있음. 특히 배열이 아닌 다른 컬렉션(`List`, `Set` 등)을 순회할 때 유용

- **타입 안정성** : 컬렉션의 요소 타입을 명확하게 지정
```java
List<String> strings = Arrays.asList("a", "b", "c");
for (String str : strings) {
    System.out.println(str); // str은 항상 String 타입
}
```

## 향상된 for 루프의 단점
- 순회하면서 특정 요소를 제거 또는 수정할 수 없음
  - 전통적인 for 루프나 Iterator를 사용
- 인덱스를 사용할 수 없음

