# 接口

## 介绍

`TypeScript`核心原则之一是对值所具有的结构进行类型检查，它有时被称为**填鸭式辨型法**或**结构性子类型化**。在`TypeScript`里，接口的作用就是为了这些类型命名和为你的代码或者第三方代码进行契约。

## 初识接口

通过下面的代码，初步了解接口是如何工作的。

```ts
function sum(num: { a: number, b: number }) {
    console.log(num.a + num.b)
}
let num = {
    a: 1,
    b: 2
}
sum(num) // 3
```

上面代码中，类型检查器会查看`sum()`函数的调用，`sum()`函数有一个参数，参数类型是一个`Object`，都是`number`类型的，在对该函数进行传参的时候，编译器会对参数类型进行检查，确保传入的参数类型是匹配的，如果类型不匹配，那么就会编译失败。

接下来使用接口进行描述上诉代码。

```ts
interface interNum {
    a: number,
    b: number
}
function sum(num: interNum) {
    console.log(num.a + num.b)
}
let num = {
    a: 1,
    b: 2
}
sum(num) // 3
```

上面代码使用`interface`关键字描述了一个参数的具体类型，`interNum`就是这个具体类型，表示的是两个参数`a`和`b`的具体类型的一个对象，只要是传入的对象参数满足这个例子，那么这就是能被正常编译的。

类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

## 可选属性

接口中的属性不都是全需要的，有些是在某些条件下存在或者根本不存在，可选属性在应用`option bags`模式中很常用，也就是给函数传入的参数对象只有部分属性赋值了。

下面是一个`option bags`模式的例子。

```ts
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "whitw", area: 100 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({ color: "black" })
console.log(mySquare)
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加了一个`?`的符合。

可选属性的好处之一就是可以·对·可能存在的属性进行预定义，第二个好处就是可以捕获引用了不存在的属性的时候发生的错误，就比如将`createSquare`里面的`color`属性名拼错，就会出现一个提示错误。

```ts
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "whitw", area: 100 }
    if (config.clor) {
        // Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({ color: "black" })
console.log(mySquare)
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值，你可以使用`readonly`在属性名前指定只读属性。

```ts
interface Point {
    readonly x: number,
    readonly y: number
}
```

你可以通过赋值一个对象字面量来构造一个`Point`。赋值后，`x`和`y`再也不会发生改变。

```ts
interface Point {
    readonly x: number,
    readonly y: number
}

let p1: Point = { x: 10, y: 5 }
p1.x = 10 // Cannot assign to 'x' because it is a read-only property
```

`TypeScript`具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建之后再也不被修改。

```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // Index signature in type 'readonly number[]' only permits reading
ro.push(5) // Property 'push' does not exist on type 'readonly number[]'
ro.length = 100 // Cannot assign to 'length' because it is a read-only property
a = ro // The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
```

上面代码中，声明了一个数据类型为`number`的数组`a`并且成功赋值，定义一个只读的数组`ReadonlyArray<T>`，并且将数组`a`赋值给`ro`，这个时候声明的`ro`数组就是一个只能读的数组，对于以上的相关操作，都会报错。

```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
a = ro as number[]
console.log(a) // [ 1, 2, 3, 4 ]
```

### readonly 对比 const

在平常开发是该使用`readonly`还是`const`，是把他看做一个变量还是一个属性，作为变量使用的话使用`const`，若作为属性则使用`readonly`。

## 额外的属性检查

我们在第一个例子里使用了接口，`TypeScript`让我们传入`{a: number, b: number}`到仅期望得到 `{ label: number; }` 的函数里, 并且我们已经学过了可选属性。

然而，如果你想将两者结合在的话就会像`JavaScritp`里面那样就会出现很多问题。就比如，拿`createSquare`举例子来说。

```ts
interface SquareConfig {
    color?: string,
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "whitw", area: 100 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({ colour: "red", width: 100 })
console.log(mySquare) // Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.       
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
```

注意传入 `createSquare` 的参数拼写为 `colour` 而不是 `color`。 在 JavaScript 里，这会默默地失败。

你可能会争辩这个程序已经正确地类型化了，因为 `width` 属性是兼容的，不存在 `color` 属性，而且额外的 `colour` 属性是无意义的。

然而，TypeScript 会认为这段代码可能存在 bug。 对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

那么如何绕开这个问题呢，最简单的方法就是类型断言。

```ts
let mySquare = createSquare({ colour: "red", opacity: 0.5 } as SquareConfig)
console.log(mySquare) // { color: 'whitw', area: 100 }
```

使用类型断言进行修改，就可以得到正确的结果。

最佳的方式就是添加一个字符串索引签名，前提是你能确定这个对象可能具有某些作为特殊用途的额外属性，如果 `SquareConfig` 带有上面定义的类型的 `color` 和 `width` 属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它。

```ts
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any
}
```

我们稍后会讲到索引签名，但在这我们要表示的是`SquareConfig` 可以有任意数量的属性，并且只要它们不是 `color` 和 `width`，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 `squareOptions` 不会经过额外属性检查，所以编译器不会报错。

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "whitw", area: 100 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)
console.log(mySquare) // { color: 'whitw', area: 10000 }
```

要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大多数额外属性检查错误是真正的bug。也就是说你遇到了额外类型检查出的错误，你应该去审查一下你的类型声明。在这里，如果支持传入 `color` 或 `colour` 属性到 `createSquare`，你应该修改 `SquareConfig` 定义来体现出这一点。

## 函数类型

接口能够描述`JavaScript`中对象拥有的各种各样的外形，除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使接口描述函数类型，我们需要给接口定义一个调用签名，他就像是一个只有参数列表和返回值的函数类型的定义，参数列表里面的参数都需要名字和类型。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean
}
```

定义这样的变量之后，我们可以像其他接口一样使用这个函数的接口。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString)
    return result > -1
}
```

上面代码展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

对于函数的类型检查来说，函数的参数名不需要与接口定义的名字相匹配，比如使用下面代码重写上面的例子。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function (src: string, sub: string): boolean {
    let result = src.search(sub)
    return result > -1
}
```

函数的参数会逐个进行检查，要求对应位置上的参数是兼容的，如果你不想指定类型，`TypeScript`的类型系统会推断出参数类型，因为函数直接赋值给了`SearchFunc`类型变量。函数的返回值类型是通过其返回值推断出来的（此例是`false`和`true`），如果让这个函数返回数字或者字符串，类型检查器就会警告函数的返回值与`SearchFunc`接口中的定义不匹配。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function (src, sub) {
    let result = src.search(sub)
    return result > -1
}
```

### 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够通过**索引**得到的类型，比如`a[10]`或者`ageMap["daniel"]`。可索引类型具有一个`索引签名`，它描述了对象的索引类型，还有相应的索引返回值类型。

```ts
interface StringArray {
    [index: number]: string
}
let myArray: StringArray
myArray = ["red", "whitw"]
let myStr: string = myArray[0]
console.log(myStr) // red
```

上面代码中，定义了一个`StringArray`的接口，它具有索引签名，这个类型表示了当前`number`去索引`StringArray`时会得到`string`类型的返回值。

`TypeScript`支持两种索引签名：**字符串和数字**，可以同时使用两种类型的索引，都是数字索引的返回值必须是字符串索引返回值类型的子类型。这是因为当时使用`number`来做索引时，`JavaScript`会将它转换成`string`然后再去索引对象，也就是说用`100`（一个`number`的值）去索引等同于使用`"100"`（一个`string`）去索引，因此晾着需要保持一致。

```ts
class Animal {
    name: string = ""
}
class Dog extends Animal {
    breed: string = "xh"
}
interface NotOkay {
    [x: number]: Animal // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'
    [x: string]: Dog
}
```

字符串索引签名能够很好的描述`dictionary`模式，并且它们也会确保所有属性与其返回值类型相匹配。因此字符串索引声明了`obj.property`和`obj["property"]`两种形式都可以，下面的例子里，`name`的类型与字符串类型索引不匹配，所以类型检查器会给出一个错误提示。

```ts
interface NumberDictionary {
    [index: string]: number
    length: number
    name: string // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

最后你可以将索引签名设置为只读，这样就能防止给索引赋值了。

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"]
myArray[2] = "Mallory" // Index signature in type 'ReadonlyStringArray' only permits reading
```

上面代码出错原因就是因为设置的索引只可读，不能进行其他操作。

### 类类型

#### 实现接口

与`C#`和`Java`中的接口基本作用一样，`TypeScript`也能够用它来明确的强制一个类去符合某种契约。

```ts
interface ClockInterface {
    currentTime: Date
}

class clock implements ClockInterface {
    currentTime: Date
    constructor(h: number, m: number) {
    }
}
```

使用关键字`implements`，可以让接口去实现某些功能从而实现接口的功能。

也可以在接口中描述一个方法，在这个类里面实现它，就比如下面的`setTime`方法一样。

```ts
interface ClockInterface {
    currentTime: Date
    setTime(d: Date): void
}

class clock implements ClockInterface {
    currentTime: Date
    setTime(d: Date) {
        this.currentTime = d
    }
    constructor(h: number, m: number) {
    }
}
```

接口描述了类的公共部分，而不是公共和私有两部分，它不会帮你检查类是否具有某些私有成员。

#### 类静态部分和实例部分的区别

当你操作类和接口的时候，你需要明白类是具有两个类型的，静态部分的类型和实例的类型，当你用构造器去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误。

```ts
interface ClockConstructor {
    new(hour: number, minute: number)
}
class Clock implements ClockConstructor {
    currentTime: Date
    constructor(h: number, m: number)
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。`constructor`存在于类的静态部分，所以不再检查范围内。

因此我们直接操作类的静态部分，但下面的例子，定义了两个接口，`ClockConstructor`为构造函数所用和`ClockInterface`为实例方法所用。为了方便我们定义一个构造函数`createClock`，它用传入的类型创建实例。

```ts
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface
}
interface ClockInterface {
    tick(): void
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep")
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock")
    }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 31)
console.log(digital) // DigitalClock {}
console.log(analog) // AnalogClock {}
```

因为`createClock`的第一个参数是`ClockConstructor`类型，在`createClock(AnalogClock, 7, 31)`中，会检查`AnalogClock`是否符合构造函数签名。

### 继承接口

和类一样，接口也可以相互继承，这使得能够从一个接口里复制一个成员到另外一个接口里，可以灵活的将接口分割到可重用的模块里。

```ts
interface Shape {
    color: string
}

interface Square extends Shape {
    sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10
console.log(square) // { color: 'blue', sideLength: 10 }
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape, PenStroke {
    sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.penWidth = 0.5
square.sideLength = 10
console.log(square) // { color: 'blue', penWidth: 0.5, sideLength: 10 }
```

### 混合类型

接口能够描述`JavaScript`里丰富的类型，因为`JavaScript`其动态灵活的特点，有时会希望一个对象可以同时具有上面提到的多种类型。下面这个例子进行说明。

```ts
interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { }
    counter.interval = 123
    counter.reset = function () { }
    return counter
}

let c = getCounter()
console.log(c(10)) // undefined
console.log(c.reset()) // undefined
console.log(c.interval = 0.5) // 0.5
```

在使用`JavaScript`第三方库的时候，你可能需要像上面那样去完整的定义类型。

### 接口继承类

当一个接口继承一个类类型时，它会继承类的成员但不包括其实现，就好像接口声明了所有类中存在的成员，但是没有提供具体实现一样，接口同样会继承到类的`private`和`protected`成员，这就意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口只能被这个类或者子类实现。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。这个子类除了继承至基类外与基类没有任何关系。

```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```

在上面的代码中，`SelectableControl`包含了`Control`的所有成员，包括私有成员`state`。因为`state`是私有成员，所以只能够是`Control`的子类们才能实现`SelectableControl`接口。因为只有`Control`的子类才能够拥有一个声明于`Control`的私有成员`state`，这对私有成员的兼容性是必需的。

在`Control`类内部，是允许通过`SelectableControl`的实例来访问私有成员`state`的。实际上，`SelectableControl`接口和拥有`select`方法的`Control`类是一样的。`Button`和`TextBox`类是`SelectableControl`的子类（因为它们都继承自`Control`并有`select`方法），但`Image`和`Location`类并不是这样的。
