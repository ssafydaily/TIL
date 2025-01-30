from pathlib import Path

# todo_list.md가 소스코드와 같은 폴더에 있음
src = Path(__file__).parent / 'todo_list.md'

dest = src.with_name('today_list.md')

dest.write_bytes(src.read_bytes())
