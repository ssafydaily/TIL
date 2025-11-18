# youtube 검색

::: info 참고 사이트
- [Google CDC](https://cloud.google.com/developers?hl=ko)
- [Youtube search API](https://developers.google.com/youtube/v3/docs/search/list?hl=ko)
- [axios Docs](https://axios-http.com/kr/docs/intro)
- [YouTube 내장 플레이어](https://developers.google.com/youtube/player_parameters?hl=ko)
:::


## Search API 

- 쿼리 매개변수와 일치하는 검색결과 모음을 반환
- 기본적으로 검색결과 집합은 일치하는 video, channel, playlist 리소스를 식별하지만 특정 유형의 리소스 검색 가능


#### HTTP 요청
- `search` API URL
```
GET https://www.googleapis.com/youtube/v3/search

# 예시 요청
https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&part=snippet&type=video&q=ssafy
```

- axios 작성
```js
axios({
  method: 'get',
  url: API_URL,
  params: {
    key: API_KEY,
    part: 'snippet',
    type: 'video',
    q: 'ssafy',
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))
```
