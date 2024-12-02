# Class-based View


## 기본 클래스

- `View` 클래스: **view** 와 **URL** 을 연결하고 **HTTP method** 를 전달하는 **base** 클래스
- `RedirectView` 클래스: HTTP 리다렉이렉트를 제공
- `TemplateView` 클래스: 템플릿을 렌더링하는 **base** 클래스를 확장한 클래스
- **CRUD** 와 관련 클래스: `ListView`, `DetailView`, `CreateView`, `UpdateView`, `DeleteView`

## URLConf에서 사용하기

- `as_view()` 메소드를 호출하면서 `template_name` 인자로 템플릿 파일을 등록

```python
from django.urls import path
from django.views.generic import TemplateView


urlpatterns = [
    path('index/', 
         TemplateView.as_view(template_name="articles/index.html")),
]
```

## generic view 재정의하기

- 속성(예> `template_name`) 이나 메소드(예> `get_context_data`)를 재정의

```python
# articles/views.py
from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = 'articles/index.html'
```

- `urls.py` 수정
```python
from .views import IndexView

urlpatterns = [
    path('index/', IndexView.as_view()),
]
```


## Generic View 클래스

- 게시글 모델 정의
```python
# models.py

from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=30)
    content = models.TextField()
    # ... 추가 필드 정의
    
```

- 다음 **URL** 을 하나씩 추가하면서 작성한다.
```python
# urls.py
from django.urls import path
from .views import (
    ArticleListView, ArticleCreateView, ArticleUpdateView, ArticleDetailView,
    ArticleDeleteView
)

# 앱네임
app_name = 'articles'

urlpatterns = [
  # 전체 게시글 조회
  path('', ArticleListView.as_view(), name='index'),
  
  # 게시글 작성
  path('create/', ArticleCreateView.as_view(), name='create'),
  
  # 게시글 상세 조회
  path('<int:pk>/', ArticleDetailView.as_view(), name='detail'),

  # 게시글 수정  
  path('<int:pk>/update/', ArticleUpdateView.as_view(), name='update'),

  # 게시글 삭제
  path('<int:pk>/delete/', ArticleDeleteView.as_view(), name='delete'),
]
```

## ListView
- 게시글 목록 조회
```python
from django.views.generic import ListView
from .models import Article

class ArticleListViwe(ListView):
    model = Article
    template_name = 'articles/index.html'
    # queryset 객체 이름
    context_object_name = 'articles'
```

- **쿼리셋** 을 수정하려면 `get_queryset(self)` 메소드를 재정의한다.
```python
def get_queryset(self):
  """
  글번호 내림차순으로
  """
  return Article.objects.order_by('-pk')
```

## DetailView
- 게시글 상세 조회
```python
from django.views.generic import DetailView
class ArticleDetailView(DetailView):
    model = Article
    template_name = 'articles/detail.html'
    # url에 포함된 pk로 조회한 article 객체
    context_object_name = 'article'
```

## CreateView

```python

from django.urls import reverse_lazy
from django.views.generic import CreateView

class ArticleCreateView(CreateView):
    model = Article
    fields = ['title', 'content']
    template_name = 'articles/create.html'
    success_url = reverse_lazy('articles:index')
```
- **URL 네임스페이스** 를 사용하라면 `reverse_lazy` 함수가 필요

```html
<form action="" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="제출">
  </form>
```
- 모델에 의해 생성된 `form` 객페가 전달된다.


## Update View
- 게시글 수정
```python
from django.views.generic import UpdateView
class ArticleUpdateView(UpdateView):
    model = Article
    fields = ['title', 'content']
    template_name = 'articles/update.html'
    context_object_name = 'article'

    def get_success_url(self):
        return reverse_lazy('articles:detail', kwargs={'pk': self.object.pk})
```

- 템플릿에 `form` 과 요청 url의 `pk` 에 해당하는 `article` 겍체가 전달된다.
```html
  <h2>게시글 작성</h2>

  <form action="" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="제출">
  </form>
```

- `get_object()` 메소드를 오버라이드하여 커스터마이징 할 수 있다.

```python
from django.views.generic import UpdateView
class ArticleUpdateView(UpdateView):
    model = Article
    fields = ['title', 'content']
    template_name = 'articles/update.html'
    context_object_name = 'article'

    def get_success_url(self):
        return reverse_lazy('articles:detail', kwargs={'pk': self.object.pk})
    

    def get_object(self, queryset=None):
      obj = super().get_object(queryset)
      print('=========================')
      print('get_object 오버라이드....')
      print('=========================')
      # if obj.author != self.request.user:  # 작성자가 아니라면 수정 불가
      #     raise Http404("로그인이 필요합니다.")
      return obj

```