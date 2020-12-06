# Array.prototype.sort的"坑"

## 对`number[]`进行排序，结果不符合预期

观察如下demo的执行结果：

```javascript
> [5, 10, 2].sort();
> [10, 2, 5]
```

10排在了2前面，原因是`'10' < '2'`  

> sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在**将元素转换为字符串**，然后比较它们的UTF-16代码单元值序列时构建的
---- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 实现正确的`number[]`排序，需要传入`compareFunction`

```javascript
> [5, 10, 2].sort((a, b) => a > b ? 1 : -1);
> [2, 5, 10]
```

+ 如果 `compareFunction(a, b) < 0` ，a会排在b之前
+ 如果 `compareFunction(a, b) = 0` ，a和b的相对位置不变(备注：ECMAScript 标准并不保证这一行为)
+ 如果 `compareFunction(a, b) > 0` ，a会排在b之后

可以理解为 `compareFunction(a, b) > 0` 执行交换，否则不交换
