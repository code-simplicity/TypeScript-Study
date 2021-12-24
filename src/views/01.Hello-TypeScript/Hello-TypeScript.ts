// function sayTypeScript(info: string) {
//     if (typeof info === "string") {
//         return 'Hello, ' + info;
//     } else {
//         throw new Error("typescript is not a string")
//     }
// }

// let info = 'TypeScript';
// console.log(sayTypeScript(info));

function sayTypeScript(info: string) {
    if (typeof info === "string") {
        return 'Hello, ' + info;
    } else {
        throw new Error("typescript is not a string")
    }
}

let info = 1;
console.log(sayTypeScript(info));

// let foo = 10;
// foo.split(' ');
// 类型“number”上不存在属性“split”,直接类型检查报错

// let foo: number = 10
// foo.split('') // 类型“number”上不存在属性“split”。

// console.log(1 + '1') // 11