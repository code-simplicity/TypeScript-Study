// function identity(arg: number): number {
//     return arg
// }

// function identity(arg: any): any {
//     return arg
// }

// function identity<T>(arg: T): T {
//     return arg
// }

// // let output = identity<string>("myString")
// // console.log(output) // myString

// let output = identity("myString")
// console.log(output) // myString

// function identity<T>(arg: T): T {
//     console.log(arg.length) // error 类型“T”上不存在属性“length”
//     return arg
// }

// function loggingIdentity<T>(arg: T[]): T[] {
//     console.log(arg.length)
//     return arg
// }

// function loggingIdentity<T>(arg: Array<T>): Array<T> {
//     console.log(arg.length)
//     return arg
// }

// function identity<T>(arg: T): T {
//     return arg
// }

// let myIdentity: <T>(arg: T) => T = identity

// function identity<T>(arg: T): T {
//     return arg
// }

// let myIdentity: <U>(arg: U) => U = identity

// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: { <T>(arg: T): T } = identity;

// interface CenericIdentityFn {
//     <T>(arg: T): T
// }

// function identity<T>(arg: T): T {
//     return arg
// }

// let myIdentity: CenericIdentityFn = identity

// interface CenericIdentityFn<T> {
//     (arg: T): T
// }

// function identity<T>(arg: T): T {
//     return arg
// }

// let myIdentity: CenericIdentityFn<number> = identity

// 泛型类
// class GenericNumber<T> {
//     zeroValue: T
//     add: (x: T, y: T) => T
// }

// let myGenericNumber = new GenericNumber<number>()
// myGenericNumber.zeroValue = 0
// myGenericNumber.add = function (x, y) {
//     return x + y
// }

// class GenericNumber<T> {
//     zeroValue: T
//     add: ((x: T, y: T) => T)
// }

// let stringNumeric = new GenericNumber<string>()
// stringNumeric.zeroValue = ""
// stringNumeric.add = function (x, y) { return x + y; }

// console.log(stringNumeric.add(stringNumeric.zeroValue, "test")) // test

// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Error: 类型“T”上不存在属性“length”
//     return arg;
// }

// interface Lengthwise {
//     length: number
// }

// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//     console.log(arg.length)
//     return arg
// }
// // loggingIdentity(3) // 类型“number”的参数不能赋给类型“Lengthwise”的参数
// loggingIdentity({ length: 10, value: 3 }) // 10

// function getProperty(obj: T, key: K) {
//     return obj[key]
// }

// let x = { a: 1, b: 2, c: 3, d: 4 }
// getProperty(x, "a") // 1
// getProperty(x, "m") // error

// function create<T>(c: { new(): T; }): T {
//     return new c();
// }

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!