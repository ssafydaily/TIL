# Error Handling

- 예외 전파

```python
def f():
    print('f()')
    try:
        g()
    except Exception as e:
        print(e, '예외 잡음')
        10/0

def g():
    print('g()')
    h()

def h():
    print('h()')
    raise ValueError('Exception')
#-----------------------    

try:
    f()
except ZeroDivisionError as e:
    print(e)
except Exception:
    print('여기까지 와바')
else:
    print('정상적으로 실행되었구나')
finally:
    print('무조건 여기 들렀다 가야지')
```

- 출력

```bash
f()
g()
h()
Exception 예외 잡음
division by zero
무조건 여기 들렀다 가야지
```