# AsyncIO


# httpx

### 🌐 공식 사이트

**Homepage**: [https://www.python-httpx.org/](https://www.python-httpx.org/)

---

### 💡 소개

`httpx`는 파이썬에서 HTTP 요청을 보내기 위한 차세대 클라이언트입니다. 널리 사용되는 `requests` 라이브러리와 매우 유사한 API를 제공하여 기존 `requests` 사용자들도 쉽게 적응할 수 있습니다.

`httpx`의 가장 큰 특징은 **동기(synchronous)와 비동기(asynchronous) 통신을 모두 지원**한다는 점입니다. 이를 통해 일반적인 스크립트에서는 `requests`처럼 간단하게 사용하고, `asyncio`를 사용하는 고성능 비동기 애플리케이션에서는 논블로킹(non-blocking) I/O를 활용하여 여러 HTTP 요청을 효율적으로 동시에 처리할 수 있습니다.

**주요 특징:**

* `requests`와 호환되는 API
* 동기 및 비동기 요청 지원
* HTTP/1.1 및 HTTP/2 지원
* 표준 `requests` 기능 모두 포함 (세션, 쿠키, 타임아웃 등)

---

### 💻 설치

`pip`를 사용하여 간단하게 설치할 수 있습니다.

```bash
pip install httpx
```

HTTP/2를 지원하려면 추가 의존성을 함께 설치해야 합니다.

```bash
pip install httpx[http2]
```

---

### 🛠️ 사용법

`httpx`는 동기식과 비동기식 두 가지 방식으로 사용할 수 있습니다.

#### 1\. 동기(Synchronous) 사용법 (requests와 유사)

가장 기본적인 사용법이며, `requests` 라이브러리와 거의 동일합니다.

```python
import httpx

# GET 요청 보내기
response = httpx.get('https://www.example.org/')

# 응답 상태 코드 확인
print(f"Status Code: {response.status_code}")

# 응답 헤더 확인
# print(f"Headers: {response.headers}")

# 응답 내용(텍스트) 확인
print(f"Content: {response.text[:100]}...") # 내용이 길 수 있으므로 일부만 출력

# POST 요청 보내기
data = {'key': 'value'}
response_post = httpx.post('https://httpbin.org/post', data=data)

# POST 응답의 JSON 내용 확인
print(f"POST Response JSON: {response_post.json()}")
```

#### 2\. 비동기(Asynchronous) 사용법

`async`와 `await` 키워드를 사용하여 비동기적으로 HTTP 요청을 처리합니다. 여러 요청을 동시에 보낼 때 매우 효율적입니다.

```python
import httpx
import asyncio

async def main():
    # 비동기 클라이언트 생성
    async with httpx.AsyncClient() as client:
        # GET 요청 보내기 (await 키워드 사용)
        response = await client.get('https://www.example.org/')
    
        print(f"Status Code: {response.status_code}")
        print(f"Content: {response.text[:100]}...")
    
        # 여러 요청을 동시에 보내기
        tasks = [
            client.get('https://httpbin.org/get?id=1'),
            client.get('https://httpbin.org/get?id=2'),
            client.get('https://httpbin.org/get?id=3')
        ]
    
        # 모든 작업이 끝날 때까지 기다린 후 결과 수집
        responses = await asyncio.gather(*tasks)
    
        for i, resp in enumerate(responses):
            # 각 응답의 JSON에서 'args' 필드를 추출하여 출력
            print(f"Response {i+1} args: {resp.json()['args']}")


# 비동기 함수 실행
if __name__ == "__main__":
    asyncio.run(main())   # colab에서는 에러 발생

```

**실행 결과 예시:**

```
Status Code: 200
Content: <!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
...
Response 1 args: {'id': '1'}
Response 2 args: {'id': '2'}
Response 3 args: {'id': '3'}
```

# Event Loop

 **프로그램을 처음 시작할 때**는 `asyncio.run()`을 사용하고, **이미 실행 중인 비동기 함수 안에서 다른 비동기 함수를 부를 때**는 `await`를 사용합니다.

---

### 🎡 이벤트 루프(Event Loop)의 개념

이것을 이해하려면 **이벤트 루프**라는 개념을 알아야 합니다. `async` 코드는 스스로 실행되지 못하고, '이벤트 루프'라는 일종의 매니저가 어떤 작업을 언제 실행할지 스케줄링해주어야 합니다.

* `asyncio.run(coroutine)`: **이벤트 루프 매니저를 새로 고용해서 일을 시키는 명령**입니다. 매니저가 와서 주어진 일(`coroutine`)을 다 처리하고, 일이 끝나면 스스로 퇴근(루프 종료)합니다.
* `await coroutine`: **이미 일하고 있는 매니저에게 "이 일도 좀 처리해주세요"라고 요청하는 것**입니다.

---

### ✅ `asyncio.run()`을 사용하는 경우

**프로그램의 가장 바깥, 즉 최상위 진입점(entry point)에서 비동기 코드를 최초로 실행할 때** 사용합니다.

```python
import asyncio

# 비동기 함수 (코루틴)
async def say_hello():
    print("Hello...")
    await asyncio.sleep(1)
    print("...World!")

# main 함수도 비동기 함수로 만듭니다.
async def main():
    print("프로그램 시작")
    await say_hello() # 이미 실행 중인 main 안에서는 await를 사용
    print("프로그램 종료")

# 📜 프로그램의 시작점!
# 여기서 이벤트 루프 매니저를 고용해 main 함수를 실행시킵니다.
if __name__ == "__main__":
    asyncio.run(main())
```

---

### ✅ `await`를 사용하는 경우

**이미 이벤트 루프가 돌고 있는 `async def` 함수 내부에서, 다른 `async def` 함수(코루틴)를 호출할 때** 사용합니다.

위 예제의 `main` 함수를 보면, `say_hello()`를 호출할 때 `asyncio.run()`이 아닌 `await`를 썼습니다.

```python
async def main():
    print("프로그램 시작")
    # 🙋‍♂️ 이미 일하고 있는 매니저에게 say_hello() 실행을 요청!
    await say_hello()
    print("프로그램 종료")
```

만약 여기서 `await` 대신 `asyncio.run(say_hello())`를 호출하면, 이미 매니저가 일하고 있는데 새 매니저를 또 고용하려는 셈이라 다음과 같은 에러가 발생합니다.

> `RuntimeError: asyncio.run() cannot be called from a running event loop`

---

### 📌 핵심 요약

| 명령어                      | 언제 사용하나요?                                                     | 역할                                                                         |
| :-------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **`asyncio.run()`** | **프로그램의 최상위 시작점**에서 딱 한 번.                     | 이벤트 루프를**생성, 실행, 종료**하는 모든 과정을 담당.                |
| **`await`**         | **`async def` 함수 내부**에서 다른 `async` 함수를 부를 때. | 현재 실행 중인 이벤트 루프에 작업을**요청하고 결과가 올 때까지 대기**. |

Google Colab 및 Jupyter Notebook 환경에서는 사용자의 코드를 실행하기 위해 **기본적으로 이벤트 루프(event loop)가 이미 백그라운드에서 실행되고 있습니다.**

이것이 바로 Colab 셀에서 `asyncio.run()`을 사용하면 `RuntimeError`가 발생하는 이유입니다.

---

### 🤔 왜 이벤트 루프가 이미 동작중인가요?

Colab의 기반이 되는 IPython 커널(`ipykernel`)은 코드 실행, UI 업데이트 등 내부적인 여러 작업을 비동기적으로 처리하기 위해 `asyncio` 이벤트 루프를 사용합니다. 즉, 우리가 코드 셀을 실행하기 전부터 보이지 않는 '매니저'가 이미 일을 하고 있는 셈입니다.

`asyncio.run()` 함수는 **새로운 이벤트 루프를 생성해서 실행**하는 명령인데, 이미 일하고 있는 매니저(실행 중인 루프)가 있는데 또 다른 매니저를 고용하려고 하니 충돌이 발생하는 것입니다.

> **에러 메시지**: `RuntimeError: asyncio.run() cannot be called from a running event loop` (실행 중인 이벤트 루프에서는 asyncio.run()을 호출할 수 없습니다.)

| 환경                            | `async` 함수 실행 방법    | 이유                                                                     |
| :------------------------------ | :-------------------------- | :----------------------------------------------------------------------- |
| **일반 `.py` 스크립트** | **`asyncio.run()`** | 이벤트 루프가 없으므로 새로 생성해서 실행해야 함.                        |
| **Colab / Jupyter**       | **`await`**         | 이미 실행 중인 이벤트 루프가 있으므로, 거기에 작업을 추가하기만 하면 됨. |

#`async with httpx.AsyncClient() as client:`

**비동기 컨텍스트 매니저(Asynchronous Context Manager)** 라는 파이썬의 강력한 기능을 사용하며, **준비**, **사용**, **정리**의 3단계로 동작합니다.

가장 쉽게 비유하자면, **필요한 장비를 빌리고(준비), 다 쓴 뒤에 알아서 깨끗하게 반납하는(정리) 과정**을 자동화한 것입니다.

---

### 🚗 비유: 렌터카 빌리기

1. **`httpx.AsyncClient()`**: '비동기 통신이 가능한 렌터카'를 주문하는 것과 같습니다.
2. **`async with ... as client`**: 렌터카 회사에 가서 차를 빌리고(`__aenter__`), 다 쓴 후에 키를 반납하고 주차하는(`__aexit__`) 전 과정을 포함합니다.
3. **`client`**: 내가 빌린 바로 그 '렌터카'의 키(객체)입니다. 이 키가 있어야 차를 운전(`client.get()`)할 수 있습니다.

---

### ⚙️ 코드의 단계별 동작 과정

`async with httpx.AsyncClient() as client:` 라인을 만나면 파이썬은 내부적으로 다음과 같이 동작합니다.

#### 1. 진입 및 준비 (Setup) - `__aenter__`

- 먼저 `httpx.AsyncClient()` 객체가 생성됩니다. 이 객체는 HTTP 요청에 필요한 여러 기능을 담고 있는 '준비된 상자'와 같습니다.
- `async with` 구문은 생성된 `AsyncClient` 객체의 `__aenter__` 라는 특별한 메서드를 `await`와 함께 호출합니다.
- `AsyncClient`의 `__aenter__`는 **네트워크 연결을 효율적으로 재사용할 수 있도록 커넥션 풀(Connection Pool)을 준비**하는 등 HTTP 통신에 필요한 **사전 준비 작업**을 수행합니다.
- 준비가 완료되면 `__aenter__`는 통신에 사용할 수 있는 준비된 자기 자신(클라이언트 객체)을 반환합니다.

#### 2. 사용 (Usage) - `as client:`

- `__aenter__`가 반환한 준비된 클라이언트 객체가 `as` 뒤에 지정된 변수, 즉 `client`에 할당됩니다.
- 이제 `with` 블록 안에서 `client` 변수를 사용하여 `await client.get(...)`처럼 HTTP 요청을 보낼 수 있습니다.
- `AsyncClient`를 사용하면 여러 요청을 보낼 때마다 TCP 연결을 새로 맺고 끊는 비효율적인 과정을 피하고, **준비된 커넥션 풀의 연결을 재사용하여 성능을 크게 향상**시킬 수 있습니다.

#### 3. 퇴장 및 정리 (Cleanup) - `__aexit__`

- `with` 블록 안의 모든 코드가 실행을 마치거나, 중간에 오류가 발생하여 블록을 빠져나오게 되면, `async with`는 **자동으로** `AsyncClient` 객체의 `__aexit__` 라는 메서드를 `await`와 함께 호출합니다.
- `__aexit__`는 사용했던 **모든 네트워크 연결을 안전하게 닫고**, 사용했던 자원을 시스템에 반납하는 등 **마무리 정리 작업**을 수행합니다.
- 이 과정은 **코드가 정상적으로 끝나든, 에러로 중단되든 상관없이 항상 실행이 보장**됩니다. 따라서 리소스가 누수될 걱정 없이 안전하게 코드를 작성할 수 있습니다.

---

### 🤔 왜 이렇게 사용할까요?

- **🧹 자동 리소스 관리**: 개발자가 직접 연결을 열고 닫는 코드를 작성할 필요가 없습니다. `with` 블록이 끝나면 **자동으로 정리**해주므로 실수를 방지하고 코드가 매우 깔끔해집니다.
- **🚀 성능 향상**: `AsyncClient`는 **커넥션 풀링(Connection Pooling)** 을 통해 여러 요청 간에 네트워크 연결을 재사용합니다. 이는 매번 새로운 연결을 만드는 것보다 훨씬 빠르고 효율적입니다.
- **✨ 코드 가독성**: 클라이언트 객체가 사용되는 범위가 `with` 블록으로 명확하게 한정되어 코드의 의도를 파악하기 쉽습니다.

# `await asyncio.gather(*tasks)`

**여러 개의 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 기다린 후 그 결과들을 한 번에 모아서 반환**하는 역할을 합니다.

쉽게 비유하자면, **여러 명의 바리스타에게 동시에 커피 주문을 넣고(작업 실행), 주문한 커피가 모두 나올 때까지 기다렸다가(대기), 한 번에 쟁반에 받아오는(결과 수집)** 것과 같습니다.

---

### \#\# ⚙️ 역할 및 동작 과정

#### **1. 역할 (What it does)**

* **🚀 동시 실행**: `tasks` 리스트에 담긴 여러 개의 `call_chat_completion` 코루틴(API 요청 작업)들을 **순차적으로 하나씩 실행하는 것이 아니라, 거의 동시에 시작**시킵니다.
* **⏳ 동기화 및 대기**: `await` 키워드는 `gather`에 묶인 모든 작업들이 **'전부' 완료될 때까지** `main` 함수의 실행을 그 자리에서 멈추고 기다립니다. 하나의 작업이 먼저 끝나도 다른 작업들이 끝날 때까지 계속 대기합니다.
* **🎁 결과 수집**: 모든 작업이 성공적으로 완료되면, `asyncio.gather`는 각 작업의 반환값(`return data["choices"][0]["message"]["content"]`)을 **원래 `tasks` 리스트의 순서와 동일하게** 모아서 하나의 리스트로 만들어 `results` 변수에 할당합니다.

#### **2. 동작 과정 (How it works)**

1. **`*tasks` - 작업 목록 펼치기**

   * `tasks`는 `[<coroutine 1>, <coroutine 2>, <coroutine 3>]` 와 같은 리스트입니다.
   * 앞에 붙은 별표(`*`)는 이 리스트를 "펼쳐서" `gather` 함수에 각각의 인자로 전달하는 역할을 합니다.
   * 즉, `asyncio.gather(*tasks)`는 `asyncio.gather(<coroutine 1>, <coroutine 2>, <coroutine 3>)` 와 동일한 코드가 됩니다.
2. **`asyncio.gather(...)` - 동시 작업 예약**

   * `gather`는 펼쳐진 코루틴들을 `asyncio`의 이벤트 루프(작업 스케줄러)에 "이 작업들을 동시에 처리해주세요"라고 등록합니다.
   * 이벤트 루프는 즉시 3개의 `call_chat_completion` 함수를 실행하기 시작합니다. 이는 3개의 API 요청이 거의 동시에 Upstage 서버로 전송됨을 의미합니다.
3. **`await` - 모두 끝날 때까지 대기**

   * API 서버가 응답을 주는 데는 시간이 걸립니다 (I/O 대기).
   * `await`는 이 기다리는 시간 동안 프로그램을 멈추는 대신, 이벤트 루프가 다른 일을 할 수 있도록 제어권을 넘깁니다.
   * 이벤트 루프는 3개의 요청에 대한 응답이 오는 것을 지켜보다가, **가장 마지막 응답이 도착할 때까지** 기다립니다.
4. **`results = ...` - 결과 할당**

   * 3개의 요청에 대한 응답이 모두 도착하고 각 작업이 반환값을 준비하면, `gather`는 이 값들을 순서대로 모아 `['첫 번째 응답', '두 번째 응답', '세 번째 응답']` 형태의 리스트를 만듭니다.
   * 이 리스트가 최종적으로 `results` 변수에 저장되고, 멈춰있던 `main` 함수의 실행이 다음 라인부터 다시 시작됩니다.

---

### \#\# ✅ `gather`를 사용하지 않았을 경우와의 비교

만약 `asyncio.gather`를 사용하지 않고 `for` 루프 안에서 `await`를 사용했다면, 작업은 **순차적으로** 처리되어 훨씬 비효율적입니다.

```python
# ❌ 비효율적인 순차 실행
results = []
for task_coroutine in tasks:
    # 첫 번째 API 요청을 보내고 응답이 올 때까지 기다린 후,
    # 두 번째 요청을 보내고... 순서대로 실행됨
    result = await task_coroutine
    results.append(result)

# 총 소요 시간 ≈ (1번 작업 시간) + (2번 작업 시간) + (3번 작업 시간)
```

`asyncio.gather`를 사용하면 가장 오래 걸리는 작업 하나의 시간에 맞춰 모든 작업이 끝나므로, 전체 실행 시간을 획기적으로 단축할 수 있습니다.

```python
# ✅ 효율적인 동시 실행
results = await asyncio.gather(*tasks)

# 총 소요 시간 ≈ max(1번 작업 시간, 2번 작업 시간, 3번 작업 시간)
```
