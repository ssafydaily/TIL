# OPEN API 요청

[[toc]]

## TMDB
- 인기 있는 영화 목록 요청하기 (get popular)
  - `token`: 토큰 저장 변수 
  - `axios` CDN 추가 또는 설치

::: code-group

```js [axios]

const config = {
  method: 'GET', 
  
  url: 'https://api.themoviedb.org/3/movie/popular',

  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  language: 'ko-KR',
  page: 1,
}

axios(config)      
  .then(res => {
    const movies = res.data.results
    console.log(movies)

    movies.forEach(movie => {
      if (movie.vote_average >= 7) {
        console.log(movie.title)
      }
    })

  })      
  .catch(err => console.error(err))

```

```js [fetch]
const url = 'https://api.themoviedb.org/3/movie/popular'
const options = {
  method: 'GET', 
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  language: 'ko-KR',
  page: 1,
}

fetch(url, options)
  .then(res => res.json())
  .then(json => {
    const movies = json.results
    console.log(movies)
    movies.forEach(movie => {
      if (movie.vote_average >= 7) {
        console.log(movie.title)
      }
    })
  })   
  .catch(err => console.error(err))

```
:::

## Last.fm

::: code-group

```js [axios]



```

```js [fetch]


```
:::


## 금융감독원


::: code-group
```python [python]

```

```js [js - axios]



```

```js [js - fetch]


```
:::


## Aladin

::: code-group
```python [python]

```

```js [js - axios]



```

```js [js - fetch]


```
:::


## Kakao API


