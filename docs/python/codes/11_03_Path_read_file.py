from pathlib import Path

# todo_list.md가 소스코드와 같은 폴더에 있음
path = Path(__file__).parent / 'todo_list.md'

content = path.read_text(encoding='utf-8')

print(content)