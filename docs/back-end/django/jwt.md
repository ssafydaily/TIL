# JWT-Vue-Django

## Vue <-> Django 실습

[TOC]

-----------

## django-cors-headers 설정

- install package

```bash
python -m pip install django-cors-headers
```

- install app - setings.py

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',  # 아래보다 위에 있어야 한다.
    'django.middleware.common.CommonMiddleware',
    ...,
]
```

- Example - settings.py

```python
# 모든 origin 허용
# CORS_ALLOWED_ORIGINS = True 

# 특정 origin
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:8080",
    "http://127.0.0.1:9000"
]
```

----------

## Authentication & Authorization

- HTTP 응답  
  - 인증 실패 : 401 Unahorized 
  - 권한 위반 : 403 Forbidden

- 인증 이후에 권한이 부여된다.
- 인증 방식은 session, token, 제 3자를 사용하는 방법등

## Token-based

- JWT (JSON Web Token)
- JSON 포맷을 활용하여 요소간 안전하게 정보를 교환하는 표준 포맷
- 암호화 알고리즘에 의한 디지털 서명이 있어서 자체로 검증가능하고 신뢰할 수 있다.
- Session에 비해 상대적으로 HTML, HTTP 환경에서 사용하기 용이하다.
  - Session은 Server에서 저장/관리
  - JWT는 client-side에 저장

- JWT = Header + Payload + Signature

--------------

## 사용자 가입 작성

### User -- Todo의  1 : N 관계를 모델에 반영

- todos/models.py

```python
from django.conf import settings

class Todo(models.Model):
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, 
      on_delete=models.CASCADE, 
      related_name='todos'
      )
    # ... 
```

- db migrate 하기

### User serialization

- serializers.py 

```python
from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # write_only => 직렬화는 하지만 응답에는 포함시키지 않음.
    password = serializers.CharField(write_only=True)

    class Meta:
      model = User
      fields = ('username', 'password')
```

- views.py / signup()

```python
from .serializers import UserSerializer


@api_view(['POST'])
def signup(request):
    #1-1. Client에서 온 데이터를 받아서
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')

    #1-2. 패스워드 일치 여부 체크
    if password != password_confirmation:
        return Response(
            {'error': '비밀번호가 일치하지 않습니다.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    #2. UserSerializer를 통해 데이터 직렬화
    serializer = UserSerializer(data=request.data)

    #3. validation 작업 진행 -> password도 같이 직렬화 진행
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        #4. 비밀번호 해싱 후 
        user.set_password(request.data.get('password'))
        user.save()
    # password는 직렬화 과정에는 포함 되지만 → 표현(response)할 때는 나타나지 않는다.
    return Response(serializer.data, status=status.HTTP_201_CREATED)
```

--------

### client

- Signup.vue 수정

```python
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  methods: {
    signup: function (credentials) {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials,
      })
      .then((res)=> {
        console.log(res)
      })
      .catch((err)=> {
        console.log(err)
      })
    }
  }
}
```

## JWT 사용

- [Django REST framework JWT](https://jpadilla.github.io/django-rest-framework-jwt/)

### 사전 작업

- install

```bash
$ pip install djangorestframework-jwt
```

- settings.py

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
```

- urls.py

```python
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
#...

urlpatterns = [
    '',
    # ...

    path('api-token-auth/', obtain_jwt_token),
    # additional
    path('api-token-refresh/', refresh_jwt_token),
    path('api-token-verify/', verify_jwt_token),
]
```

- 추가 설정 - 기본 default / 공식 문서 작성

```python
import datetime 
# . . .
# . . .
JWT_AUTH = {
    # token 유효기간   
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
}
```

- **postman** 으로 확인해본다.
  
  - http://127.0.0.1:8000/accounts/api-token-auth/
  - body의 form-data에서 username, password 입력
  - 토큰이 발급된것을 확인

- jwt.io 의 **Debug** 에서 
  
  - token 과 django의 secret key를 입력해서 PAYLOADA와 **Signature Verified** 확인

- **주의 > token의 유효기간을 의도적으로 만료시킬 순 없다.** 

------

### Login.vue

```html
<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="credentials.password">
    </div>    
    <button @click="login()">로그인</button>
  </div>
</template>
```

```html
<script>
import axios from 'axios'
// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>
```

- 토큰 생성된 것을 확인

-------

### Login.vue에서 생성된 token 처리

- `local storage` 에 *token* 을 저장하고, TodoList 로 이동

```javascript
login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
      .then((res)=>{
        console.log(res)
        localStorage.setItem('jwt', res.data.token)
        this.$router.push({name: 'TodoList'})
      })
```

------

### Logout

- App.vue

```html
<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,    // 로그인 여부
    }
  },
  methods: {

  },
  created: function () {  // 최초, 토큰이 있는지 없는지를 보고 확인한다.
    const token = localStorage.getItem('jwt')
    if(token){
      this.login = true
    }
  }
}
</script>
```

```html
<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {

  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if(token){
      this.login = true
    }
  }
}
</script>
```

- Login.vue --> App.vue 로 알려주기
  - event 전달

```javascript
      .then((res)=>{
        console.log(res)          
        localStorage.setItem('jwt', res.data.token)
        #=============================================
        # Emit Event
        this.$emit('login')
        #=============================================
        this.$router.push({name: 'TodoList'})
        })
```

- App.vue 에서 이벤트 처리
  - @click.native <-- 원래의 고유한 이벤트를 처리하기 위해서 **native** 사용

```html
     <router-link @click.native="logout" to="">Logout</router-link> |

...
<router-view @login="isLogin=true"/>

...

logout: function() {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$route.pushh({name: 'Login'})
    }
```

- Vuex 처리하는 방법도 작성해본다.

------

### 인증된 사용자만 Todo를 사용하기

- Server에서 todos/views.py 에서 필요한 모듈 import

```python
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
```

- 함수에 `decorator` 적용하기 

```python
@api_view(['GET', 'POST'])
# JWT 을 활용한 인증시 JWT 자체를 검증한 인증 여부와 상관 없이 JWT가 유효한지 파악
@authentication_classes([JSONWebTokenAuthentication])
# 인증이 되지 않은 상태로 요청이 오면 "자격 인증 데이터"가 제공 않았습니다. 같은 메시지를 응답함.
@permission_classes([IsAuthenticated])
def todo_list_create(request):
    if request.method == 'GET':
        # todos = Todo.objects.all()
        # 로그인한 user의 todo
        serializer = TodoSerializer(request.user.todos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)            # user 정보가 필요함.
            return Response(serializer.data, status=status.HTTP_201_CREATED)
```

```python
@api_view(['PUT', 'DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def todo_update_delete(request, todo_pk):
    todo = get_object_or_404(Todo, pk=todo_pk)

    # 1. 해당 todo의 유저가 아닌 경우 todo를 수정하거나 삭제하지 못하게 설정
    if not request.user.todos.filter(pk=todo_pk).exists():
      return Response({'detail': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)
```

- postman Headers에서 key=Authorization,  value =JWT '{token}' 으로 확인

- TodoList.vue와 CreteTodo.vue 수정하기
  - HTTP header에 JWT tokent을 넣어서 요청을 보낸다.

```javascript
<sript>
methods: {
    setToken: function() {                    // 헤더에 포함할 내용(token)을 생성
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authroization: `JWT ${token}`,
          }
      }
      return config
    },
    getTodos: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/todos/',
        headers: this.setToken()               // 모든 axios 사용시 토큰을 headers에 추가
      })
created: function () {
    if(localStorage.getItem('jwt')){
      this.getTodos()
    } else {
      this.$router.push({name: 'Login'})
    }
}
</sript>
```
