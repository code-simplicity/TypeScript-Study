// 类型推断
// let x = 3
// if (typeof x === "number") {
//     console.log(x) // 3
// }

// let x = [0, 1, null]

// let zoo = [new Rhino(), new Elephant(), new Snake()]
// let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]

// 上下文类型
// window.onmousedown = function (mouseEvent) {
//     console.log(mouseEvent.button) // Error
// }

// window.onmousedown = function (mouseEvent: any) {
//     console.log(mouseEvent.button) // Ok
// }

function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()]
}