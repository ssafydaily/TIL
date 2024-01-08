# Object / Class

## Class

### instance vs class variable

```python
class Person:
    name = 'person'
    def __init__(self, name='anonymous'):
        self.name = name

    def laugh(self):
        print(f'{self.name}가 웃는다.')

p1 = Person('IU')
p2 = Person('john')
p3 = Person()

p1.laugh()
p2.laugh()
p1.age = 10                # 속성 동적으로 추가됨
Person.age = 20
print(p1.age)
print(p2.age)
```

### static method vs. class method

- 왜? 

- class method의 첫번째 인자

```python
class Person:

    class_var = 'Person class'
    def __init__(self):
        print('Person init')

    @classmethod
    def class_method(cls):                # cls
        print(cls.class_var)

class Student(Person):
    class_var = 'Student class'

    def __init__(self):
        super().__init__()
        print('Student init')

s = Student()
Person.class_method()
Student.class_method()
```

- staic method

```python
class Person:

    class_var = 'class varialbe'
    def __init__(self):
        print('Person init')

    @classmethod
    def class_method(cls):                # cls
        print('class method' + cls.class_var)

    @staticmethod
    def static_method():                # 인자 없음
        print('static method')

class Student(Person):

    def __init__(self):
        super().__init__()
        print('Student init')

    def learn(self):
        print('learning...')

s = Student()
Person.class_method()
Student.class_method()
```

### 다중 상속

```python
class Person:
    gender = 'NOT'
    def __init__(self, name='unknown') -> None:
        self.name = name

    def say(self):
        print(f'저는 {self.name}입니다.')

class Father(Person):
    def __init__(self, name) -> None:
        super().__init__(name=name)
        Person.gender = '남자'

    def say(self):
        print(f'저는 멋진 {Person.gender}, {self.name}입니다.')

class Mother(Person):
    def __init__(self, name) -> None:
        super().__init__(name=name)
        Person.gender = '여자'

    def say(self):
        print(f'저는 아름다운 {Person.gender}, {self.name}입니다.')

class Son(Father, Mother):
    pass

class Daughter(Mother, Father):
    pass

f = Father('홍길동'); f.say()
m = Mother('심청이'); m.say()
s = Son('견우'); s.say()
d = Daughter('직녀'); d.say()
```

### public, protected, private

```python
class MyClass:
    _protected_var = 0
    __private_var = 0
    def __init__(self):
        print('MyClass 생성')
```

