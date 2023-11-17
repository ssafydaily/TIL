# 이미지 업로드(Django(DRF) + Vue(axios))

## Django 설정

### 정적 파일을 위한 설정

- `staticfiles` 앱이 `settings.py`의 `INSTALLED_APPS`에 등록된 상태
- `STATCI_URL`이 `settings.py`에 설정된 상태
- Django는 정적파일을 `app/` 의  `static/` 에서 찾는다.
- 폴더를 추가하려면 `template` 폴더와 같이 `settings.py` 에 등록해야 한다.
  - `STATICFILES_DIRS` 

```python
STATIC_URL = '/static/'

# 정적파일의 저장 위치 추가
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

- 최상위(혹은 app폴더)에 `static` 폴더를 생성한다.
- 생성한 폴더에 `style.css` 파일을 생성해서 간단히 작성한다.

### 템플릿 파일에서 정적파일 사용하기

- 작성한 스타일시트 파일을 템플릿에 적용해본다.
- `{% load static %}` 을 추가한다.
- `url` 은 `{% static '' %}` 으로 작성한다.

```html
<!-- {% extends '' %}는 항상 최상위 -->

{% load static %}

<link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
```

## 이미지 파일 업로드

- 필요한 패키지 설치

```bash
$ pip install pillow django-imagekit
```

- `imagekit` 앱 등록

```python
# settings.py
INSTALLED_APPS = [
    # . . .
    'imagekit',
    # ...
]
```

- 미디어 URL/ROOT 등록

```python
# settings.py

MEDIA_URL = '/media/' 
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

- Model 클래스에 `ImageField` 추가하기

```python
from django.db import models
from imagekit.models import ImageSpecField
from pilkit.processors import Thumbnail


class Post(models.Model):
    image = models.ImageField(upload_to='images/', blank=True)
    image_medium = ImageSpecField(source='image',
                                  processors=[Thumbnail(200, 100)],
                                  format='JPEG',
                                  options={'quality': 60})
    image_small = ImageSpecField(source='image',
                                 processors=[Thumbnail(100, 50)],
                                 format='JPEG',
                                 options={'quality': 60})
```

- 템플릿에서 사용하기

```html
<img src="{{ post.image_medium.url }}">
<img src="{{ post.image_small.url }}">
<img src="{{ post.image.url }}">
```

## File Uploads

- view에서 **`FileField`** 에 대한 데이터는 **`request.FILES`** 로 접근
- **`<form>`** 에서는  **`enctype="multipart/form-data"`** 가 필요

```python
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm

# Imaginary function to handle an uploaded file.
from somewhere import handle_uploaded_file

def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})
```

- Model과 함께 업로드 파일 처리하기

```python
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import ModelFormWithFileField

def upload_file(request):
    if request.method == 'POST':
        form = ModelFormWithFileField(request.POST, request.FILES)
        if form.is_valid():
            # file is saved
            form.save()
            return HttpResponseRedirect('/success/url/')
    else:
        form = ModelFormWithFileField()
    return render(request, 'upload.html', {'form': form})
```

## 개발 중에 Static Files 제공하기

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

----------------------------------

## REST + Vue(Axios)

- model 과 Serializer

```python
# models.py
class Profile(models.Model):
    image = models.ImageField(upload_to='images/', blank=True)

# Serializer.py
class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Profile
        fields = '__all__'
```

- views.py

```python
from .serializer import ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def upload_image(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({ 'result': 'OK'})
```

- Vue(Axios)

```html
<template>
  <div id="app">
    <h1>이미지 업로드</h1>
      <input type="file" @change="selectFile" ref="imgTag">
      <button @click="onSubmit">제출</button>
  </div>
</template>
```

```javascript
export default {
  name: 'App',
  data() {
    return {
      image: null,
    }
  },
  methods: {
    selectFile() {
      console.log(this.$refs)
      this.image = this.$refs.imgTag.files[0]
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('image', this.image)
      axios({
        url: 'http://127.0.0.1:8000/accounts/upload_image/',
        method: 'post',
        data: formData,
        headers: {'Content-type': 'multipart/form-data'}
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
```