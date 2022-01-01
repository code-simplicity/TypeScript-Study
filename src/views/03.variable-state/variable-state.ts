// 变量声明

// var
// var foo = 10
// function foo() {
//     var a = 10
//     return function bar() {
//         var b = a + 1
//         return b
//     }
// }
// var a = foo()
// console.log(a()) // 11

// function foo() {
//     var a = 1
//     a = 2
//     var b = g()
//     a = 3
//     return b

//     function g() {
//         return a
//     }
// }

// console.log(foo()) // 2

// 作用域规则
// function foo(bool: boolean) {
//     if (bool) {
//         var a = 10
//     }
//     return a
// }
// console.log(foo(true)) // 10
// console.log(foo(false)) // undefined
// function sumMatrix(matrix: number[][]) {
//     var sum = 0
//     for (var i = 0; i < matrix.length; i++) {
//         var currentRow = matrix[i]
//         for (var i = 0; i < currentRow.length; i++) {
//             sum += currentRow[i]
//         }
//     }
//     return sum
// }
// function foo(item: any[]) {
//     for (var i = 0; i < item.length; i++) {
//         setTimeout(function () {
//             console.log(i)
//         }, 1000)

//     }
// }
// let item = [1, 2, 3, 4, 5]
// console.log(foo(item))

// for (let i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i)
//     }, 1000)
// }

// let
// let hello = "hello"
// function foo(i: boolean) {
//     let a = 10
//     if (i) {
//         let b = a + 1
//         return b
//     }
//     return b
// }
// console.log(foo(true)) // Cannot find name 'b'
// console.log(a) // Variable 'a' is used before being assigned
// let a = 10

// 重定义和屏蔽
// function foo(x: any) {
//     let x
//     let x
//     if (true) {
//         return x
//     }
// }
// console.log(foo(1)) // Duplicate identifier 'x'
// function sumMatrix(matrix: number[][]) {
//     let sum = 0
//     for (let i = 0; i < matrix.length; i++) {
//         let currentRow = matrix[i]
//         for (let i = 0; i < currentRow.length; i++) {
//             sum += currentRow[i]
//         }
//     }
//     return sum
// }

// 块级作用域变量的获取
// function thenCityThatAlwaysSleeps() {
//     let getCity
//     if (true) {
//         let city = "china"
//         getCity = function () {
//             return city
//         }
//     }
//     return getCity()
// }
// console.log(thenCityThatAlwaysSleeps()) // china
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 100 * i)
// }

// const
// const numLivesForCat = 10
// const kitty = {
//     name: "typescript",
//     numLives: numLivesForCat
// }
// // Cannot assign to 'kitty' because it is a constant
// kitty = {
//     name: "javascript",
//     numLives: numLivesForCat
// }

// console.log(kitty.name = "hello") // hello
// console.log(kitty.numLives = 1) // 1

// 解构
// let str: string = "typescript"
// console.log(...str) // t y p e s c r i p t
// console.log([...str])
// /*
// [
//   't', 'y', 'p', 'e',
//   's', 'c', 'r', 'i',
//   'p', 't'
// ]
// */
// 数组
// let array: any[] = [1, 2, "3"]
// // let [a, b, c] = array
// // console.log(a) // 1
// // console.log(b) // 2
// // console.log(c) // "3"

// function foo([a, b, c]: any[]) {
//     console.log(a)
//     console.log(b)
//     console.log(c)
// }
// foo([...array])
// 1
// 2
// "3"
// 对象解构
// let object = {
//     a: "1",
//     b: "2",
//     c: "3"
// }
// let { a, b, c } = object
// console.log(a)
// console.log(b)
// console.log(c)

// let { a, ...c } = object
// console.log(c.b)
// console.log(c.c)

// 函数的声明
// type C = { a: string, b?: number }
// function foo({ a, b }: C): void {
//     //
// }

function foo({ a = "", b = 0 } = {}): void {
    // 
}
foo()
