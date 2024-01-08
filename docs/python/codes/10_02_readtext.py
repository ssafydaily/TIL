try:
    f = open('input.txt', 'r', encoding='utf-8')
    contents = f.read(50)
    print(contents, len(contents))
    f.close()
except FileNotFoundError as err:
    print(err)

print('====================================================')
try:
    f = open('input.txt', 'r', encoding='utf-8')
    contents = f.readline()
    print(contents)
    f.close()
except FileNotFoundError as err:
    print(err)

print('====================================================')
try:
    f = open('input.txt', 'r', encoding='utf-8')
    lines = f.readlines()
    for line in lines:
        print(line, end='')
    f.close()
except FileNotFoundError as err:
    print(err)