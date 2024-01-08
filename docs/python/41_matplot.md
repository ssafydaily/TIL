# Matplot




## **Figure**를 `PNG` 파일로 저장하기


- `matplotlib figure` 를 저장하려면 다음 2가지 방법을 사용
  - `.savefig()`
  - `.imsave()`

```python

#   fname : 파일 이름
#   dpi: 이미지 해상도를 조정하기 위한 Dots per Inch
#   format: 파일 포맷(예, png)

savefig(fname, dpi='figure', format=None)

# ------------------------------------------------------
#   fname : 파일 이름
#   arr: 이미지

matplotlib.pyplot.imsave(fname, arr)

```

### 예시

```python
import matplotlib.pyplot as plt
 
# Creating data
x = ['2010', '2002', '2004', '2006', '2008']
y = [10, 25, 50, 15, 8]
 
# Plotting barchart
plt.bar(x, y)
 
# Saving the figure.
plt.savefig("figure-1.jpg", format='png')
 
# Saving figure by changing parameter values
plt.savefig("figure-2", facecolor='g', bbox_inches="tight",
            pad_inches=0.3, transparent=True, format='png')

```
