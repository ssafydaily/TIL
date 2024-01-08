# TMDB Data -> DB

## Model

- Movie는 Genre 와 Actor 에 대해 **N:M** 관계를 가진다.

```python
# models.py
from django.db import models
from django.conf import settings
from django.http import JsonResponse

class Genre(models.Model):
    name = models.CharField(max_length=50)

class Actor(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField(blank=True)
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    youtube_key = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    actors = models.ManyToManyField(Actor)
```

### 장르 데이터 저장하기
- `API_KEY`는 **tmdb** 에서 발급받은 `api_key` 작성

```python
# views.py
from .models import Genre, Movie, Actor
import requests

API_KEY = 'your-tmdb-api-key'
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'

def tmdb_genres():
    response = requests.get(
        GENRE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',            
        }
    ).json()    
    for genre in response.get('genres'):
        if Genre.objects.filter(pk=genre['id']).exists(): continue        
        print(genre)
        Genre.objects.create(
            id=genre['id'],
            name=genre['name']
        )
    return JsonResponse(response)
```

### TMDB 영화 검색하기

```python
def movie_data(page=1):
    response = requests.get(
        POPULAR_MOVIE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
    ).json()

    for movie_dict in response.get('results'):
        if not movie_dict.get('release_date'): continue   # 없는 필드 skip
        # 유투브 key 조회
        youtube_key = get_youtube_key(movie_dict)

        movie = Movie.objects.create(
            id=movie_dict.get('id'),
            title=movie_dict.get('title'),
            release_date=movie_dict.get('release_date'),
            popularity=movie_dict.get('popularity'),
            vote_count=movie_dict.get('vote_count'),
            vote_average=movie_dict.get('vote_average'),
            overview=movie_dict.get('overview'),
            poster_path=movie_dict.get('poster_path'),   
            youtube_key=youtube_key         
        )
        for genre_id in movie_dict.get('genre_ids', []):
            movie.genres.add(genre_id)

        # 배우들 저장
        get_actors(movie)
        print('>>>', movie.title, '==>', movie.youtube_key)
```

```python
# views.py
def get_youtube_key(movie_dict):    
    movie_id = movie_dict.get('id')
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/videos',
        params={
            'api_key': API_KEY
        }
    ).json()
    for video in response.get('results'):
        if video.get('site') == 'YouTube':
            return video.get('key')
    return 'nothing'
```

```python
def get_actors(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()

    for person in response.get('cast'):
        if person.get('known_for_department') != 'Acting': continue
        actor_id = person.get('id')
        if not Actor.objects.filter(pk=actor_id).exists():
            actor = Actor.objects.create(
                id=person.get('id'),
                name=person.get('name')
            )
        movie.actors.add(actor_id)
        if movie.actors.count() == 5:
            break
```


### 실행 함수

```python
# views.py
def tmdb_data(request):
    Genre.objects.all().delete()
    Actor.objects.all().delete()
    Movie.objects.all().delete()

    tmdb_genres()
    for i in range(1, 6):
        movie_data(i)
    return HttpResponse('OK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
```

--------------------

## Serializer 를 활용해서 저장하기

### `Serializer` 작성

```python
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model
            fields = '__all__'

    genres = GenreSerializer(many=True, read_only=True)  # DB --> Json
    genre_ids = serializers.ListField(write_only=True)   # Json --> DB
    like_users = UserSerializer(many=True, read_only=True)
    overview = serializers.CharField(allow_blank=True)

    def create(self, validated_data):
        genre_ids = validated_data.pop('genre_ids')        
        movie = Movie.objects.create(**validated_data)
        for id in genre_ids:
            movie.genres.add(id)        
        return movie

    class Meta:
        model = Movie
        fields = ('id', 'title', 'release_date', 'popularity', 'vote_count', 'vote_average', 'overview', 'poster_path', 'genres', 'genre_ids', 'like_users')
```

### view 함수

```python
def tmdb_movies(request, page=1):
    POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'
    response = requests.get(
        POPULAR_MOVIE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',
            'page': page,
        }
    ).json()    

    for movie_dict in response.get('results'):        
        if Movie.objects.filter(title=movie_dict.get('title')).exists(): continue

        serializer = MovieSerializer(data=movie_dict)        
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    # return JsonResponse(response)
    return JsonResponse(response.get('results'), safe=False)
```

--------

### JSON 파일로 보관

- dump

```bash
$ mkdir movies/fixtures
$ python -Xutf8 manage.py dumpdata movies --indent 4 > ./movies/fixtures/movies.json
```

- load

```bash
$ python manage.py loaddata movies.json
```

