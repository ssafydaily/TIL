# 배열


## 배열의 선언

- 배열은 동일 자료형인 값들의 집합이다.
- **인덱스** 를 통해 각 요소에 접근한다.
- 배열이 생성될 때 크기가 고정된다.
- 배열의 크기: `array.length` 

```java
// 자료형[] 변수이름;
int[] intArr;
String[] strArr;

// 권장하지 않는 방식
// 자료형 변수이름[];
int intOther[];
```

## 배열의 생성

```java
// 배열의 크기를 지정 - 초기값은 기본값(0에 해당하는)으로 저장
int[] arr = new int[10];

// 값을 지정함으로써 크기도 정해짐
int[] arr = {1, 2, 3, 4}    // {}를 통한 생성/할당은 선언과 동시에 가능함

int[] arr = new int[] {1, 2, 3, 4}; 
```
- 다음은 자료형의 배열을 생성할 때 사용되는 기본값들을 보여준다.

| 자료형    | 기본값        |
|-----------|---------------|
| *boolean* | `false`       |
| *byte*    | `0`           |
| *short*   | `0`           |
| *int*     | `0`           |
| *long*    | `0L`          |
| *float*   | `0.0f`        |
| *double*  | `0.0`         |
| *char*    | `'\u0000'`    |
| *Object*  | `null`        |

## 배열 복사

자바에서 배열을 복사하는 방법은 복사하려는 배열의 크기와 용도에 따라 적절하게 선택

1. **`System.arraycopy` 사용**
2. **`Arrays.copyOf` 및 `Arrays.copyOfRange` 사용**
3. **`clone` 메서드 사용**
4. **수동 복사 (for 루프)**


### 1. `System.arraycopy` 사용

- `System.arraycopy` 메서드는 가장 효율적인 배열 복사 방법
- 원본 배열의 특정 범위를 다른 배열로 복사할 수 있음

```java
public class ArrayCopyExample {
    public static void main(String[] args) {
        int[] sourceArray = {1, 2, 3, 4, 5};
        int[] destinationArray = new int[sourceArray.length];

        System.arraycopy(sourceArray, 0, destinationArray, 0, sourceArray.length);

        // 결과 출력
        for (int num : destinationArray) {
            System.out.print(num + " ");
        }
    }
}
```

### 2. `Arrays.copyOf` 및 `Arrays.copyOfRange` 사용

- `Arrays` 클래스의 `copyOf` 및 `copyOfRange` 메서드를 사용

```java
import java.util.Arrays;

public class ArrayCopyExample {
    public static void main(String[] args) {
        int[] sourceArray = {1, 2, 3, 4, 5};

        // 전체 배열 복사
        int[] copiedArray = Arrays.copyOf(sourceArray, sourceArray.length);

        // 배열의 일부분 복사
        int[] rangeCopiedArray = Arrays.copyOfRange(sourceArray, 1, 4);

        // 결과 출력
        for (int num : copiedArray) {
            System.out.print(num + " ");
        }
        System.out.println();

        for (int num : rangeCopiedArray) {
            System.out.print(num + " ");
        }
    }
}
```

### 3. `clone` 메서드 사용

- 배열의 `clone` 메서드를 사용하여 배열을 복사
- 이 방법은 배열의 **얕은 복사**를 수행합니다.

```java
public class ArrayCopyExample {
    public static void main(String[] args) {
        int[] sourceArray = {1, 2, 3, 4, 5};

        // 배열 복사
        int[] clonedArray = sourceArray.clone();

        // 결과 출력
        for (int num : clonedArray) {
            System.out.print(num + " ");
        }
    }
}
```

### 4. 수동 복사 (for 루프)

- 가장 기본적인 방법으로, for 루프를 사용하여 배열의 각 요소를 하나씩 복사

```java
public class ArrayCopyExample {
    public static void main(String[] args) {
        int[] sourceArray = {1, 2, 3, 4, 5};
        int[] destinationArray = new int[sourceArray.length];

        for (int i = 0; i < sourceArray.length; i++) {
            destinationArray[i] = sourceArray[i];
        }

        // 결과 출력
        for (int num : destinationArray) {
            System.out.print(num + " ");
        }
    }
}
```

### 각 방법의 장단점

1. **`System.arraycopy`**:
   - 장점: 매우 빠르고 효율적.
   - 단점: 사용법이 약간 복잡할 수 있음.

2. **`Arrays.copyOf` 및 `Arrays.copyOfRange`**:
   - 장점: 사용법이 간편하고 가독성이 좋음.
   - 단점: 내부적으로 `System.arraycopy`를 사용하므로 유사한 성능을 가짐.

3. **`clone`**:
   - 장점: 간단하고 빠름.
   - 단점: 얕은 복사만 가능하여, 객체 배열의 경우 원본 객체와 참조를 공유함.

4. **수동 복사 (for 루프)**:
   - 장점: 모든 경우에 적용 가능.
   - 단점: 큰 배열의 경우 비효율적일 수 있음.

:::tip
> 성능과 가독성을 고려하여 `System.arraycopy`나 `Arrays.copyOf`를 많이 사용
:::