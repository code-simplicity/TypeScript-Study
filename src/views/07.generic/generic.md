# 泛型

## 介绍

软件工程中，我们不仅要创建一致的良好的`API`，同时也要考虑到可重用性，组件不仅能支持当前的数据类型，也能支持未来的数据类型，这是在创建大型系统时为你提供了非常灵活的功能。

像`C#`和`Java`这样语言中，可以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据，这样用户就可以以自己的数据类型来使用组件。

## 泛型之Hello World

下面来创建第一个使用泛型的例子，`identity`函数，这个函数会往返回值传入它的值，你可以把这个函数当成是`echo`命令。

不使用泛型的话，这个函数可能是下面这个样子。

```ts
function identity(arg: number): number {
    return arg
}
```

或者使用`any`类型来定义函数。

```ts
function identity(arg: any): any {
    return arg
}
```

使用`any`类型会导致这个函数可以接受任何类型的`arg`参数，这样就会丢失一些信息，传入的类型与返回值的类型应该相同，如果传入一个数字，我们只知道任何类型的值都有可能被返回。

因此我们需要一种方法使得返回值的类型与传入参数的类型是相同的，这里我们使用了`类型变量`，它是一种特殊的变量，只用于表示类型而不是值。

```ts
function identity<T>(arg: T): T {
    return arg
}
```

上面代码中我们给`identity`添加了类型变量`T`，`T`帮助我们捕获传入的数据类型（比如：`number`），之后我们就可以使用这个类型，之后我们再使用`T`作为返回值类型，现在我们可以知道参数类型与返回值类型是相同的，这允许我们跟踪函数里面使用的类型的信息。

我们把上面代码定义的`identity`函数叫做泛型，因为它可以适用多个类型，不同于使用`any`，它不会丢失信息，像第一个例子那样保持准确性，传入数值类型并且返回数值类型。

当定义好泛型函数后，可以用两种方法使用，第一种是，传入所有参数，包含类型参数。

```ts
function identity<T>(arg: T): T {
    return arg
}

let output = identity<string>("myString")
console.log(output) // myString
```

这里我们明确指定了`T`的类型为`string`，并作为一个参数传递给函数，使用了`<>`而不是`()`。

第二种方法是利用*类型推断*，即编译器会根据传入的参数类型自动帮忙确定`T`的类型。

```ts
function identity<T>(arg: T): T {
    return arg
}

let output = identity("myString")
console.log(output) // myString
```

注意我们没必要使用尖括号`（<>）`来明确地传入类型；编译器可以查看`myString`的值，然后把T设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入`T`的类型，在一些复杂的情况下，这是可能出现的。

## 使用泛型变量

使用泛型创建像`identity`这样的泛型函数时，编译器要求在函数体必须正确的使用这个通用的类型，换句话说，你必须把这些参数当做是任意或者所有类型。

看一下之前的`identity`的例子。

```ts
function identity<T>(arg: T): T {
    return arg
}
```

如果我们想同时打印出`arg`的长度，我们很可能这样做。

```ts
function identity<T>(arg: T): T {
    console.log(arg.length) // error 类型“T”上不存在属性“length”
    return arg
}
```

会出现这样的报错，类型“T”上不存在属性“length”。因为没有地方指明`arg`具有这个属性，记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能会传入一个数字，而数字是没有`.length`属性的。

现在假设我们想操作`T[]`类型的数组而不是直接操作`T`，由于我们操作的是数组，所以`.length`属性应该是存在的，我们可以像创建其他数组一样创建这个数组。

```ts
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
```

你可以这样理解`loggingIdentity`的类型：泛型函数`loggingIdentity`，接收类型参数T和参数`arg`，它是个元素类型是`T`的数组，并返回元素类型是`T`的数组。如果我们传入数字数组，将返回一个数字数组，因为此时`T`的的类型为`number`。这可以让我们把泛型变量`T`当做类型的一部分使用，而不是整个类型，增加了灵活性。

我们也可以这样实现上面的例子。

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length)
    return arg
}
```

## 泛型类型

上面代码中，我们创建了`identity`通用函数，可以适用于不同的类型。接下来，我们研究一下函数本身的类型，以及如何创建泛型接口。

泛型函数的类型与非泛型函数的类型没有什么不听，只是有一个类型参数放在前面，就像函数声明一样。

```ts
function identity<T>(arg: T): T {
    return arg
}

let myIdentity: <T>(arg: T) => T = identity
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应就可以。

```ts
function identity<T>(arg: T): T {
    return arg
}

let myIdentity: <U>(arg: U) => U = identity
```

我们还可以使用带有调用签名的对象字面量来定义泛型函数。

```ts
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;
```

我们将上面代码的对象字面量拿出来作为一个接口。

```ts
interface CenericIdentityFn {
    <T>(arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: CenericIdentityFn = identity
```

一个相似的例子，我们可以把泛型参数当做一个整个接口的一个参数，这样我们就能够很清楚的知道使用的具体是哪一个泛型类型（比如：`Dictionary<string>`而不只是`Dictionary`）。这样接口里面的成员也都知道这个参数的类型了。

```ts
interface CenericIdentityFn<T> {
    (arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: CenericIdentityFn<number> = identity
```

注意，我们的示例做了少许改动。不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。当我们使用 `GenericIdentityFn`的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

除了泛型接口，我们还可以创建泛型类 注意，无法创建泛型枚举和泛型命名空间。

## 泛型类

泛型类看上去与泛型接口差不多，泛型类使用（`<>`）括号括起泛型类型，跟在类型后面。

```ts
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
    return x + y
}
```

`GenericNumber`类的使用是十分直观的，并且你可能已经注意到了，没有去限制它只能使用`number`类型。也可以使用字符串或其它更复杂的类型。

```ts
class GenericNumber<T> {
    zeroValue: T
    add: ((x: T, y: T) => T)
}

let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ""
stringNumeric.add = function (x, y) { return x + y; }

console.log(stringNumeric.add(stringNumeric.zeroValue, "test")) // test
```

与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

## 泛型约束

你应该会记得之前的一个例子，我们有时候想操作某类型的一组值，并且我们知道这组值具有什么样的属性。在 `loggingIdentity`例子中，我们想访问`arg`的`length`属性，但是编译器并不能证明每种类型都有`length`属性，所以就报错了。

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: 类型“T”上不存在属性“length”
    return arg;
}
```

相比于操作`any`所有类型，我们想要限制函数去处理任意带有`.length`属性的所有类型。只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。为此，我们需要列出对于`T`的约束要求。

为此，我们定义一个接口来描述约束条件。创建一个包含`.length`属性的接口，使用这个接口和`extends`关键字来实现约束。

```ts
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length) // OK
    return arg
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型。

```ts
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
loggingIdentity(3) // 类型“number”的参数不能赋给类型“Lengthwise”的参数
```

我们需要传入符合约束类型的值，必须包含必须的属性。

```ts
loggingIdentity({ length: 10, value: 3 }) // 10
```

### 在泛型约束中使用参数类型

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。并且我们想要确保这个属性存在于对象obj上，因此我们需要在这两个类型之间使用约束。

```ts
function getProperty(obj: T, key: K) {
    return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }
getProperty(x, "a") // 1
getProperty(x, "m") // error
```

### 在泛型里使用类类型

在`TypeScript`使用泛型创建工厂函数时，需要引用构造函数的类类型。比如。

```ts
function create<T>(c: { new(): T; }): T {
    return new c();
}
```

一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

```ts
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```