// 基础类型

// 布尔值
// let foo: boolean = true
// let bar: boolean = false
// console.log(foo) // true
// console.log(bar) // false

// if (typeof foo === "boolean") {
//     console.log('foo is a boolean')
// } else {
//     console.log('foo is not a boolean')
// }

// 数字
// let foo: number = 1 // 10进制数
// let bar: number = 0x0f00 // 16进制数
// let baz: number = 0b1010 // 2进制数
// let num: number = 0o711 // 8进制数

// foo = "1"
// console.log(foo) // 1
// console.log(bar) // 3840
// console.log(baz) // 10
// console.log(num) // 457

// 字符串
// let username: string = "typescript"
// console.log(username) // typescript

// let username: string = `typescript`
// let age: number = 10
// let description: string = `${username}已经发展将近${age}年了`
// console.log(description) // typescript已经发展将近10年了

// 空值
// function getName(username: string): void {
//     console.log("my name is " + username)
// }

// let username: string = "typescript"
// getName(username)

// Null和undefined
// let n: null = null
// let u: undefined = undefined

// 数组
// let arrayNumber: number[] = [1, 2, 3]

// let arrayString: string[] = ["1", "2"]

// let array: Array<number> = [1, 2, 3]
// console.log(array) // [ 1, 2, 3 ]

// 元组Tuple
// let array: [number, string]
// array = [1, "2"]
// // array = [1, 2]
// // console.log(array) // [ 1, '2' ]



// if (typeof array[0] === "number") {
//     console.log(array[0])
// }

// if (typeof array[1] === "string") {
//     console.log(array[1])
// }

// 枚举
// enum Color {
//     Red,
//     Green = 2,
//     Blue
// }
// let c: Color = Color.Green
// console.log(c) // 2

// enum Color {
//     Red = 1,
//     Green = 2,
//     Blue = 3
// }
// let colorName: string = Color[2]
// console.log(colorName) // Green

// Any
// let foo: any = 4
// // foo = "4"
// // foo = false
// // console.log(foo)

// console.log(foo.ifItExists())
// console.log(foo.toFixed())

// let foo: any = 4;
// foo.ifItExists(); // okay, ifItExists might exist at runtime
// console.log(foo.toFixed()); // 4

// let prettySure: Object = 4;
// prettySure.toFixed(); // Property 'toFixed' does not exist on type 'Object'.
let array: any[] = [1, "2", true]

console.log(array[2]) // true


