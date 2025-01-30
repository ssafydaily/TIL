# pathlib module

- 버전 3.4부터 표준 라이브러리에 포함된 모듈
- Python의 pathlib모듈은 기존의 문자열 기반 경로 처리에 의존하는 대신, 파일을 읽고, 쓰고, 이동하고, 삭제하는 크로스 플랫폼 방식을 제공하는 객체를 사용

## 경로를 문자열로 표현하기

- 윈도우에서 경로 작성시 폴더들 사이의 구분 기호로 **백슬래시**(`\`)를 사용하여 작성
- macOS, Linux, BSD와 같은 Unix 기반 운영 체제에서는 **포워드 슬래시**(`/`)를 사용
- 코드가 다른 플랫폼에서 작동하는 경우 경로를 연결하는 것은 골치 아픈 일이 될 수 있다

- Python에서는 이를 위해 `pathlib.Path.joinpath`를 제공


```python
from pathlib import Path
print(Path('usr').joinpath('bin').joinpath('spam'))
# usr/bin/spam

# '/' 연산자 지원
print(Path('usr') / 'bin' / 'spam')  # usr/bin/spam
```


## 경로 인스턴스화

- 문자열 대신 pathlib 전용 객체로 파일 시스쳄을 표현: **객체 지향 파일 시스템 경로**


> import 하기

```python
from pathlib import Path
```

> 현재 작업 디렉토리

```python
Path.cwd()
# WindowsPath('C:/Users/ssafy/Desktop/my_docs')  또는 PosixPath
```

> 홈 디렉토리
```python
Path.home()
# WindowsPath('C:/Users/ssafy'
```

> 문자열 전달

```python
Path(r'C:\Users\ssafy\file.txt')
# WindowsPath('C:/Users/ssafy/file.txt')

Path('/usr/ssafy/file.txt')
```
- 윈도우에서 백슬래시는 인쇄할수 없는 이스케이프 문자로 사용된다.
- 이스케이프 문자를 포함하는 문자열을 전달하기 위해 `r` 접두사를 사용 => 원시 문자열 리터럴

:::tip 현재 모듈의 위치 경로에 사용하는 관용적 방법

- `__file__` 특별 변수를 사용하여 현재 모듈의 위치 얻기

```python
from pathlib import Path

print(Path(__file__).parent)
```
:::


## 파일 시스템 작업

> 경로의 구성 요소 선택
- `.name`: 디렉토리가 없는 파일 이름
- `.stem`: 파일 확장자를 제외한 파일 이름
- `.suffix`: 파일 확장자
- `.parent`: 파일이 포함된 디렉토리 또는 부모 디렉토리


<<< @/python/codes/11_01_Path_attr.py



> 파일 읽기

- 파이썬의 전통적인 파일 오픈함수를 사용해서 읽기

<<< @/python/codes/11_02_Path_read_file.py

- `read_text()` 메서드 사용하기

<<< @/python/codes/11_03_Path_read_file.py


> 파일 복사

<<< @/python/codes/11_04_Path_write_file.py

> 삭제

- `Path.unlink()` : 경로에 있는 파일이 삭제

- `Path.rmdir()` : 경로에 있는 폴더가 삭제. 이 폴더는 파일이나 폴더가 없어야 함.


> 빈파일 생성
```python
from pathlib import Path
filename = Path("hello.txt")
filename.exists()
# False

filename.touch()
filename.exists()
# True

```