# Kakao MAP API

> **kakao.maps.Map(`container`, `options`)**
> - `container`: *node*, 지도가 표시될 HTML 요소
> - `options`: *Object* 
>   - `center`: *LatLng*, kakao.maps.LatLng(latitude, longitude), 중심 좌표(필수 값)
>   - `level`: *Number*, 3(기본값), 확대 수준


```js
const container = document.getElementById('map')
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};
 
const map = new kakao.maps.Map(container, options);
```