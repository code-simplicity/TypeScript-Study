// 接口
// function sum(num: { a: number, b: number }) {
//     console.log(num.a + num.b)
// }
// let num = {
//     a: 1,
//     b: 2
// }
// sum(num)

// interface interNum {
//     a: number,
//     b: number
// }
// function sum(num: interNum) {
//     console.log(num.a + num.b)
// }
// let num = {
//     a: 1,
//     b: 2
// }
// sum(num)

// interface SquareConfig {
//     color?: string,
//     width?: number
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "whitw", area: 100 }
//     if (config.color) {
//         newSquare.color = config.color
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width
//     }
//     return newSquare
// }
// let mySquare = createSquare({ color: "black" })
// console.log(mySquare)

// interface SquareConfig {
//     color?: string,
//     width?: number
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "whitw", area: 100 }
//     if (config.clor) {
//         // Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'
//         newSquare.color = config.color
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width
//     }
//     return newSquare
// }
// let mySquare = createSquare({ color: "black" })
// console.log(mySquare)

// 只读属性
// interface Point {
//     readonly x: number,
//     readonly y: number
// }

// let p1: Point = { x: 10, y: 5 }
// p1.x = 10 // Cannot assign to 'x' because it is a read-only property

// let a: number[] = [1, 2, 3, 4]
// let ro: ReadonlyArray<number> = a
// // ro[0] = 12 // Index signature in type 'readonly number[]' only permits reading
// // ro.push(5) // Property 'push' does not exist on type 'readonly number[]'
// // ro.length = 100 // Cannot assign to 'length' because it is a read-only property
// // a = ro // The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'

// a = ro as number[]
// console.log(a)

// interface SquareConfig {
//     color?: string,
//     width?: number
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "whitw", area: 100 }
//     if (config.color) {
//         newSquare.color = config.color
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width
//     }
//     return newSquare
// }
// // let mySquare = createSquare({ colour: "red", width: 100 })
// // console.log(mySquare) // Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// // // Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?

// let mySquare = createSquare({ colour: "red", opacity: 0.5 } as SquareConfig)
// console.log(mySquare) // { color: 'whitw', area: 100 }
// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "whitw", area: 100 }
//     if (config.color) {
//         newSquare.color = config.color
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width
//     }
//     return newSquare
// }

// let squareOptions = { colour: 'red', width: 100 }
// let mySquare = createSquare(squareOptions)
// console.log(mySquare) // { color: 'whitw', area: 10000 }

// 函数类型
// interface SearchFunc {
//     (source: string, subString: string): boolean
// }
// let mySearch: SearchFunc
// mySearch = function (source: string, subString: string): boolean {
//     let result = source.search(subString)
//     return result > -1
// }

// interface SearchFunc {
//     (source: string, subString: string): boolean
// }
// let mySearch: SearchFunc
// mySearch = function (src: string, sub: string): boolean {
//     let result = src.search(sub)
//     return result > -1
// }

// interface SearchFunc {
//     (source: string, subString: string): boolean
// }
// let mySearch: SearchFunc
// mySearch = function (src, sub) {
//     let result = src.search(sub)
//     return result > -1
// }
// console.log(mySearch)

// 可索引的类型
// interface StringArray {
//     [index: number]: string
// }
// let myArray: StringArray
// myArray = ["red", "whitw"]
// let myStr: string = myArray[0]
// console.log(myStr) // red
// class Animal {
//     name: string = ""
// }
// class Dog extends Animal {
//     breed: string = "xh"
// }
// interface NotOkay {
//     [x: number]: Animal // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'
//     [x: string]: Dog
// }
// interface NumberDictionary {
//     [index: string]: number
//     length: number
//     name: string // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
// }

// interface ReadonlyStringArray {
//     readonly [index: number]: string
// }
// let myArray: ReadonlyStringArray = ["Alice", "Bob"]
// myArray[2] = "Mallory" // Index signature in type 'ReadonlyStringArray' only permits reading

// 类类型
// 实现接口
// interface ClockInterface {
//     currentTime: Date
// }

// class clock implements ClockInterface {
//     currentTime: Date
//     constructor(h: number, m: number) {
//     }
// }

// interface ClockInterface {
//     currentTime: Date
//     setTime(d: Date): void
// }

// class clock implements ClockInterface {
//     currentTime: Date
//     setTime(d: Date) {
//         this.currentTime = d
//     }
//     constructor(h: number, m: number) {
//     }
// }

// 类静态部分
// interface ClockConstructor {
//     new(hour: number, minute: number)
// }
// class Clock implements ClockConstructor {
//     currentTime: Date
//     constructor(h: number, m: number)
// }
// interface ClockConstructor {
//     new(hour: number, minute: number): ClockInterface
// }
// interface ClockInterface {
//     tick(): void
// }

// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//     return new ctor(hour, minute)
// }

// class DigitalClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("beep beep")
//     }
// }

// class AnalogClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("tick tock")
//     }
// }

// let digital = createClock(DigitalClock, 12, 17)
// let analog = createClock(AnalogClock, 7, 31)
// console.log(digital) // DigitalClock {}
// console.log(analog) // AnalogClock {}

// 接口继承
// interface Shape {
//     color: string
// }

// interface Square extends Shape {
//     sideLength: number
// }

// let square = <Square>{}
// square.color = "blue"
// square.sideLength = 10
// console.log(square) // { color: 'blue', sideLength: 10 }
// interface Shape {
//     color: string
// }

// interface PenStroke {
//     penWidth: number
// }

// interface Square extends Shape, PenStroke {
//     sideLength: number
// }

// let square = <Square>{}
// square.color = "blue"
// square.penWidth = 0.5
// square.sideLength = 10
// console.log(square) // { color: 'blue', penWidth: 0.5, sideLength: 10 }

// 混合类型
// interface Counter {
//     (start: number): string
//     interval: number
//     reset(): void
// }

// function getCounter(): Counter {
//     let counter = <Counter>function (start: number) { }
//     counter.interval = 123
//     counter.reset = function () { }
//     return counter
// }

// let c = getCounter()
// console.log(c(10)) // undefined
// console.log(c.reset()) // undefined
// console.log(c.interval = 0.5) // 0.5

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