# dj-rest-auth

::: tip
- `auth.User` 를 사용자 정의 모델인 `accounts.User`로 변경
- `migrate` 하기
:::

## 설치

- 패키지 설치
```bash
$ pip install dj-rest-auth
```

- `settings.py` 의 `INSTALLED_APP` 에 등록
```python
# settings.py
INSTALLED_APPS = [
    # ...,
    'rest_framework',
    'rest_framework.authtoken',
    
    # ...,

    'dj_rest_auth',
]
```

- **url** 등록
```python
urlpatterns = [
  # ...
  path('accounts/', include('dj_rest_auth.urls')),
  # path('accounts/signup/', include('dj_rest_auth.registration.urls'))
]
```

## Regstration

- 회원 가입(registration) 기능을 사용하려면 추가로 `django-allauth` 가 필요함
```bash
$ pip install 'dj-rest-auth[with_social]'
```

- **App** 등록 및 **SITE_ID** 설정

```python
INSTALLED_APPS = [
    # registration
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
]

SITE_ID = 1

# 회원 가입식 토큰 반환 하도록 다음 설정 추가
REST_AUTH = {
    'SESSION_LOGIN': False
}
```

- 인증 방법 설정

```python
REST_FRAMEWORK = {
    # Authentication
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## 권한 설정

```python
REST_FRAMEWORK = {
    # permission
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',
    ],
```

- `decorator`