# Request & Response

-----------------
# Response

## 이미지 파일 응답 객체에 포함시키기

- `rb` => `read binary`

```python
import base64

with open(image_path, "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

context = {
  'image': image_data,
}

return render(request, 'index.html', context)
```

- 장고 템플릿 파일의 `<img>` 태그에서 다음과 같이 처리


```html
<img src="data:image/png;base64,{{ image }}>
```