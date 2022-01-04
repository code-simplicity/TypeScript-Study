# 类型兼容性

## 介绍

`TypeScript`里的类型兼容性是基于结构子类型的，结构类型是一种只使用其成员来描述类型的方式。它正好与名义类型形成对比。（译者注：在基于名义类型的类型系统中，数据类型的兼容性或者等价性是通过明确的声明/或类型的名称来决定的，这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确声明。），看下面的例子。

```ts
interface Named {
    name: string
}

class Person {
    name: string = "ts"
}

let p: Named

p = new Person()
```

在使用基于名义类型的语言，比如`C#`和`Java`中，这段代码就会报错，因为`Person`类没有明确说明其实现了`Named`接口。

`TypeScript`的结构性子类型是根据`JavaScript`代码的典型写法来设计的，因为`JavaScript`里广泛地使用匿名对象。例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。

### 关于可靠性的注意事项

`TypeScript`的类型系统允许某些在编译阶段无法确认其安全性的操作。当一个类型系统具有此属性时，会被当做**不可靠**的，`TypeScript`允许这种不可靠的行为发生是经过仔细考虑的。下面通过一些介绍，会解释什么时候会发生这种情况和其有利的一面。

## 开始

`TypeScript`结构化类型系统的最基本原则是：如果`x`要兼容`y`，那么`y`至少具有与`x`相同的属性，比如。

```ts
interface Named {
    name: string
}

let x: Named

let y = { name: "Alice", location: "Seattle" }
x = y
```

这里要检查`y`是否能赋值给`x`，编译器检查`x`中的每个属性，看能否在`y`中也能找到对应的属性，这上面代码中，`y`必须包含名字是`name`的`string`类型成员，`y`满足条件，因此赋值正确。

检查函数参数时也同时使用该规则。

```ts
interface Named {
    name: string
}

let y = { name: "Alice", location: "Seattle" }

function greet(n: Named) {
    console.log("Hello, " + n.name)
}

greet(y) // Hello Alice
```

注意`y`有个额外的属性`location`，都这并不会引起错误，只是目标类型（这里是`Named`）的成员会被一一检查是否兼容。

这个比较过程是递归进行的，检查每个成员及其子成员。

## 比较两个函数

相对来讲，在比较原始数据类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是否兼容，下面我们从两个简单的函数入手，它们仅是参数列表略有不同。

```ts
let x = (a: number) => 0
let y = (b: number, s: string) => 0
y = x // OK
x = y // 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”
```

要查看`x`是否能赋值给y，首先看它们的参数列表。`x`的每个参数必须能在`y`里找到对应类型的参数。注意的是参数的名字相同与否无所谓，只看它们的类型。这里，`x`的每个参数在`y`中都能找到对应的参数，所以允许赋值。

第二个赋值错误，因为`y`有个必需的第二个参数，但是`x`并没有，所以不允许赋值。

你可能会疑惑为什么允许忽略参数，像例子`y = x`中那样。原因是忽略额外的参数在`JavaScript`里是很常见的。 例如，`Array#forEach`给回调函数传3个参数：数组元素，索引和整个数组。尽管如此，传入一个只使用第一个参数的回调函数也是很有用的。

```ts
let items = [1, 2, 3]
items.forEach((item, index, array) => {
    console.log(item)
})

items.forEach(item => {
    console.log(item)
})
```

下面来看看如何处理返回值的类型，创建两个仅是返回值类型不同的函数。

```ts
let x = () => ({ name: "Alice" })
let y = () => ({ name: "Alice", location: "Seattle" })

x = y // Ok
y = x // Error 不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。
```

类型系统强制原函数的返回值类型必须是目标函数返回值类型的子函数。

## 函数参数双向协变

当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来目标函数能够赋值给源函数才能成功，这是不稳定的，因为调用者可以传入2一些具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息，实际上，这极少会发生错误，并且能够实现很多`JavaScript`里的常见模式。例如。

```ts
enum EventType {
    Mouse,
    Keyboard
}

interface Event {
    timestamp: number
}
interface MouseEvent extends Event {
    x: number
    y: number
}
interface KeyEvent extends Event {
    keyCode: number
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    // 
}

listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y)) // 类型“(e: MouseEvent) => void”的参数不能赋给类型“(n: Event) => void”的参数。
// 参数“e”和“n” 的类型不兼容。

listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));

listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

listenEvent(EventType.Mouse, (e: number) => console.log(e)); // 类型“(e: number) => void”的参数不能赋给类型“(n: Event) => void”的参数。
// 参数“e”和“n” 的类型不兼容。
```

## 可选参数以及剩余参数

比较函数兼容性的时候，可选参数与必须参数是可以互换的，源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里面没有对应的参数也不是错误。

当一个函数有剩余参数的时候，它被当做无限个可选参数。

这对于类型系统来说是不稳定的，但是从运行的角度来看，可选参数一般来说是不强制的，因为对于其他大多数函数来说相当于传递了一些`undefined`。

下面有一个很好的例子，常见的函数接收一个回调函数并用于对程序员来说是可预知的参数但对类型系统来说是不确定的参数来调用。

```ts
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    // 
}

invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));
```

### 函数重载

对于有重载的函数，源函数的每个重载都要在目标上找到对应的函数签名，这确保了目标函数可以在所有源函数可调用的地方调用。

## 枚举

枚举类型与数字类型相互兼容，不同枚举类型之间是不兼容的，比如。

```ts
enum Status {
    Ready,
    Waiting
}

enum Color {
    Rea,
    Blue,
    Green
}

let status = Status.Ready
status = Color.Green // 不能将类型“Color”分配给类型“string”。
```

## 类

类与对象字面量和接口差不多，都是有一点不同的是，类有静态部分和实例部分的类型，比较两个类类型的对象时，只有实例的成员会被比较，状态成员和构造函数不在比较范围之内。

```ts
class Animal {
    feet: number
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number
    constructor(numFeet: number) {

    }
}

let a: Animal
let s: Size

a = s // OK
s = a // OK
```

### 类的私有成员和受保护成员

类的私有成员和受保护成员会影响兼容性，当检查类实例的兼容性时，如果目标类型包含一个私有成员，那么源类型必须来自同一个类的这个私有成员。同样地，这条规则也适用于包含受保护成员的类型检查。这允许子类赋值给父类，但是不予许赋值给其他有同样类型的类。

## 泛型

因为`TypeScript`是结构性的类型系统，类型参数只影响使用其作为类型的一部分的结果类型。比如。

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```

上面代码里，`x`和`y`是兼容的，因为它们的结构使用类型参数时并没有什么不同。把这个例子改变一下，增加一个成员，就能看出是如何工作的了。

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, 不能将类型“NotEmpty<string>”分配给类型“NotEmpty<number>”
```

在这里，泛型类型在使用时就好比不是一个泛型类型。

对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。然后用结果类型进行比较，就像上面第一个例子。

```ts
let identity = function <T>(x: T): T {
    // ...
}

let reverse = function <U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
```

## 高级主题

### 子类型与赋值

目前为止，我们使用了“兼容性”，它在语言规范里没有定义。 在`TypeScript`里，有两种兼容性：子类型和赋值。它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和`any`来回赋值，以及`enum`和对应数字值之间的来回赋值。

语言里的不同地方分别使用了它们之中的机制。实际上，类型兼容性是由赋值兼容性来控制的，即使在`implements`和`extends`语句也不例外。