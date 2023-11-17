# CORS

- [CORS(Cross-Orgin Resource Sharing)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
  
  - 기본적으로 동일 출처 정책 / SOP(Same-origin Policy)
  - XMLHttpRequest 는 SOP
  - 출처 = (scheme/protocol, host, port)

- 추가 HTTP header를 사용해서, 다른 출처의 자원에 접근할 수 있도록 브라우저에 알려주는 방법

- 다른 출처의 자원을 가져오려면, 그 출처에서 **올바른 CORS header를 포함한 응답을 반환** 해야 한다.

<img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png" alt="cors" style="zoom: 70%;" />

> 그림 출처 https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png

## why CORS?

- 브라우저와 웹앱  보호
- Server 자원 관리

## 교차 출처 허용하기

- CORS는 어떤 호스트에서 자원에 접근할 수 있는지 서버에서 지정
  - 응답  + CORS 헤더
  - Access-Control-Allow-Origin
  - Access-Control-Allow-Credentials
  - Access-Control-Allow-Headers
  - Access-Control-Allow-Methods

## Django에 CORS 설정

### cors 패키지 설치

- [참고_사이트](:https://github.com/adamchainz/django-cors-headers) 

```bash
pip install django-cors-headers
```

### APP 등록

```python
# settings.py
INSTALLED_APPS = [
    # ...,
    "corsheaders",
    # ...,
]
```

### 미들웨어 클래스 추가

- **`CommonMiddleware` 또는 `WhiteNoiseMiddleware` 같은 응답(response) 을 생성할 수 있는 미들웨어의 앞쪽에 위치**

```python
# settings.py
MIDDLEWARE = [
    # ...,

    'corsheaders.middleware.CorsMiddleware',
    # 아래 미들웨어 보다 앞쪽에
    'django.middleware.common.CommonMiddleware',

    #...,
]
```

### 미들웨어 행동에 대한 설정

- 다음 중 최소 하나를 설정
  
  
#### - `CORS_ALLOWED_ORIGINS: Sequenc[str]`
  
  ```python
  # settings.py
  CORS_ALLOWED_ORIGINS = [
      'https://example.com',
      'https://sub.example.com',
      'http://localhost:8080',
      'http://127.0.0.1:9000',
  ]
  ```

#### - `CORS_ALLOWED_ORIGIN_REGEXES: Sequenc[str |Pattern[str]]`
  
  ```python
  CORS_ALLOWED_ORIGIN_REGEXES = [
      r'^https://\w+\.example\.com$',
  ]
  ```

#### - `CORS_ALLOW_ALL_ORIGINS: bool`
  
  ```python
  CORS_ALLOW_ALL_ORIGINS = True
  ```