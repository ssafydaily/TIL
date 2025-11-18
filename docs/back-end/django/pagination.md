# Pagination

## Djangog Pagination 활용

- **Django Pagination** [<Badge type="tip" text="link" vertical="middle"/>](https://docs.djangoproject.com/en/4.2/ref/paginator/#django.core.paginator.Paginator.num_pages)

```python
from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer

@api_view(['GET',])
def index(request):
    movies = Movie.objects.all()
    page_num = request.GET.get('page', 1)
    size = request.GET.get('size', 20)
    paginator = Paginator(movies, size)  
    page = paginator.get_page(page_num) # 범위를 벗어나는 경우 처음 또는 마지막 페이지
    # page = paginator.page(page_num) # 범위를 벗어나는 경우 예외 발생
    
    serializer = MovieSerializer(page, many=True)    
    res = {        
        'pageTotal': paginator.num_pages,       # 전체 페이지 수        
        'pageNum': page_num,
        'results': serializer.data,
    }
    return Response(res)
```

## Intersection Observer in Vue.js
- `IntersecitonObserver` 를 사용해서 `vue`에서 무한 스크롤 구현

### Scroll comonent

```html
<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in items" :key="item.id">{{item.name}}</li>
    </ul>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import Observer from "./Observer";

export default {
  data: () => ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&_limit=50`);

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    },
  },
  components: {
    Observer,
  },
};
</script>
```

### Observer component

```html
<template>
  <div class="observer"/>
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
```

----------
## DRF API 작성중

:::tip pagination API
- Pagination 은 `generic view` 또는 `viewset`을 사용하면 자동으로 실행
- `APIView` 를 사용한다면, **pagination api** 를 호출
:::

### `pagination style` 설정하기

- `DEFAULT_PAGINATION_CLASS` 와 `PAGE_SIZE` 사용해서 전역 설정
- `pagination_class` 속성을 사용해서 개별적으로 설정 가능
```python
# setting.py
REST_FRAMEWORK = {
    # ....
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 20
}
```

### `pagination style` 수정하기

```python
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class BillingRecordsView(generics.ListAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingRecordsSerializer
    pagination_class = LargeResultsSetPagination
```

### API

#### PageNumberPagination
- `pagination style`은 요청시 페이지 번호에 대한 쿼리 스트링 파라미터 받는다
- 요청
  ```
  GET https://api.example.org/accounts/?page=4
  ```

- 응답
  ```
  HTTP 200 OK
  {
    "count": 1023,
    "next": "https://api.example.org/accounts/?page=5",
    "previous": "https://api.example.org/accounts/?page=3",
    "results": [
       …
    ]
  }
  ```

#### LimitOffsetPagination

- 요청
  ```
  GET https://api.example.org/accounts/?limit=100&offset=400
  ```
- 응답
  ```
  HTTP 200 OK
  {
      "count": 1023,
      "next": "https://api.example.org/accounts/?limit=100&offset=500",
      "previous": "https://api.example.org/accounts/?limit=100&offset=300",
      "results": [
        …
      ]
  }
  ```