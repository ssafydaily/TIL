from pathlib import Path

# path = Path('C:/Users/user/Desktop/python/docs/python/codes/11_01_Path_attr.py')
path = Path(__file__)

print(path.name)    # 11_01_Path_attr.py
print(path.stem)    # 11_01_Path_attr
print(path.suffix)  # .py
print(path.anchor)  # C:\
print(path.parent)  # C:\Users\user\Desktop\python\docs\python\codes
print(path.parent.parent) # C:\Users\user\Desktop\python\docs\python