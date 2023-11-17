# Javscript Module

- 초기 javascript 는 독립적인 작업을 수행하고, 필요시 웹페이지에서 약간의 상호 작용을 제공하므로 큰 스크립트가 필요하지 않음.

- 이후, 많은 브라우저에서 동작하고, 완전한 애플리케이션으로 실행 할 수 있고, 다른 컨텍스트(예> Node.js)에서 사용됨.

- 최근, 필요에 따라, 자바스크립트 코드를 가져와서 사용하기 위해, **별도의 모듈로 분할하기 위한 메커니즘**이 필요하게 됨.

- 최신 브라우저들은 기본적으로 **모듈 기능**을 지원함.

## 모듈 사용법 예제

### 내보내기

- 가장 쉬운 방법은 모듈 밖으로 내보내려는 항목 앞에 **export** 를 작성
  
  - function, var, let, const, class 를 내 보낼 수 있지만, 최상위 항목만 가능
  
  ```javascript
  // mymodule.js
  export const name = 'module_test'
  
  export function printHello(name='anonymous') {
    console.log(`안녕하세요? ${name}님!`)
  }
  ```

- 여러 항목을 내보내는 편리한 방법은 모듈 파일 끝에 하나의 export 문을 쓰고, 내보내고 싶은 기능들을 쉼표로 구분해서 나열하고, 중괄호로 묶음.
  
  ```javascript
  export { name, printHello }
  ```

### 불러오기

- 모듈에서 내보낸 기능을 사용하기위해서, **import** 로 가져와야 된다.

```javascript
import { name, printHello } from './mymodule.js'
```

- **from** 뒤에 모듈의 파일 경로를 작성
  - 일부 모듈 시스템에서는 파일 확장명 생략 가능(예> `/modules/myscript.js`)하나, 네이티브 자바스크립트에서는 작동하지 않으며, 앞에 슬래시를포함해야 한다.

### Node.JS 에서 ES 모듈 사용

- Node.js 13.2 이전에는 CommonJS를 모듈 시스템으로 적용
  - 자바스크립트 모듈을 불러오기 위한 `import` 키워드에 의한 에러 발생
  - `import`,  Babel과 같은 트랜스파일러(transfiler) 사용


::: warning 주의사항
 - 로컬 테스트에서의 주의 사항 — HTML파일을 로컬(예를들어 `file://` URL)에서 로드하려고 하면, 자바스크립트 모듈 보안 요구 사항으로 인해 **CORS**오류 발생. 서버를 통한 테스트 수행.
- 표준 스크립트와 달리 모듈 내부에서 정의된 스크립트 섹션과는 다르게 동작함. 이는 모듈이 자동적으로 [strict mode](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)를 적용.
- 모듈 스크립트를 불러올 때 `defer` 속성([`attributes`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/script#attributes))를 사용할 필요 없음. 모듈은 자동으로 `defer` 적용.
- 마지막으로 모듈 기능을 단일 스크립트의 스코프로 가져왔음을 분명히 해야 한다. — 전역 스코프에서는 사용할 수 없다. 
:::

### module object 생성하기

```javascript
import * as Module from './modules/module.js';
```

- 사용하기

```javascript
Module.function1()
Module.function2()
//. . .
```

---------

### 확장자 *`.mjs`*

- Node.js 환경에서 모듈을 사용하려면 확장자를 *`.mjs`* 로 사용해야 한다.

- **hello.mjs** : `sayHell()` 함수 정의하고 내보내기

```javascript
// hello.mjs
const sayHello = function (name) {
    return `Hello ${name}!!!`
}

export { sayHello, }
```

- **main.mjs** : `hello.mjs` 모듈 사용

```javascript
// main.mjs
import {sayHello} from './hello.mjs'


console.log(sayHello('Hong'))
```

-----------