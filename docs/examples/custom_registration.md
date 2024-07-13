# django-allauth + Custom User/Registration

::: tip
 - `dj-rest-auth` 설치 [<Badge type="tip" text="link" vertical="middle"/>](./dj_rest.md)
 - 커스텀 사용자 모델을 사용한 회원가입 [<Badge type="tip" text="link" vertical="middle"/>](https://tolu.hashnode.dev/how-to-serialize-custom-user-model-and-register-new-instances-with-django-rest-framework-1)
:::


## 사용자 정의 모델 

- `AbstractUser` 를 상속 받아서 필요한 필드를 추가한 **Custom `User`** 모델 정의

```python
# /accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    age = models.PositiveIntegerField()
    occupation = models.CharField(max_length=50)
```
- `settings.py` 에 'AUTH_USER_MODEL' 로 등록하고 `makemigration` 과 `migrate` 실행

## Serializer 정의

- 아래와 같이 회원 가입에 사용할 `Serializer` 를 정의

```python
# accounts/serializers.py
from allauth.account.adapter import get_adapter
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User

class CustomRegisterSerializer(RegisterSerializer):
    age = serializers.IntegerField(max_value=None, min_value=1)
    occupation = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'age', 'occupation',)
```
- `Settings.py` 에 등록

```python
# pjt_folder/settings.py
REST_AUTH = {
    'SESSION_LOGIN': False,  # 회원 가입 후에 token 반환하도록 설정
    'REGISTER_SERIALIZER': 'accounts.serializers.CustomRegisterSerializer',
}
```

### `get_clean_data()` / `save()` 재정의

```python{9, 20}
class CustomRegisterSerializer(RegisterSerializer):
    age = serializers.IntegerField(max_value=None, min_value=1)
    occupation = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'age', 'occupation',)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'age': self.validated_data.get('age'),
            'occupation': self.validated_data.get('occupation'),
        }

    # save 재정의
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.age = self.cleaned_data.get('age')
        user.occupation = self.cleaned_data.get('occupation')
        user.save()
        adapter.save_user(request, user, self)
        return user
```
-------------------------
