# 变量声明

## var声明

在`ES6`以前声明变量的关键字是`var`。

```ts
var foo = 10
```

上面代码定义了一个变量`foo`，值为`10`的这样一个变量。

```ts
function foo() {
    var a = 10
    return function bar() {
        var b = a + 1
        return b
    }
}
var a = foo()
console.log(a()) // 11
```

上面代码中，定义了一个函数`foo()`，通过外部调用函数，从而获取到函数内部的值，外部声明的变量`a`的返回值是一个`Function bar()`函数，调用该函数返回的是`11`。

```ts
function foo() {
    var a = 1
    a = 2
    var b = g()
    a = 3
    return b

    function g() {
        return a
    }
}
console.log(foo()) // 2
```

上面代码中，定义了一个`foo()`函数，通过外部直接调用该函数，`foo()`函数内部声明了两个变量`a`和`b`，并且还声明了一个`g()`方法，外部调用`foo()`函数，在内部运行到`var b = g()`时，因为`g()`方法是一个带返回值的，它返回`a`的值，当前`a`的值为`2`，所以调用`foo()`函数就会得到结果`2`。

### 作用域规则

使用`var`声明的变量，通过外部调用可以访问到内部的值，形成作用域规则。

```ts
function foo(bool: boolean) {
    if (bool) {
        var a = 10
    }
    return a
}
console.log(foo(true)) // 10
console.log(foo(false)) // undefined
```

上面代码中，创建一个`foo()`函数，并且该函数携带一个布尔值的参数，外部调用该函数，当函数参数为`true`是外部调用函数输出`10`，当函数参数为`false`，变为`undefined`，首先函数内部存在一个变量`a`赋初值为`10`。

上面代码中的`foo(bool: boolean)`参数就是一个作用域。

这些作用域规则有时候会引发一些错误。

```ts
function sumMatrix(matrix: number[][]) {
    var sum = 0
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i]
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i]
        }
    }
    return sum
}
```

上面代码中，在函数`sumMatrix()`中存在两个`for`循环，都使用`var`声明了变量`i`，这在后期代码维护以及上线部署中往往会出现问题。

在日常开发中，对于`for`循环参数，一直提倡使用`let`关键字声明变量，不使用`var`声明，因为`var`存在变量提升。

```ts
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i)
    }, 1000)
}
// 5
// 5
// 5
// 5
// 5
```

上面代码是不是和你预期输出的不一样，运行上面的代码是输出`5`个`5`，那为什么会这样呢，首先就是传递给`setTimeout`的每一个`i`其实都是在同一个作用域，然后在`JavaScript`运行时，由于使用`var`上面循环体内部参数，其实`i`就是一个全局的，变量会提升，然后每次是循环结束之后才会有结果。运行结果如下所示。

![输出结果](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/26/b36b310198a71b6bf3e78064ba59f34f-20211226153935-47022d.png)

那么有什么办法让他变成我们期待的结果是如下呢，只需要将`var`改为`let`什么就行。

```ts
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i)
    }, 1000)
}
// 0
// 1
// 2
// 3
// 4
```

![输出结果](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/26/0d2b7a957cb34535ca2a3e95d3f5ebdf-20211226154140-060e69.png)

## let

在`ES6`标准中，采用`let`声明变量，这是一种新的声明变量的方式，在`ES5`以前，声明变量使用的是`var`，但是`var`声明变量是一个全局作用域的，所以避免变量污染，导致变量名重复，引入了`let`来声明变量，`let`是存在作用域，并且不存在变量提升，只存在块级作用域。

```ts
let hello = "hello"
```

### 块级作用域

当使用`let`声明一个变量之后，它就存在了**块级作用域**，不同于使用`var`声明的变量，可以在包含它们的函数外访问，块作用域变量在包含它们的代码块或`for`循环之外是不能访问的。

```ts
function foo(i: boolean) {
    let a = 10
    if (i) {
        let b = a + 1
        return b
    }
    return b
}
console.log(foo(true)) // Cannot find name 'b'
```

上面代码中，先创建一个`foo()`函数，并且该函数返回值是一个具体数值，由于变量`b`是由`let`声明，并且存在`if`的作用域中，在外部调用返回`b`就会报错。这就是作用域的作用。

拥有块级作用域的变量的另外一个特点是，不能在声明之前进行读写，虽然这些变量始终存在于它们的作用域中，都是直到声明它的代码之前都存在一个**暂时性死区**，它告诉我们不能在声明变量之前先使用它。

```ts
console.log(a) // Variable 'a' is used before being assigned
let a = 10
```

上面代码中，就很好的说明了这个报错信息。不能在未定义之前使用。

### 重定义和屏蔽

使用`var`可以多次声明同一个变量，不管你声明多少次，最终结果也只是一个。

```ts
function foo(x: any) {
    var x
    var x
    if (true) {
        return x
    }
}
console.log(foo(1)) // 1
```

上面代码中，使用`let`声明多个变量`x`,所有声明的`x`都来自一个`x`，并且这个代码是不会报错的，在日常开发中这个往往是bug的来源。

当使用`let`声明变量的时候，就不能在同一作用域声明该变量了。

```ts
function foo(x: any) {
    let x
    let x
    if (true) {
        return x
    }
}
console.log(foo(1)) // Duplicate identifier 'x'
```

上面代码提示重复声明了一个变量类型`x`，所以这就比较严格，也是开发中需要注意到的。

屏蔽是指在一个嵌套作用域里面引入一个新名字的行为叫屏蔽。

```ts
function sumMatrix(matrix: number[][]) {
    let sum = 0
    for (let i = 0; i < matrix.length; i++) {
        let currentRow = matrix[i]
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i]
        }
    }
    return sum
}
```

上面代码就可以输出正确的结果，因为内层的循环可以屏蔽掉外部的循环体变量，如果我们不采用`let`声明，结果就会报错。

### 块级作用域变量的获取

在我们最初谈及获取用`var`声明的变量时，我们简略地探究了一下在获取到了变量之后它的行为是怎样的。直观地讲，每次进入一个作用域时，它创建了一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。

```ts
function thenCityThatAlwaysSleeps() {
    let getCity
    if (true) {
        let city = "china"
        getCity = function () {
            return city
        }
    }
    return getCity()
}
console.log(thenCityThatAlwaysSleeps()) // china
```

上面代码编写了一个获取城市的函数`thenCityThatAlwaysSleeps()`，在函数内部的`if`代码块中，我们声明了一个`city`的变量，并且该变量被`getCity`方法作为函数返回，函数内部也能到他外部的变量`city`，最后`thenCityThatAlwaysSleeps()`函数返回的是`getCity()`，所以最后输出结果为**china**。

当let声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域。这就是我们在使用立即执行的函数表达式时做的事，所以在`setTimeout`例子里我们仅使用let声明就可以了。

```ts
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 100 * i)
}
// 0
// 1
// 2
// 3
// 4
```

![](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/26/d56863ea45f9d8c60cb4b1cf6c89d366-20211226182436-c61674.png)

## const

`const`声明是声明变量的另一种方式。

它们与`let`声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与`let`相同的作用域规则，但是不能对它们重新赋值，也就是说它的引入的值是不可以改变的。

```ts
const numLivesForCat = 10
const kitty = {
    name: "typescript",
    numLives: numLivesForCat
}
// Cannot assign to 'kitty' because it is a constant
kitty = {
    name: "javascript",
    numLives: numLivesForCat
}

console.log(kitty.name = "hello") // hello
console.log(kitty.numLives = 1) // 1
```

那么到底什么时候使用`let`，什么时候使用`const`，这里其实就是看情况而定，首先，假如你所声明的变量不会在下面进行重新赋值，那么久推荐使用`const`，这样你就很清楚的指知道数据的来源以及去向，然后再推荐使用`let`。

## 解构

解构就是依据一定的规则键一些数据类型进行顺序输出，这样的方式叫解构。

### 字符串解构

首先字符串解构可以采用拓展运算符`...`进行，可以将字符串按照字母依次解构，也可以解构成数组。

```ts
let str: string = "typescript"
console.log(...str) // t y p e s c r i p t
console.log([...str])
/* 
[
  't', 'y', 'p', 'e',
  's', 'c', 'r', 'i',
  'p', 't'
]
*/
```

### 数组解构

解构在日常开发中，是一个很普遍应用场景，依次按照数组的下标进行元素的读取。

```ts
let array: any[] = [1, 2, "3"]
let [a, b, c] = array
console.log(a) // 1
console.log(b) // 2
console.log(c) // "3"
```

用于函数的结构。

```ts
let array: any[] = [1, 2, "3"]
function foo([a, b, c]: any[]) {
    console.log(a)
    console.log(b)
    console.log(c)
}
foo([...array])
// 1
// 2
// "3"
```

上面代码通过拓展运算符进行数组解构，构建`foo()`函数，函数参数是一个数组，利用结构对数组`array`解构。然后给`foo()`参数赋值。

![数组解构](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/27/521e5681e5235b64dcfdc579634db139-20211227150353-d37ba7.png)

### 对象解构

对象也可以进行解构，并且也可以进行拓展运算解构。

```ts
let object = {
    a: "1",
    b: "2",
    c: "3"
}
let { a, b, c } = object
console.log(a)
console.log(b)
console.log(c)
```

![对象解构](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/27/3466bb650880dc76e0532f44cfc86959-20211227151442-5f45b7.png)

可以采用拓展运算符`...`进行对象的解构，使用拓展运算法首先是在最后才可以使用解构。

```ts
let object = {
    a: "1",
    b: "2",
    c: "3"
}
let { a, ...c } = object
console.log(c.b) // 2
console.log(c.c) // 3
```

上面代码中，对象`object`的解构是在`{}`中使用，在最后的位置进行使用。

### 函数声明

解构也可以用于函数的声明。

```ts
type C = { a: string, b?: number }
function foo({ a, b }: C): void {
    // 
}
```

通常使用解构赋值一般都是指定默认值，在设置默认值之前要设置其格式。

```ts
function foo({ a = "", b = 0 } = {}): void {
    // 
}
foo()
```