# 폼(form) 조작


## 폼의 속성들과 메소드들

- 폼은 특수한 컬렉션인 `document.forms`의 구성요소이다.
- `document.forms`에 속한 폼들은 이름과 순서를 가진다.

```js
document.forms[0]     // 첫 번째 폼
document.forms.myform // 이름이 myform 인 폼
```

### 폼의 요소들

- `form.elements` 를 사용해서 폼의 요소에 접근할 수 있다

```html
<form name="myform">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // 폼 얻기
  const form = document.forms.my; // <form name="myform"> 요소

  // 요소 얻기
  const elem = form.elements.one; // <input name="one"> 요소

  alert(elem.value); // 1
</script>
```

- 이름이 같은 여러 요소를 다뤄야 하는 경우(예) 라디오 버튼)에 `form.elements[name]`은 컬렉션이 된다.

### `element.form`으로 역참조 가능

- 모든 요소는 `element.form`으로 폼에 접근 가능

```html
<form id="form">
  <input type="text" name="login">
</form>

<script>
  // 폼 -> 요소
  let login = form.login;

  // 요소 -> 폼
  alert(login.form); // HTMLFormElement
</script>
```

> **input / textarea**
> - 요소의 값은 `input.value` (string) 또는 `input.checked` (boolean) 을 사용해서 얻는다
> ---------
> **select / option**
> - 세가지 중요 속성들
>   - `select.options` - `<option>` 하위 요소들의 컬렉션
>   - `select.value` - 현재 선택된 `<option>` 값
>   - `select.selectedIndex` - 현재 선택된 `<option>` 의 번호
>
> ```javascript
> <select id="select">
>   <option value="apple">Apple</option>
>   <option value="pear">Pear</option>
>   <option value="banana">Banana</option>
> </select>
> 
> <script>
>   // 세 가지 코드의 실행 결과는 모두 같습니다.
>   select.options[2].selected = true;
>   select.selectedIndex = 2;
>   select.value = 'banana';
> </script>
>
> ```


