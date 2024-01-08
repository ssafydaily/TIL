with open('input.txt', encoding='utf-8') as rf, open('output.txt', 'w', encoding='utf-8') as wf:
    for line in rf:
        wf.write(line)