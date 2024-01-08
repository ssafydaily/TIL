data = ['첫번째 문자열\n', 'python input/ouput programming\n']
wf = open('output.txt', 'w', encoding='utf-8')
wf.writelines(data)
wf.close()

rf = open('output.txt', 'r', encoding='utf-8')
print(rf.read())
rf.close()