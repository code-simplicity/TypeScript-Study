# 枚举

## 说明

使用枚举我们可以定义带名字的常量。使用枚举可以清晰地表达意图或者创建一组有区别的用例。`TypeScript`支持数字和基于字符串的枚举。

## 数字枚举

数字枚举就是一组枚举数据类型都为数字的。

```ts
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

console.log(Direction.Up) // 1
console.log(Direction.Down) // 2
console.log(Direction.Left) // 3
console.log(Direction.Right) // 4
```

上面代码中，我们定义了一个数字枚举，`Up`初始值为`1`，剩余的成员从`1`开始自动增长，也就是说，`Direction.Up`值为`1`，`Down`为`2`，`Left`为`3`，`Right`为`4`。

我们也可以不使用初始化。

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up) // 0
console.log(Direction.Down) // 1
console.log(Direction.Left) // 2
console.log(Direction.Right) // 3
```

现在`Up`的值为`0`，`Down`的值为`1`，依次自增，当我们不在乎成员值的时候，这种自增长的行为是很有用处的，但是要注意每个枚举成员的值都是不同的。

使用枚举很简单，通过枚举的属性来访问成员和枚举的名字来访问枚举类型。

```ts
enum Response {
    No = 0,
    Yes = 1
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```

数字枚举可以被混到**计算过的和常量成员**。简单的说，不带初始化的枚举或者被放到第一的位置，或者被放到使用了数字常量或其他常量初始化了的枚举后面。换句话说，下面的情况是不允许的。

```ts
enum E {
    A = getSomeValue(),
    B //  枚举成员必须具有初始化表达式
}

let x = 10

function getSomeValue(): number {
    return x
}
```

## 字符串枚举

字符串枚举的概念是很简单的，但是是有细微的**运行时的差别**，在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

console.log(Direction.Up) // UP
console.log(Direction.Down) // DOWN
console.log(Direction.Left) // LEFT
console.log(Direction.Right) // RIGHT
```

由于字符串枚举没有自增的行为，字符串枚举可以很好的序列化，换句话说，如果你正在调试并且必须要读一个数字枚举运行时的值的时候，这个值通常是很难读的，它并不能表达出有用的信息（尽管**反向映射**会帮助），字符串枚举允许提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

## 异构枚举

从技术的角度来说，枚举可以混合字符串和数字成员，都是似乎你并不会这么做。

```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES"
}
```

## 计算的和常量成员

每个枚举成员都带有一个值，它可以是`常量`或者`计算出来的`，当满足如下条件时，枚举成员被当做是常量。

- 它的枚举的第一个成员且没有初始化器，这种情况下被赋予值`0`。
  
   ```ts
    enum E {
        x
    }
  ```

- 它不带有初始化器且它之前的枚举成员是一个数字常量，这种情况下，当前枚举成员的值为它上一个枚举成员的值加`1`。
  
  ```ts
    enum E1 {
        X,
        Y,
        Z
    }

    enum E2 {
        A = 1,
        B,
        C
    }
  ```

- 枚举成员使用`常量枚举表达式`初始化。`常量枚举表达式`是`TypeScript`表达式的子集，它可以在编译阶段求值，当一个表达式满足下面条件之一时，它就是一个`常量枚举表达式`。

  - 一个枚举表达式字面量（主要是字符串字面量和数字字面量）。
  - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）。
  - 带括号的常量枚举表达式。
  - 一元运算符`+`，`-`，`~`其中之一应用在了常量枚举表达式。
  - 常量枚举表达式做为二元运算符`+`，`-`，`*`，`/`，`%`，`<<`，`>>`，`>>>`，`&`，`|`，`^`的操作对象。若常数枚举表达式求值后为`NaN`或者`Infinity`，则会在编译阶段报错。

所有其他情况的枚举成员被当作是需要计算得出的值。

```ts
enum FileAccess {
    None,
    Read,
    Write,
    ReadWrite = Read | Write,
    G = "123".length
}
```

## 联合枚举与枚举成员的类型

存在一种特殊的非计算的常量成员的子集，字面量枚举成员，字面量枚举成员是指不带有初始值的常量枚举成员或者是值被初始化为：

- 任何字符串字面量（例如: `"foo"`， `"bar"`，`baz`）。
- 任何数字字面量（例如：`1`，`100`）。
- 应用了一元 `-`符合的数字字面量（例如：`-1`，`-100`）。

当所有枚举成员都拥有字面量枚举时，它就带有了一种特殊的语义。

首先，枚举成员成为了类型，例如，我们可以说某些成员`只能`是枚举成员的值。

```ts
enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle
    radius: number
}

interface Square {
    kind: ShapeKind.Square
    sideLength: number
}

let c: Circle = {
    kind: ShapeKind.Square, // Error 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”
    radius: 100
}
```

另外一个变化就是枚举类型本身变成了每一个枚举的成员的`联合`。通过`联合枚举`，类型系统能够利用这样一个事实，它可以知道枚举里的值的集合，因此，`TypeScript`能够捕获在比较值的时候犯的错误，例如。

```ts
enum E {
    Foo,
    Bar
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) { // 此条件将始终返回 "true"，因为类型 "E.Foo" 和 "E.Bar" 没有重叠。
        // ...
    }
}
```

上面代码中，我们首先检查`x`，是否不是`E.Foo`，如果通过了这个检查，然后`||`就会发生短路的情况，`if`语句里的内容就会被执行，然而，这个检查没有通过，那么`x`则只能为`E.Foo`，因此没有理由再去检查`E.Bar`。

## 运行时的枚举

枚举是在运行时真正存在的对象，例如下面的枚举。

```ts
enum E {
    X, Y, Z
}

function f(obj: { X: number }) {
    return obj.X // 0
}

console.log(f(E))
```

### 反向映射

除了创建一个以属性名作为对象成员的对象之外，数字枚举成员还具有`反向映射`，从枚举值到枚举名称，例如下面的例子。

```ts
enum Enum {
    A
}

let a = Enum.A
let nameOfA = Enum[a]
console.log(nameOfA) // A
```

下面代码是上面代码生成的`JavaScript`代码。

```js
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a];
console.log(nameOfA); // A
```

生成的代码中，枚举类型被编译成一个对象，它包含了正向映射（`name` => `value`）和反向映射（`value` => `name`）。引用枚举类型成员总会生成对属性访问并且永远也不会内联的代码。

要注意的是，不会为字符串成员生成反向映射。

## const枚举

大多数情况下，枚举是十分有效的解决方案，然而某些情况下需求很严格，为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用`const`枚举，常量枚举通过在枚举上使用`const`修饰符来定义。

```ts
const enum Enum {
    A = 1,
    B = A * 2
}
```

常量枚举只能使用常量枚举的表达式，并且不同于常规的枚举，它在编译阶段会被删除，常量枚举成员在使用的地方会被内联进来。之所以可以这么做是因为常量枚举不允许包含计算成员。

```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right,]
console.log(directions) // [0, 1, 2, 3]
```

执行运行的结果是`[0, 1, 2, 3]`。

## 外部枚举

外部枚举是用来描述已经存在的枚举类型和状态。

```ts
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```

外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。