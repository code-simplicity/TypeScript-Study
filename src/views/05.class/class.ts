// 类
// class Greeter {
//     greeting: string
//     constructor(message: string) {
//         this.greeting = message
//     }
//     greet() {
//         return "hello, " + this.greeting
//     }
// }

// let greeter = new Greeter("world")
// console.log(greeter.greet()) // hello, world

// 继承
// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`)
//     }
// }

// class Dog extends Animal {
//     bark() {
//         console.log("Wo! Wo!")
//     }
// }

// const dog = new Dog()
// dog.bark() // Wo! Wo!
// dog.move(10) // Animal moved 10m.
// dog.move() // Animal moved 0m.

// class Animal {
//     name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`)
//     }
// }

// class Snake extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distanceInMeters = 5) {
//         console.log("Slithering...")
//         super.move(distanceInMeters)
//     }
// }

// class Horse extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distanceInMeters = 45) {
//         console.log("Galloping...")
//         super.move(distanceInMeters)
//     }
// }

// let sam = new Snake("Sammy the Java")
// let tom: Animal = new Horse("Tommy the Palomino")

// sam.move()
// /*
// Slithering...
// Animal moved 5m.
// */
// tom.move(34)
// /*
// Galloping...
// Animal moved 34m.
// */

// 公共，私有与受保护的修饰符
// public
// class Animal {
//     public name: string
//     public constructor(theName: string) {
//         this.name = theName
//     }
//     public move(distanceInMeters: number) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`)
//     }
// }

// private
// class Animal {
//     private name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// new Animal("Cat").name // 属性“name”为私有属性，只能在类“Animal”中访问
// class Animal {
//     private name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// class Rhino extends Animal {
//     constructor() {
//         super("Rhino")
//     }
// }

// class Employee {
//     private name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// let animal = new Animal("Goat")
// let rhino = new Rhino()
// let employee = new Employee("Bob")

// animal = rhino
// animal = employee // 不能将类型“Employee”分配给类型“Animal”。类型具有私有属性“name”的单独声明。

// protected
// class Person {
//     protected name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// class Employee extends Person {
//     private department: string
//     constructor(name: string, department: string) {
//         super(name)
//         this.department = department
//     }
//     public getElevatorPitch() {
//         return `hello, my name is ${this.name} and I work in ${this.department}.`
//     }
// }

// let howard = new Employee("howard", "Sales")
// console.log(howard.getElevatorPitch()) // hello, my name is howard and I work in Sales.
// console.log(howard.name) // 属性“name”受保护，只能在类“Person”及其子类中访问。

// class Person {
//     protected name: string

//     protected constructor(name: string) {
//         this.name = name
//     }
// }

// // Employee 能够继承 Person
// class Employee extends Person {
//     private department: string

//     constructor(name: string, department: string) {
//         super(name)
//         this.department = department
//     }

//     public getElevatorPitch() {
//         return `Hello, my name is ${this.name} and I work in ${this.department}.`
//     }
// }

// let howard = new Employee('Howard', 'Sales')
// let john = new Person('John') // 类“Person”的构造函数是受保护的，仅可在类声明中访问。
// console.log(howard) // Employee { name: 'Howard', department: 'Sales' }

// readonly修饰符
// class Octopus {
//     readonly name: string
//     readonly numberOfLegs: number = 8
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// let dad = new Octopus("Man with the 8 strong legs")
// dad.name = "Man with the 3-piece suit" // 无法分配到 "name" ，因为它是只读属性。

// class Octopus {
//     readonly numberOfLegs: number = 8
//     constructor(readonly name: string) {

//     }
// }

// 存取器
// class Employee {
//     fullName: string = "Use"
// }
// let employee = new Employee()
// employee.fullName = "Bob Smith"
// if (employee.fullName) {
//     console.log(employee.fullName) // Bob Smith
// }
// let passcode = "secret passcode1"

// class Employee {
//     private _fullName: string = "Use"

//     get fullName(): string {
//         return this._fullName
//     }

//     set fullName(newName: string) {
//         if (passcode && passcode === "secret passcode") {
//             this._fullName = newName
//         } else {
//             console.log("Error: Unauthorized update of employee!")
//         }
//     }
// }

// let employee = new Employee()
// employee.fullName = "Bob Smith"
// if (employee.fullName) {
//     console.log(employee.fullName) // Bob Smith
// }

// 静态属性
// class Grid {
//     static origin = { x: 0, y: 0 }
//     calculateDistanceFromOrigin(point: { x: number, y: number }) {
//         let xDist = (point.x - Grid.origin.x)
//         let yDist = (point.y - Grid.origin.y)
//         return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
//     }
//     constructor(public scale: number) { }
// }

// let grid1 = new Grid(1.0)
// let grid2 = new Grid(5.0)

// console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 })) // 14.142135623730951
// console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 })) // 2.8284271247461903

// 抽象类
// abstract class Animal {
//     abstract makeSound(): void
//     move(): void {
//         console.log("roaming the earch")
//     }
// }
// abstract class Department {
//     name: string

//     constructor(name: string) {
//         this.name = name
//     }

//     printName(): void {
//         console.log('Department name: ' + this.name)
//     }

//     abstract printMeeting(): void // 必须在派生类中实现
// }

// class AccountingDepartment extends Department {
//     constructor() {
//         super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
//     }

//     printMeeting(): void {
//         console.log('The Accounting Department meets each Monday at 10am.')
//     }

//     generateReports(): void {
//         console.log('Generating accounting reports...')
//     }
// }

// let department: Department // 允许创建一个对抽象类型的引用
// department = new Department() // 无法创建抽象类的实例。
// department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
// department.printName()
// department.printMeeting()
// department.generateReports() // 类型“Department”上不存在属性“generateReports”。

// 高级技巧
// 构造函数
// class Greeter {
//     static standardGreeting = 'Hello, there'
//     greeting: string
//     constructor(message: string) {
//         this.greeting = message
//     }
//     greet() {
//         return 'Hello, ' + this.greeting
//     }
// }

// let greeter: Greeter
// greeter = new Greeter('world')
// console.log(greeter.greet()) // hello, world
// let Greeter = (function () {
//     function Greeter(message) {
//         this.greeting = message;
//     }
//     Greeter.prototype.greet = function () {
//         return 'Hello, ' + this.greeting;
//     };
//     Greeter.standardGreeting = 'Hello, there';
//     return Greeter;
// }());
// let greeter;
// greeter = new Greeter('world');
// console.log(greeter.greet());

// class Greeter {
//     static standardGreeting = 'Hello, there'

//     greeting: string

//     constructor(message?: any) {
//         this.greeting = message
//     }

//     greet() {
//         if (this.greeting) {
//             return 'Hello, ' + this.greeting
//         } else {
//             return Greeter.standardGreeting
//         }
//     }
// }

// let greeter: Greeter
// greeter = new Greeter()
// console.log(greeter.greet()) // Hello, there

// let greeterMaker: typeof Greeter = Greeter
// greeterMaker.standardGreeting = 'Hey there'

// let greeter2: Greeter = new greeterMaker()
// console.log(greeter2.greet()) // Hey there

// 类当做接口使用
class Point {
    x: number = 0
    y: number = 0
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
console.log(point3d) // { x: 1, y: 2, z: 3 }