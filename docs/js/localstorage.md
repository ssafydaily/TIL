# localstorage

- 브라우저의 로컬 스토리지(localstorage) 활용하기

## window.localstorage

- 저장한 데이터는 브라우저 세션 간에 공유
- `localStorage`는 [`sessionStorage`](https://developer.mozilla.org/ko/docs/Web/API/Window/sessionStorage)와 비슷하지만, `localStorage`의 데이터는 만료되지 않음. 
- `sessionStorage`의 데이터는 페이지 세션이 끝날 때, 즉 페이지를 닫을 때 사라지는 점이 다릅니다. 

## Web Storage API

- 브라우저에서 키/값 쌍을 [쿠키 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Cookie)보다 훨씬 직관적으로 저장할 수 있는 방법을 제공합니다.
- 2가지 방법
  - window.sessionStorage
  - window.localStorage

> - **sessionStorage**는 각각의 출처(origin) 에 대해 독립적인 저장 공간을 페이지 세션이 유지되는 동안(브라우저가 열려있는 동안) 제공합니다.
>   
>   - 세션에 한정해, 즉 브라우저 또는 탭이 닫힐 때까지만 데이터를 저장합니다.
>   - 데이터를 절대 서버로 전송하지 않습니다.
>   - 저장 공간이 쿠키보다 큽니다. (최대 5MB)
> 
> - **localStorage**도 위와 같지만, 브라우저를 닫았다 열어도 데이터가 남아있습니다.
>   
>   - 유효기간 없이 데이터를 저장하고, JavaScript를 사용하거나 브라우저 캐시 또는 로컬 저장 데이터를 지워야만 사라집니다.
>   - 저장 공간이 셋 중 제일 큽니다.

## onstorage event

```javascript
window.addEventListener('storage', () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem('sampleList')));
});
```

## Storage Inteface

- storage.length  ==> `readonly`
  
  - `Storage` 객체에 저장된 데이터 항목의 수를 반환

- storage.key(index)

- storage.getItem(keyname)
  
  - 주어진 key가 없다면 `null` 반환
  - 반환값은 keyvalue

- storage.setItem(keyname, keyvalue)
  
  - 새로운 key를 생성하거나, 기존의 key-value 를 수정
  - 반환값 없음.

- storage.removeItem(keyname)
  
  - 반환값 없음

- sorage.clear()

> Javscript 객체를 직렬화해서 저장하고, 값을 가져오면 다시 객체로 역직렬화한다.