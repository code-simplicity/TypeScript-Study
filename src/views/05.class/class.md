# 类

## 介绍

传统的`JavaScript`程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象的程序员来说就有一些棘手，因为他们用的是基于类的继承且对象是由类构建出来的，从`ES6`开始，`JavaScript`程序员能够使用基于类的面向对象的方式，使用`TypeScript`，可以允许开发者发现这些新特性，并且编译后的`JavaScript`可以在所有主流的浏览器和平台运行，而不需要等到下一个`JavaScript`版本。

## 类的应用

下面的代码是使用类的一个例子。

```ts
class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "hello, " + this.greeting
    }
}

let greeter = new Greeter("world")
console.log(greeter.greet()) // hello, world
```

![hello, world](http://image.romance-to-death.top/img/images/Roaming/picgo/2022/01/02/837bafa31a1fe4cf8d848891e1f312fc-20220102092145-1377bc.png)

上面代码中声明来一个`Greeter`类，有一个`greeting`属性，有一个`constructor`构造函数和`greet`方法。

在上面代码中，在使用任何一个类成员的时候都使用到了`this`关键字，它表示我们访问的是类的成员。

在倒数第二行，使用`new`构造了类`Greeter`的实例，它可以调用类中定义的构造函数，创建一个`Greeter`类型的新对象，并执行构造函数初始化它。

### 继承

在`TypeScript`中，可以使用常用的面向对象模式，基于类的程序设计中一种最基本的模式是允许使用继承来拓展现在的类。

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`)
    }
}

class Dog extends Animal {
    bark() {
        console.log("Wo! Wo!")
    }
}

const dog = new Dog()
dog.bark() // Wo! Wo!
dog.move(10) // Animal moved 10m.
dog.move() // Animal moved 0m.
```

![继承](http://image.romance-to-death.top/img/images/Roaming/picgo/2022/01/02/1167cc9f785551c12d4a209af8464d15-20220102093635-2528c3.png)

上面代码展示了最基本的继承，类从基类中继承了属性和方法，这里`Dog`是一个派生类，它派生自`Animal`基类，通过`extends`关键字实现继承，派生类通常被称为**子类**，基类通常被称为**超类**。

因为`Dog`继承了`Animal`的功能，因此创建一个`Dog`的实例对象就能够实现`bark()`和`move()`方法。

```ts
class Animal {
    name: string
    constructor(theName: string) {
        this.name = theName
    }
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`)
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...")
        super.move(distanceInMeters)
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...")
        super.move(distanceInMeters)
    }
}

let sam = new Snake("Sammy the Java")
let tom: Animal = new Horse("Tommy the Palomino")

sam.move()
/* 
Slithering...
Animal moved 5m.
*/
tom.move(34)
/* 
Galloping...
Animal moved 34m.
*/
```

![复杂的继承](http://image.romance-to-death.top/img/images/Roaming/picgo/2022/01/02/3330a2d09d9da1c61870da3b2cd6116a-20220102094659-a61ae3.png)

上面代码中，使用`extends`关键字派生了`Animal`的子类`Snake`和`Horse`，与上一个代码不同的是，派生类包含了一个构造函数，它必须调用`super()`，它会执行基类的构造函数，并且在构造函数访问`this`的属性之前，我们一定要调用`super()`，这是`TypeScript`强制执行的一条重要原则。

上面代码演示了如何在子类中重写父类的方法。`Snake`和`Horse`类都创建了`move()`方法，都重写了来自于`Animal`继承而来的`move`方法，使得`move()`方法根据不同的类而具有不同的功能，即使`tom`被声明`Animal`类型，都是它的值都是`Horse`，调用`tom.move(34)`时，它会调用`Horse`里面重写的方法。

### 公共，私有与受保护的修饰符

#### public

在上面的例子中，可以自由的访问到程序里面定义的成员，在`TypeScript`中，成员都是默认`public`的，你也可以明确的将一个成员标记为`public`，下面是重写`Animal`类的例子。

```ts
class Animal {
    public name: string
    public constructor(theName: string) {
        this.name = theName
    }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
}
```

上面代码中的`Animal`类中的属性以及方法和构造器都是公共的（`public`）。

#### 私有private

当成员被标记为`private`时，它就不能在声明它类的外部访问。

```ts
class Animal {
    private name: string
    constructor(theName: string) {
        this.name = theName
    }
}

new Animal("Cat").name // 属性“name”为私有属性，只能在类“Animal”中访问
```

`TypeScript`使用的是结构性类型系统，当我们比较两种不同类型时，并不在乎它们从何而来，如果所有成员的类型都是兼容的，我们就认为它们的类型时兼容的。

然而当我们比较带有`private`或`protected`成员的类型的时候，情况就不一样了，如果其中一个类型包含了`private`成员，那么只有当一个类型中也存在这样一个`private`成员，并且它们都来自同一处声明，才认为这两个类型是兼容的，对于`protected`成员也使用这个规则。

```ts
class Animal {
    private name: string
    constructor(theName: string) {
        this.name = theName
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino")
    }
}

class Employee {
    private name: string
    constructor(theName: string) {
        this.name = theName
    }
}

let animal = new Animal("Goat")
let rhino = new Rhino()
let employee = new Employee("Bob")

animal = rhino
animal = employee // 不能将类型“Employee”分配给类型“Animal”。类型具有私有属性“name”的单独声明。
```

上面代码中有`Animal`，`Rhino`和`Employee`三个类，其中`Rhino`是`Animal`的子类，`Employee`类型看上去与`Animal`相同，并且我们都创建了这个几个类的实例，然后让它们相互赋值，其中`Animal`和`Rhino`共享了来自`Animal`里的私有成员定义`private name: string`，因为它们是兼容的，然而`Employee`却是另外一种形式，当把`Employee`赋值给`Animal`时，会出现错误，类型是不兼容的，尽管`Employee`里也拥有一个私有成员`name`，但是它却不是`Animal`里面定义的。

#### protected

`protected`修饰符与`private`修饰符的行为很相似，但是有一点是不同的，`protected`成员在派生类中仍然可以访问。

```ts
class Person {
    protected name: string
    constructor(theName: string) {
        this.name = theName
    }
}

class Employee extends Person {
    private department: string
    constructor(name: string, department: string) {
        super(name)
        this.department = department
    }
    public getElevatorPitch() {
        return `hello, my name is ${this.name} and I work in ${this.department}.`
    }
}

let howard = new Employee("howard", "Sales")
console.log(howard.getElevatorPitch()) // hello, my name is howard and I work in Sales.
console.log(howard.name) // 属性“name”受保护，只能在类“Person”及其子类中访问。
```

上面代码中，我们不能在`Person`外部使用`name`属性，但是可以通过`Employee`类的实例化方法访问，因为`Employee`是由`Person`派生而来的。

构造函数也可以被标记为`protected`，这就意味着这个类不能在包含它的类外被实例化，但是可以被继承。

```ts
class Person {
    protected name: string

    protected constructor(name: string) {
        this.name = name
    }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string

    constructor(name: string, department: string) {
        super(name)
        this.department = department
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }
}

let howard = new Employee('Howard', 'Sales')
let john = new Person('John') // 类“Person”的构造函数是受保护的，仅可在类声明中访问。
console.log(howard) // Employee { name: 'Howard', department: 'Sales' }
```

### readonly修饰符

你可以使用`readonly`关键字修饰属性变为只能可读，只读属性必须在声明时或者构造函数里被初始化。

```ts
class Octopus {
    readonly name: string
    readonly numberOfLegs: number = 8
    constructor(theName: string) {
        this.name = theName
    }
}

let dad = new Octopus("Man with the 8 strong legs")
dad.name = "Man with the 3-piece suit" // 无法分配到 "name" ，因为它是只读属性。
```

上面代码中声明的属性都只是可读的，当`new`一个`Octopus`实例的时候，我们不能对类中的属性进行赋值。

#### 参数属性

在上面的例子中，我们必须在`Octopus`类里面定义一个只读成员`name`和一个参数`theName`的构造函数，并且立即将`theName`的值赋给`name`，这种情况经常是可以遇到的，参数属性可以方便地让我们在一个地方定义并且初始化一个成员，下面的例子是对之前`Octopus`类的修改版，使用了参数属性。

```ts
class Octopus {
    readonly numberOfLegs: number = 8
    constructor(readonly name: string) {

    }
}
```

### 存取器

`TypeScript`支持通过`getter`和`setter`来截取对对象成员的访问，它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用`get`和`set`方法，首先从一个没有使用存取器的例子开始。

```ts
class Employee {
    fullName: string = "Use"
}
let employee = new Employee()
employee.fullName = "Bob Smith"
if (employee.fullName) {
    console.log(employee.fullName) // Bob Smith
}
```

我们可以随意设置`fullName`。

下面这个代码中，先检查用户密码是否正确，然后再允许其修改员工信息，把`fullName`的直接访问改为可以检查密码的`set`方法，然后也加入了一个`get`方法，使得上面的例子也可以正常工作。

```ts
let passcode = "secret passcode"

class Employee {
    private _fullName: string = "Use"

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        if (passcode && passcode === "secret passcode") {
            this._fullName = newName
        } else {
            console.log("Error: Unauthorized update of employee!")
        }
    }
}

let employee = new Employee()
employee.fullName = "Bob Smith"
if (employee.fullName) {
    console.log(employee.fullName) // Bob Smith
}
```

上面代码中，可以修改`passcode`的值，当密码不匹配时就会出现提示没有权限去修改成员。

![密码不匹配](http://image.romance-to-death.top/img/images/Roaming/picgo/2022/01/02/f0112417e179cb3eef759604e6b98865-20220102135632-78ede9.png)

对于存取器有如下几点需要注意。

首先，存取器要求你将编译器设置为输出`ECMAScript 5`甚至更高，不支持降到`ECMAScript 3`，第二，只带有`get`不带有`set`的存取器会被推断为`readonly`。

### 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。我们也可以创建类的静态成员，这些属性存在于类本身上而不是类的实例上，在下面的代码中，使用`static`定义`origin`，因为他是所有网络都会用到的属性，每个实例都要访问这个属性的时候，都要在`origin`前面加上类名。如同在实例属性上使用`this.`前缀来访问属性一样，这里我们使用`Grid`来访问静态属性。

```ts
class Grid {
    static origin = { x: 0, y: 0 }
    calculateDistanceFromOrigin(point: { x: number, y: number }) {
        let xDist = (point.x - Grid.origin.x)
        let yDist = (point.y - Grid.origin.y)
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
    }
    constructor(public scale: number) { }
}

let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 })) // 14.142135623730951
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 })) // 2.8284271247461903
```

### 抽象类

抽象类作为其他派生类的基类使用。它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。`abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Animal {
    abstract makeSound(): void
    move(): void {
        console.log("roaming the earch")
    }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体，然而，抽象方法必须包含`abstract`关键字并且可以包含访问修饰符。

```ts
abstract class Department {
    name: string

    constructor(name: string) {
        this.name = name
    }

    printName(): void {
        console.log('Department name: ' + this.name)
    }

    abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.')
    }

    generateReports(): void {
        console.log('Generating accounting reports...')
    }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new Department() // 无法创建抽象类的实例。
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // 类型“Department”上不存在属性“generateReports”。
```

## 高级技巧

### 构造函数

当你在`TypeScript`里面声明一个类的时候，实际上同时声明了很多东西，首先就是类的**实例**类型。

```ts
class Greeter {
    static standardGreeting = 'Hello, there'
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return 'Hello, ' + this.greeting
    }
}

let greeter: Greeter
greeter = new Greeter('world')
console.log(greeter.greet()) // hello, world
```

上面代码中，编写了 `let greeter: Greeter`，意思是 `Greeter` 类的实例的类型是 `Greeter`。这对于用过其它面向对象语言的程序员来讲已经是习以为常了。

我们也创建了一个叫做*构造函数的值*。 这个函数会在我们使用 `new` 创建类实例的时候被调用。

```js
let Greeter = (function () {
  function Greeter(message) {
    this.greeting = message;
  }
  Greeter.prototype.greet = function () {
    return 'Hello, ' + this.greeting;
  };
  Greeter.standardGreeting = 'Hello, there';
  return Greeter;
}());
let greeter;
greeter = new Greeter('world');
console.log(greeter.greet());
```

上面的代码中，`let Greeter` 将被构造函数赋值。 当我们调用 `new` 并执行了这个函数后，便会得到一个类的实例。这个构造函数也包含了类的所有静态属性。换个角度说，我们可以认为类具有*实例部分*与*静态部分*这两个部分。

下面代码是稍微修改后的，与上面代码进行对比查看它们之间的区别。

```ts
class Greeter {
    static standardGreeting = 'Hello, there'

    greeting: string

    constructor(message?: any) {
        this.greeting = message
    }

    greet() {
        if (this.greeting) {
            return 'Hello, ' + this.greeting
        } else {
            return Greeter.standardGreeting
        }
    }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet()) // Hello, there

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet()) // Hey there
```

上面代码中，`greeter1` 与之前看到的一样。实例化`Greeter`类，并使用这个对象,再之后，我们直接使用类。创建了一个叫做 `greeterMaker`的变量。这个变量保存了这个类或者说保存了类构造函数。然后我们使用 `typeof Greeter`，意思是取 `Greeter`类的类型，而不是实例的类型。或者更确切的说，"告诉我`Greeter` 标识符的类型"，也就是构造函数的类型。这个类型包含了类的所有静态成员和构造函数。之后，就和前面一样，我们在`greeterMaker`上使用`new`，创建`Greeter`的实例。

### 把类当做接口使用

类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
    x: number = 0
    y: number = 0
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
console.log(point3d) // { x: 1, y: 2, z: 3 }
```