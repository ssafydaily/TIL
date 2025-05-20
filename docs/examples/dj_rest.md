# dj-rest-auth

- DRF 사이트에 문서에서 링크를 참고하기
- [<Badge type="tip" text="참고 문서 보기" vertical="middle"/>](https://www.django-rest-framework.org/api-guide/authentication/#django-rest-auth-dj-rest-auth)


::: tip
- `auth.User` 를 사용자 정의 모델인 `accounts.User`로 변경해서 반영
- [requirements.txt](./django_settings/requirements.txt) /  [settings.py](./django_settings/settings.py) /  [urls.py](./django_settings/urls.py) 
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
$ pip install 'dj-rest-auth[with_social]' # 공식 문서의 내용

# pip에서 extras 옵션 (대괄호 안의 부분)은 문법적으로 - 하이픈만 허용
$ pip install 'dj-rest-auth[with-social]' # 7.0.0 이후 부터 변경
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

## DRF 인증 방법 설정

- [<Badge type="tip" text="참고 문서 보기" vertical="middle"/>](https://www.django-rest-framework.org/api-guide/authentication/)

```python
REST_FRAMEWORK = {
    # Authentication
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## 권한 설정

- [<Badge type="tip" text="참고 문서 보기" vertical="middle"/>](https://www.django-rest-framework.org/api-guide/permissions/)

```python
REST_FRAMEWORK = {
    # permission
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',
    ],
```

- `decorator`