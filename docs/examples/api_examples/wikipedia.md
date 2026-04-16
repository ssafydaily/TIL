# wikipedia API

::: info
- 위키백과에서 정보를 검색하는 간단하고 사용하기 쉬운 API를 제공
- [공식 문서](https://wikipedia-api.readthedocs.io/en/latest/)
:::

## 패키지 설치
```bash
pip3 install wikipedia-api
```
- Python 3.9 이상 요구


### Synchronous

- 페이지 가져오기

```python
import wikipediaapi
wiki_wiki = wikipediaapi.Wikipedia(
  user_agent='MyToyProject (merlin@example.com)', 
  language='ko'
)

page = wiki_wiki.page('세종대왕')
print("페이지 존재 유무: %s" % page.exists())

```

- summary 가져오기

```python
print('>> 페이지 요약')
print(page.summary)
```

- 전체 내용 가져오기

```python
print('>> 전체 텍스트')
print(page.text)
# Summary
# Section 1
# Text of section 1
# Section 1.1
# Text of section 1.1
```

- section 가져오기(재귀호출 활용)

```python
def print_sections(sections, level=0):
    for s in sections:
        print(level, '>>>', s.title)
        print(s.text[:30])        
        print_sections(s.sections, level + 1)

# 재귀적으로 섹션을 가져와야 함.
print_sections(page.sections)
```

