# 数据类型

## 概念

`JavaScript`数据类型分为**基本类型**和**引用数据类型**，`TypeScript`支持与`JavaScript`几乎相同的数据类型，此外还提供了**枚举类型**进行使用。

**基本类型**包括`字符串（string）`、`数值（number）`、`布尔值（boolean）`、`对空（null）`、`未定义（undefined）`以及**`ES6`**添加的`Symbol`类型。

**引用数据类型**包括`数组（Array）`、`对象（Object）`、`函数（Function）`。

## 基本类型

### 布尔值（boolean）

布尔值是最简单的基本数据类型，只存在两个值，`true`和`false`，在编程语言中使用符号`boolean`表示。

```ts
let foo: boolean = true
let bar: boolean = false
console.log(foo) // true
console.log(bar) // false
```

上面代码中声明了`foo`和`bar`两个变量，通过类型声明，将两个变量的数据类型都设置为`boolean`，并且赋值，进行编译，查看控制台，输出`true`和`false`两个值。

![boolean](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/4984628d3165584c44b25a051ef0a815-20211224175105-be82ad.png)

判断一个变量是不是布尔值，通过`typeof`进行判断。

```ts
if (typeof foo === "boolean") {
    console.log('foo is a boolean')
} else {
    console.log('foo is not a boolean')
}
// foo is a boolean
```

上面代码通过`typeof`判断`foo`变量的类型是不是等于`boolean`类型，上面代码输出`foo is a boolean`，证明所声明的变量`foo`是一个布尔值。

### 数字（number）

数字型采用`number`关键字进行声明，`TypeScript`里面所有数值都是浮点数，

```ts
let foo: number = 1 // 10进制数
let bar: number = 0x0f00 // 16进制数
let baz: number = 0b1010 // 2进制数
let num: number = 0o711 // 8进制数
console.log(foo) // 1
console.log(bar) // 3840
console.log(baz) // 10
console.log(num) // 457
```

上面代码一共有四个变量，并且每个变量都是`number`类型，其中`foo`表示10进制数，`bar`表示16进制数，`baz`表示2进制数，`num`表示8进制数，通过编译命令进行编译该代码，得到下面结果。

![number编译结果](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/e3bb0a6cd7aebbc3c8282dd16c9270a9-20211224182605-9d2ab8.png)

在上面代码中，我们将`foo`值改变，另外赋一个字符串的值给`foo`，编译失败，提示**Type 'string' is not assignable to type 'number'**，报错提示字符串类型不可装换成数值型。

```ts
foo = "1"
```

![编译失败](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/d4ef08f3856f3d42b3a2c972a2568a44-20211224182901-7cbbee.png)

### 字符串（string）

字符串是基本数据类型中的一种，表示文本数据，使用关键字`string`声明类型，使用`""`或者`''`表示字符串。

```ts
let username: string = "typescript"
console.log(username) // typescript
```

上面代码声明一个变量`username`，该变量的类型为`string`，给变量赋初值为`"typescript"`，然后编译输出为`"typescript"`。

同样的，这里也可以结合`ES6`的模板字符串，用它来定义多行文本和内嵌表达式。模板字符串**使用（` `）**表示，并且以`${expr}`嵌入表达式。

```ts
let username: string = `typescript`
let age: number = 10
let description: string = `${username}已经发展将近${age}年了`
console.log(description) // typescript已经发展将近10年了
```

上面代码声明了三个模板字符串，分别是`username`、`age`、`description`，通过模板字符串将他们构建在一起，最后编译输出`typescript已经发展将近10年了`。

![typescript](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/9015a5013cd8cca9fb22dd2342e54af2-20211224195454-223152.png)

### void类型

`JavaScript`没有空值这个概念，在`TypeScript`中，可以使用`void`表示没有任何返回值的函数。

声明一个`void`类型的变量，你就可以将它赋值为`null`和`undefined`。

```ts
function getName(username: string): void {
    console.log("my name is " + username)
}

let username: string = "typescript"
getName(username)
```

上面代码中，编写了一个`getName`函数，并且函数设置有参数`username`为`string`，并且将该返回值设置为`void`，通过传参给该函数，最后输出`my name is typescript`。

### Null和undefined

在`TypeScript`中，可以使用`null`或者`undefined`来定义这两个原始的数据类型,和`void`相似，它们的本身的类型用处不是很大。

下面定义两个变量，分别表示`null`和`undefined`

```ts
let n: null = null
let u: undefined = undefined
```

与`void`不同的是，`null`和`undefined`是所有类型的子类型，`null`和`undefined`声明的变量可以赋值给`number`类型的变量。

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个`string`或`null`或`undefined`，你可以使用联合类型**string | null | undefined**。

### 数组

`TypeScript`像`JavaScript`一样可以操作数组元素，有两种方法可以定义数组，第一种是，可以在元素后面跟上`[]`，表示由类型元素组成的数组。

```ts
let arrayNumber: number[] = [1, 2, 3]

let arrayString: string[] = ["1", "2"]
```

上面代码所声明是变量`arrayNumber`是一个类型为`number`的数组`array`，数组内部元素只能是`number`类型的，而另外一个数组`arrayString`是定义类型为`string`的数组，该数组元素只能是字符串类型。

第二种方式就是使用数组泛型，`Array<元素类型>`。

```ts
let array: Array<number> = [1, 2, 3]
console.log(array) // [ 1, 2, 3 ]
```

![Array<number>](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/3e97128ee398934219a514bd5e761f50-20211224204655-f01886.png)

### 元组Tuple

元组数据允许表示一个已知元素数量和数据类型的数组，各元素类型可以不必相同，比如，你可以定义一对键值对分别为`string`和`number`类型元组。

```ts
let array: [number, string]
array = [1, "2"]
console.log(array) // [ 1, '2' ]
```

上面代码中，声明一个元组`array`，该元组只有两个元素，并且分别是`number`和`string`，如果在赋值的时候，不按照对应的位置进行赋值，那么就会报错。比如下面的代码。

```ts
let array: [number, string]
array = [1, 2]
console.log(array) // Type 'string' is not assignable to type 'number'
```

当我们访问某个元素时，会得到正确的类型。

```ts
let array: [number, string]
array = [1, "2"]
if (typeof array[0] === "number") {
    console.log(array[0])
}

if (typeof array[1] === "string") {
    console.log(array[1])
}
```

上面代码中，通过数组索引访问数组成员，使用`typeof`类型判断函数，当**typeof array[0] === "number"**为真时，就会输出元组第一个元素`1`，当**typeof array[1] === "string"**为真时，输出第二个数组元素`'2'`。这样就做到了类型判断。

### 枚举

`enum`类型是对`JavaScript`标准数据类型的一个补充，就像`Java`等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green
```

默认情况下，从`0`开始为元素编号，当然，你也可以手动的指定成员的数值。例如将上面代码改为从`2`开始编号。

```ts
enum Color {
    Red,
    Green = 2,
    Blue
}
let c: Color = Color.Green
console.log(c) // 2
```

上面代码中，将`Green`成员指定为`2`，然后获取到该成员为`2`。

![枚举成员赋值](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/81291b305635549d2eb62b7e53f4f926-20211224213302-c775e4.png)

同时也可以给全部的成员手动赋值。

```ts
enum Color {
    Red = 1,
    Green = 2,
    Blue = 3
}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字，例如，我们都知道数值为`2`，但是不能确定它映射到Color里的哪个名字，我们就可以查到相应的名字。

```ts
enum Color {
    Red = 1,
    Green = 2,
    Blue = 3
}
let colorName: string = Color[2]
console.log(colorName) // Green
```

### 任意值（Any）

有时候，我们会想在为那些在编程阶段还不清楚类型的变量指定一个类型，这些值可能来自于动态的内容，比如来自用户输入或者第三方代码库，这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用`any`类型来标记这些变量。

```ts
let foo: any = 4
foo = "4"
foo = false
console.log(foo) // false
```

在对现有代码进行改写的时候，`Any`类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为`Object`有相似的作用，就像它在其它语言中那样。但是 `Object`类型的变量只是允许你给它赋任意值,但是却不能够在它上面调用任意的方法，即便它真的有这些方法。

```ts
let foo: any = 4;
foo.ifItExists(); // okay, ifItExists might exist at runtime
console.log(foo.toFixed()); // 4

let prettySure: Object = 4;
prettySure.toFixed(); // Property 'toFixed' does not exist on type 'Object'.
```

当你只知道一部分数据的类型时，`any`类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据。

```ts
let array: any[] = [1, "2", true]

console.log(array[2]) // true
```