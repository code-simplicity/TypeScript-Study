# 函数

## 介绍

函数是`JavaScript`应用程序的基础，它帮助你实现抽象层，模拟层，信息隐藏和模块。在`TypeScript`中，虽然已经支持了类，命名空间个模块，但是函数仍然是主要的定义*行为*的地方。`TypeScript`为`JavaScript`添加了额外的功能，让开发者可以更容易的利用。

## 函数

`TypeScritp`可以创建带有名称的函数和匿名函数，开发者可以随意选择适合应用程序的方式，不管是定义一系列`API`函数还是只使用一次函数。

```ts
// 命名函数
function add(x: number, y: number) {
    return x + y
}

// 匿名函数
let myAdd = function (x: number, y: number) { return x + y }
```

在`JavaScript`中，函数可以使用函数体外部的变量，这叫做**捕获变量**。其实这就涉及到函数作用域相关的知识。

```ts
let z = 100

function add(x: number, y: number) {
    return x + y + z
}

console.log(add(1, 2)) // 103
```

## 函数类型

### 函数定义类型

函数的返回值也可以定义类型。

```ts
function add(x: number, y: number): number {
    return x + y
}

let myAdd = function (x: number, y: number): number {
    return x + y
}
```

可以为每个函数的参数进行类型规定，然后再为函数本身添加返回值类型，`TypeScript`能够根据返回语句自动推断出返回值的类型，所以在平时开发的时候会省略它。

### 书写完整的函数类型

```ts
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}
```

函数的类型包括参数类型以及返回值类型，当开发者写出完整的类型的时候，这两部分是需要的，开发者参数列表的形式写出参数类型，为每个参数指定一个名字和类型，添加代码的可读性，当然你也可以这样写。

```ts
let myAdd: (baseValue: number, increment: number) => number = function (
x: number,
y: number
): number {
    return x + y;
};
```

只要是参数类型是匹配的，参数名称是不需要一致的（在合法范围内）。

对于函数返回值，在函数返回值类型之前使用（`=>`）符号。函数返回值类型是函数的必要部分，如果函数没有任何返回值，你也必须指定返回值类型为`void`而不是空。

函数的类型只是由参数类型和返回值类型组成的。函数中使用的捕获变量不会体现在类型上，实际上，这些变量的函数的隐藏状态并不是组成`API`的一部分。

### 推断类型

当你在赋值语句的一边指定了类型，但是另外一边却没有指定类型，`TypeScript`编译器会自动识别出类型。

```ts
let myAdd = function (x: number, y: number): number { return x + y }

let myAdd: (baseValue: number, increment: number) => number = function (x, y) {
    return x + y
}
```

这叫做**按上下文归类**，是类型推断的一种，能够帮助开发者更好的为程序指定类型。

### 可选参数和默认参数

`TypeScript`中的每一个函数参数都是必须的，这不是指不能传递`null`或`undefined`作为参数，而是说编译器检查用户是否为每个参数都传了值。编译器还会假设只有这些参数会被传递进函数。也就是说传递给一个函数的参数个数必须与函数期望的参数个数一致。

```ts
function buildName(firstName: string, lastName: string): string {
    return firstName + "-" + lastName
}

let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个

let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

let result3 = buildName("", "Bob")
console.log(result3) // -Bob

let result4 = buildName("Bob", "Adams")
console.log(result4) // Bob-Adams
```

在`JavaScript`中，每个参数是可传可不传，没有传参的时候默认`undefined`，在`TypeScript`中，开发者可以在参数旁边使用`?`实现参数的可传和可不传，比如我们想让`lastName`是可选的。

```ts
function buildName(firstName: string, lastName?: string): string {
    return firstName + "-" + lastName
}

let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个
console.log(result1) // Bob-undefined
let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

let result3 = buildName("", "Bob")
console.log(result3) // -Bob

let result4 = buildName("Bob", "Adams")
console.log(result4) // Bob-Adams
```

上面代码只有`result2`是错误的，因为它的传递给函数参数个数超过了函数的参数个数。

值得注意的是，*可选参数*必须跟在*必须参数*后面。

在`TypeScript`中，我们也可以为参数提供一个默认值，当用户没有传递这个参数或者传递的值为`undefined`时，这叫做默认初始化的参数。

将上面代码改写成带有默认参数的函数，把`lastName`默认值设置为`Smith`

```ts
function buildName(firstName: string, lastName = "Smith"): string {
    return firstName + "-" + lastName
}

let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个
console.log(result1) // Bob-Smith
let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

let result3 = buildName("", "Bob")
console.log(result3) // -Bob

let result4 = buildName("Bob", "Adams")
console.log(result4) // Bob-Adams
```

在所有必须参数后面的带默认初始化的参数都是可选的，与其他可选参数一样，在调用函数的时候可以省略，也就是说可选参数与末尾的默认参数共享数据类型。

```ts
function buildName(firstName: string, lastName?: string): string {
    // ...
}

function buildName(firstName: string, lastName = "Smith"): string {
    // ...
}
```

共享数据类型`（firstName: string, lastName?: string） => string`。默认参数的默认值消失了，只保留它是一个可选参数的信息。

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面，如果带默认值的参数出现在必须参数前面，用户必须明确传入`undefined`来换取默认值，例如，重写上面的一个代码，让`firstName`是带默认值的参数。

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + "-" + lastName
}

let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个。

let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

let result3 = buildName("Bob", "Adams")
console.log(result3) // Bob-Adams

let result4 = buildName("", "Adams")
console.log(result4) // -Adams

let result5 = buildName(undefined, "Adams")
console.log(result5) // Will-Adams
```

### 剩余参数

必要参数，默认参数和可选参数都有共同点，它们表示某一个参数，有事，你想同时操作多个参数，或者你并不知道会有多少个参数传递进来。在`JavaScript`里，你可以使用`arguments`来访问所传入的参数。

在`TypeScript`中，你可以把所有参数收集到一个变量里。

```ts
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ")
}

let result = buildName("Joseph", "Samuel", "Lucas", "MacKinzie")
console.log(result) // Joseph Samuel Lucas MacKinzie
```

剩余参数会被当做数量不限的可选参数，可以都没有，也可以是任意个，编译器创建参数数组，名字是你的`restOfName`，通过`...`拓展运算符将剩余参数依次加入了数组`restOfName`中，然后就可以在函数内部使用这个数组了。

同样`...`拓展运算符也可以在带有剩余参数的函数类型定义上使用到。

```ts
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ")
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
```

## this

如何学会在`JavaScript`中使用`this`就好比是一场成人礼，由于`TypeScript`是`JavaScript`的超集，`TypeScript`程序员也需要弄清楚`this`的工作机制以及当前`bug`存在的位置并且找出错误，很幸运，`TypeScript`能通知你错误的使用`this`的地方，这里就简单的介绍一下`this`的基本应用。

### this和箭头函数

`JavaScript`中，`this`的值在函数被调用时才会被指定，这是个既强大又灵活的特点，但是你需要花时间去弄清楚函数调用的上下文是什么，但是这不是一件很容易的事，尤其是在返回一个函数或者将函数当做参数传递的时候。

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return function () {
            let pickerCard = Math.floor(Math.random() * 52)
            let pickerSuits = Math.floor(pickerCard / 13)
            return { suit: this.suits[pickerSuits], card: pickerCard % 13 } // this" 隐式具有类型 "any"，因为它没有类型注释。
        }
    }
}

let cardPicker = deck.createCardPicker()
let pickerCard = cardPicker()

console.log("card " + pickerCard.card + " of " + pickerCard.suit)
```

上面代码中。可以看到`createCardPicker`是一个函数，并且它又返回一个函数，如果我们尝试运行这个程序，会发现直接是报错的，因为`createCardPicker`返回的函数里面`this`被设置成`window`而不是`deck`对象，因为我们只是独立调用了`cardPicker()`，而顶级的非方法会调用将`this`视为`window`。（注意在严格模式下，`this`为`undefined`而不是`window`）。

为了解决上面这个问题，我们可以在函数被返回的时候就绑定好`this`，这样无论你怎么使用它，都会引用绑定的`deck`对象，只需要将返回函数改为**箭头函数=>**，箭头函数能保存函数创建时的`this`，而不是调用之后的`this`。

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return () => {
            let pickerCard = Math.floor(Math.random() * 52)
            let pickerSuits = Math.floor(pickerCard / 13)
            return { suit: this.suits[pickerSuits], card: pickerCard % 13 }
        }
    }
}

let cardPicker = deck.createCardPicker()
let pickerCard = cardPicker()

console.log("card " + pickerCard.card + " of " + pickerCard.suit) // card 8 of diamonds
```

更好的事情是，如果你给`TypeScript`编译器设置了`--noImplicitThis`标记，它会指出`this.suits[pickerSuits]`里的`this`类型为`any`。

### this参数

上面代码中还存在问题是，`this.suits[pickerSuits]`的类型依旧为`any`，这是因为`this`来自对象字面量的函数表达式。修改的方法是，提供一个显式的`this`参数。`this`参数是个假的参数，它会出现在参数列表的最前面。

```ts
function f(this: void) {
    // ...
}
```

为上面的代码添加一些接口，`Card`和`Deck`，让类型重用能够变得清晰简单些。

```ts
interface Card {
    suit: string
    card: number
}

interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickerCard = Math.floor(Math.random() * 52)
            let pickerSuits = Math.floor(pickerCard / 13)
            return { suit: this.suits[pickerSuits], card: pickerCard % 13 }
        }
    }
}

let cardPicker = deck.createCardPicker()
let pickerCard = cardPicker()

console.log("card " + pickerCard.card + " of " + pickerCard.suit) // card 9 of clubs
```

现在`TypeScript`知道`createCardPicker`期望在某个`Deck`对象上调用，也就是`this`是`Deck`类型的，而非`any`，因此`--noImplicitThis`不会再报错了。

### this参数在回调函数里面

你也许看到过在回调函数里面`this`报错，当你将一个函数传递到某个库函数里面稍后会被调用时，当回调函数被调用时，它就会被当做一个普通函数调用，`this`将为`undefined`，稍微做点改动，就可以通过`this`参数来避免错误。首先库函数的作者要指向`this`的类型。

```ts
interface UIElement {
    addClickListener(onClick: (this: void, e: Event) => void): void
}
```

`this: void`意味着`addClickListener`期望`onclick`是一个不需要`this`类型的函数。其次，用这个注释你的调用代码。

```ts
class Handler {
    info: string
    onClickBad(this: Handler, e: Event) {
        this.info = e.message
    }
}

let h = new Handler()
uiElement.addClickListener(h.onClickBad)
```

指定了`this`类型后，你显式声明的`onClickBad`必须在`Handler`的实例上调用，然后`TypeScript`会检测到`addClickListener`要求函数带有`this: void`。改变`this`类型来修复这个错误。

```ts
class Handler {
    info: string
    onClickGood(this: Handler, e: Event) {
        console.log("clicked")
    }
}

let h = new Handler()
uiElement.addClickListener(h.onClickGood)
```

因为`onClickGood`指定了`this`类型为`void`，因此传递`addClickListener`是合法的。当然了，这也意味着不能使用 `this.info`。 如果你两者都想要，你不得不使用箭头函数了。

```ts
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```

这里可行的原因是箭头函数不会捕获`this`，所以你总是可以把它传递给期望`this: void`的函数，缺点是每个`Handler`对象都会创建一个箭头函数，另一方面，方法只会被创建一次，添加到`Handler`的原型链上，它们在不同`Handler`对象之间共享。

## 重载

`JavaScript`本身就是一个动态语言，`JavaScript`里函数根据传入不同的参数而返回不同类型的数据是很常见的。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"]

function pickCard(x: any): any {
    if (typeof x === "object") {
        let pickCard = Math.floor(Math.random() * x.length)
        return pickCard
    } else if (typeof x === "number") {
        let pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log("card " + pickedCard1.card + " of " + pickedCard1.suit) // card 10 of spades

let pickedCard2 = pickCard(15)
console.log("card " + pickedCard2.card + " of " + pickedCard2.suit) // card 2 of spades
```

`pickCard`方法根据传入参数的不同会返回两种不同的类型。如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。如果用户想抓牌，我们告诉他抓到了什么牌。但是这怎么在类型系统里表示呢。

方法是为同一个函数提供多个函数类型定义来进行函数重载。编译器会根据这个列表去处理函数的调用。 面我们来重载 `pickCard`函数。

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x: any): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit); // card: 4 of hearts

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit) // card: 2 of spades
```

这样改变后，重载的`pickCard`函数在调用的时候会进行正确的类型检查。

为了让编译器能够选择正确的检查类型，它与`JavaScript`里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。如果匹配的话就使用这个。因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function pickCard(x): any`并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用`pickCard`会产生错误。