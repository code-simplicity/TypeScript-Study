// interface Named {
//     name: string
// }

// class Person {
//     name: string = "ts"
// }

// let p: Named

// p = new Person()

// interface Named {
//     name: string
// }

// let x: Named

// let y = { name: "Alice", location: "Seattle" }
// x = y

// interface Named {
//     name: string
// }

// let y = { name: "Alice", location: "Seattle" }

// function greet(n: Named) {
//     console.log("Hello, " + n.name)
// }

// greet(y) // Hello Alice

// 比较两个函数
// let x = (a: number) => 0
// let y = (b: number, s: string) => 0
// y = x // OK
// x = y // 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”

// let items = [1, 2, 3]
// items.forEach((item, index, array) => {
//     console.log(item)
// })

// items.forEach(item => {
//     console.log(item)
// })

// let x = () => ({ name: "Alice" })
// let y = () => ({ name: "Alice", location: "Seattle" })

// x = y // Ok
// y = x // Error 不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。

// enum EventType {
//     Mouse,
//     Keyboard
// }

// interface Event {
//     timestamp: number
// }
// interface MouseEvent extends Event {
//     x: number
//     y: number
// }
// interface KeyEvent extends Event {
//     keyCode: number
// }

// function listenEvent(eventType: EventType, handler: (n: Event) => void) {
//     //
// }

// listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y)) // 类型“(e: MouseEvent) => void”的参数不能赋给类型“(n: Event) => void”的参数。
// // 参数“e”和“n” 的类型不兼容。

// listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));

// listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// listenEvent(EventType.Mouse, (e: number) => console.log(e)); // 类型“(e: number) => void”的参数不能赋给类型“(n: Event) => void”的参数。
// // 参数“e”和“n” 的类型不兼容。

// function invokeLater(args: any[], callback: (...args: any[]) => void) {
//     //
// }

// invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

// invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));

// 枚举类型
// enum Status {
//     Ready,
//     Waiting
// }

// enum Color {
//     Rea,
//     Blue,
//     Green
// }

// let status = Status.Ready
// status = Color.Green // 不能将类型“Color”分配给类型“string”。

// class Animal {
//     feet: number
//     constructor(name: string, numFeet: number) { }
// }

// class Size {
//     feet: number
//     constructor(numFeet: number) {

//     }
// }

// let a: Animal
// let s: Size

// a = s // OK
// s = a // OK

// 泛型
// interface Empty<T> {
// }
// let x: Empty<number>;
// let y: Empty<string>;

// x = y;  // OK

// interface NotEmpty<T> {
//     data: T;
// }
// let x: NotEmpty<number>;
// let y: NotEmpty<string>;

// x = y;  // Error, 不能将类型“NotEmpty<string>”分配给类型“NotEmpty<number>”

let identity = function <T>(x: T): T {
    // ...
}

let reverse = function <U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any