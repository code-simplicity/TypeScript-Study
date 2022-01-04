// 数字枚举
// enum Direction {
//     Up = 1,
//     Down,
//     Left,
//     Right
// }

// console.log(Direction.Up) // 1
// console.log(Direction.Down) // 2
// console.log(Direction.Left) // 3
// console.log(Direction.Right) // 4

// enum Direction {
//     Up,
//     Dowm,
//     Left,
//     Right
// }

// console.log(Direction.Up) // 0
// console.log(Direction.Down) // 1
// console.log(Direction.Left) // 2
// console.log(Direction.Right) // 3

// enum Response {
//     No = 0,
//     Yes = 1
// }

// function respond(recipient: string, message: Response): void {
//     // ...
// }

// respond("Princess Caroline", Response.Yes)

// enum E {
//     A = getSomeValue(),
//     B //  枚举成员必须具有初始化表达式
// }

// let x = 10

// function getSomeValue(): number {
//     return x
// }

// 字符串枚举
// enum Direction {
//     Up = "UP",
//     Down = "DOWN",
//     Left = "LEFT",
//     Right = "RIGHT"
// }

// console.log(Direction.Up) // UP
// console.log(Direction.Down) // DOWN
// console.log(Direction.Left) // LEFT
// console.log(Direction.Right) // RIGHT

// 异构枚举
// enum BooleanLikeHeterogeneousEnum {
//     No = 0,
//     Yes = "YES"
// }

// 计算的和常量成员
// enum E {
//     x
// }

// enum E1 {
//     X,
//     Y,
//     Z
// }

// enum E2 {
//     A = 1,
//     B,
//     C
// }

// enum FileAccess {
//     None,
//     Read,
//     Write,
//     ReadWrite = Read | Write,
//     G = "123".length
// }

// 联合枚举
// enum ShapeKind {
//     Circle,
//     Square
// }

// interface Circle {
//     kind: ShapeKind.Circle
//     radius: number
// }

// interface Square {
//     kind: ShapeKind.Square
//     sideLength: number
// }

// let c: Circle = {
//     kind: ShapeKind.Square, // Error 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”
//     radius: 100
// }

// enum E {
//     Foo,
//     Bar
// }

// function f(x: E) {
//     if (x !== E.Foo || x !== E.Bar) { // 此条件将始终返回 "true"，因为类型 "E.Foo" 和 "E.Bar" 没有重叠。
//         // ...
//     }
// }

// 运行时的枚举
// enum E {
//     X, Y, Z
// }

// function f(obj: { X: number }) {
//     return obj.X // 0
// }

// console.log(f(E))

// 反向映射
// enum Enum {
//     A
// }

// let a = Enum.A
// let nameOfA = Enum[a]
// console.log(nameOfA)

// const枚举
// const enum Enum {
//     A = 1,
//     B = A * 2
// }

// const enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right,]
// console.log(directions) // [0, 1, 2, 3]

// 外部枚举
declare enum Enum {
    A = 1,
    B,
    C = 2
}