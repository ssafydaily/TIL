# npm & packages



## [npm](https://docs.npmjs.com/)

>  3 component
>
> - `웹사이트`: 패키지 검색, 프로파일 설정, 등
> - `CLI`: 터미널에서 `npm`과 상호작용하기 위한 도구
> - `registry`: Javasript 소프트웨어 및 메타 정보를 위한 데이터베이스

- 협업을 위한 패키지를 공유는 조직(organization)을 생성해서 사용



### Node.js 와 npm 설치하기

- 최신 버전 npm 설치하기

```bash
$ npm install -g npm
```

- `nvm(node version manager)` 을 통한 Node.js 와 npm 설치 및 관리를 권장하고 있음

- 버전 체크

```bash
$ node -v
$ npm -v
```

--------

## packages & Modules

- `npm 레지스트리`는 패키지와 노드 모듈을 포함한다. 차이점과 이들이 어떻게 상호작용하는지 이해보자.

### 패키지(package)

- **`package.json`**파일에 의해 표현되는 파일이나 디렉토리
- 하나의 `패키지`는 반드시 하나의 `package.json` 파일을 포함해야 한다.
  - npm 레지스트리에 게시 가능함
- 패키지는 사용자 또는 조직에 대해 범위가 없거나 있을 있다.
- 범위를 가지는 `scoped package`는 `private` 하거나 `public` 할 수 잇다.



#### `패키지 형식`

> 다음 형식 중에 하나
>
> a) `package.json`파일로 표현되는 프로그램을 포함하는 폴더
>
> b) `a`를 포함하는 압축 파일(gzipped)
>
> c) `b`에 대한 URL
>
> d) `c`를 가지는 레지스트리에 게시된 경우  `<name>@version`
>
> e) `d`를 가리키는 `<name>@<tag>`
>
> f) `e` 를 만족하는 최신 태그를 가지는 `<name>`
>
> g) 클론하는 경우 결과적으로 `a`가 되는  `git URL`

#### `npm pacakge git URL 형식`

- `git://github.com/user/project.git#commit-ish`
- `git+ssh://user@hostname:project.git#commit-ish`
- `git+http://user@hostname/project/blah.git#commit-ish`
- `git+https://user@hostname/project/blah.git#commit-ish`



### 모듈(modules)

- **Node.js `require()`** 함수에 의해 로드 가능한  `node_module` 디렉토리에 포함된 파일 또는 디렉토리
- 모듈이 `require()`에 로드 가능하려면, 반드시 다음 중 한가지여야 한다.
  - `"main"` 필드를 포함하는 `pacakge.json`이 있는 폴더
  - `Javascript file`
- 모듈은 `package.json` 파일이 꼭 있을 필요 없다. 

```javascript
// req 변수는 request 모듈을 참조한다.

var req = require('request')
```



### Scope

- npm 버전 2 이상에서 범위(scope) 사용
- 같은 이름의 패키지에 대한 충돌을 피하기 위한 이름 공간 제공
- 범위를 가지는 패키지는 범위 이름이 패키지 앞에 명시된다.
- 범위 이름은 `@`와 `/` 사이에 위치한다.

```json
// npm scope

@npm/package-name

// npmcorp scope

@npmcorp/package-name
```

#### scope & package visibility

- **범위가 없는** 패키지는 항상 **퍼블릭**하다.
  - 패키지 이름으로 참조 가능하다.
- **프라이빗 패키지**는 항상 범위를 가진다.
  - 사용자 또는 조직 이름으로 참조
  - `@username/package-name`
  - `@org-name/package-name`

-------

### Getting packages locally

#### 범위없는 패키지 설치

```bash
$ npm install <package_name>
```

- 위이 명령은 현재 디렉토리에 `node_module` 디렉토리를 생성하고 여기에 패키지를 다운로드한다.

> NOTE:
>
> - `package.json`파일이 로컬 디렉토리에 없으면, 최신 버전을 설치
> - 그렇지 않으면, 명시된  `semantic version rule` 을 만족하는 최신 버전을 설치

#### 범위를 가지는 퍼블릭 패키지

```bash
$ npm install @scope/package-name
```

#### install globally

```bash
$ npm install -g <package_name>
```

### Uinstalling Local pacakge

- 범위 없는 패키지

```bash
$ npm uninstall <package_name>
$ npm uninstall <@scope/package_name>     // scoped package
```

- `package.json`의존성에서 로컬 패키지 삭제



--------

## Package.json 파일

- `package.json` 파일은 당신의 프로젝트가 의존하는 패키지들의 목록
- 프로젝트가 사용하는 패키지의 특정 버전을 기술
- 재빌드를 위해 개발자들과 공유

> 필드

- `"name"` 과 `"version"` 필드 반드시 포함
  - name 은 패키지의 이름이고, 소문자(하이픈, 언더스코어 포함가능)들로 구성된 하나의 단어
  - version 은 `x.x.x`의 형태 

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0"
}
```

- `"author"`필드 포함 가능

```
Your Name <email@example.com> (http://example.com)
```

> 새로운 package.json 파일 생성
>
> 1. 패키지의 root 디렉토리로 이동한다.
>
> 2. `num init` 실행
>
>    1. 기본 생성을 하려면 `npm init --yes`
>
>    ```json
>    {
>      "name": "my_package",
>      "description": "",
>      "version": "1.0.0",
>      "scripts": {
>        "test": "echo \"Error: no test specified\" && exit 1"
>      },
>      "repository": {
>        "type": "git",
>        "url": "https://github.com/monatheoctocat/my_package.git"
>      },
>      "keywords": [],
>      "author": "",
>      "license": "ISC",
>      "bugs": {
>        "url": "https://github.com/monatheoctocat/my_package/issues"
>      },
>      "homepage": "https://github.com/monatheoctocat/my_package"
>    }
>    ```
>
>    
>
> 3. 질문에 답을 한다.

### package-lock.json

- `package-lock.json` 파일은 `node_module` 트리 혹은 `package.json` 이 수정되면 자등으로 생성된다.

- 의존성 트리에 대한 단일 표현 제공

- . . .

- `package-lock.json` 은 게시 되지 않는다. 

- `npm V7` 부터 히든 파일(`node_modules/package-lock.json` )이 존재

  - 전체 `node_modules`폴더를 반복해서 읽는 작업을 피한다.
  - `node_modules` 계층 관계에서 참조하는 모든 패키지들을 포함

  



------



## CLI Command

### npm-install

- 패키지(의존성을 가지는 패키지 포함)를 설치하는 명령
- `package-lock` , `npm shrikwrap` 파일, `yarn-lock` 파일, 또는 그외 설치 의존성이 있을 경우 우선순위
  - `npm-shrinkwrap.json`
  - `package-lock.json`
  - `yarn.lock`

- 패키지 설치시 의존성을 가지는 패키지들의 최신 버전이 설치된다.

```json
{
  "name": "A",
  "version": "0.1.0",
  "dependencies": {
    "B": "<0.1.0"
  }
}
{
  "name": "B",
  "version": "0.0.1",
  "dependencies": {
    "C": "<0.1.0"
  }
}
{
  "name": "C,
  "version": "0.0.1"
}
```

- `B@0.0.2`가 새로이 배포되었다면

```
A@0.1.0
`-- B@0.0.2
    `-- C@0.0.1
```

- 특정 버전으로 설치를 원하는 경우 `npm shrikwrap` 으로 `npm-shrikwrap.json`파일 생성
- `package-lock.json`파일을 게시가능한  `npm-shrikwrap.json` 으로 재구성

```json
{
  "name": "A",
  "version": "0.1.0",
  "dependencies": {
    "B": {
      "version": "0.0.1",
      "dependencies": {
        "C": {
          "version": "0.1.0"
        }
      }
    }
  }
}
```





---------



## 실습 관련 패키지

### lodash

```bash
$ npm i lodash
```



### axios

```bash
$ npm i axios
```



### vuex-persistedstate

- https://www.npmjs.com/package/vuex-persistedstate
- install

```bash
$ npm install --save vuex-persistedstate
```



### django-cors-headers

- https://github.com/adamchainz/django-cors-headers
- install package

```bash
python -m pip install django-cors-headers
```

- install app

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...,
]
```



- Example

```python
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:8080",
    "http://127.0.0.1:9000"
]
```








