// 交叉类型
// function extend<T, U>(first: T, second: U): T & U {
//     let result = <T & U>{}
//     for (let id in first) {
//         (<any>result)[id] = (<any>first)[id]
//     }
//     for (let id in second) {
//         if (!result.hasOwnProperty(id)) {
//             (<any>result)[id] = (<any>second)[id];
//         }
//     }
//     return result
// }

// class Person {
//     constructor(public name: string) { }
// }

// interface Loggable {
//     log(): void
// }

// class ConsoleLogger implements Loggable {
//     log() {

//     }
// }

// let jim = extend(new Person("Jim"), new ConsoleLogger())
// let n = jim.name
// jim.log()

// 联合类型
// function padLeft(value: string, padding: any) {
//     if (typeof padding === "number") {
//         return Array(padding + 1).join(" ") + value
//     }
//     if (typeof value === "string") {
//         return padding + value
//     }
//     throw new Error(`Expected string or number, got '${padding}'.`)
// }

// console.log(padLeft("Hello world", 4)) //     Hello world

// let indentedString = padLeft("Hello world", true)
// console.log(indentedString) // trueHello world

// function padLeft(value: string, padding: string | number) {
//     // ...
// }

// let indentedString = padLeft("Hello world", true) // 类型“boolean”的参数不能赋给类型“string | number”的参数。

// interface Bird {
//     fly()
//     layEggs()
// }

// interface Fish {
//     swim()
//     layEggs()
// }

// function getSmallPet(): Fish | Bird {
//     // ...
// }

// let pet = getSmallPet()

// pet.layEggs() // Ok
// pet.swim() // error 类型“Bird | Fish”上不存在属性“swim”

// interface Bird {
//     fly()
//     layEggs()
// }

// interface Fish {
//     swim()
//     layEggs()
// }

// function getSmallPet(): Fish | Bird {
//     // ...
// }

// let pet = getSmallPet()

// // if (pet.swim) {
// //     pet.swim()
// // } else if (pet.fly) {
// //     pet.fly()
// // }

// if (<Fish>pet.swim) {
//     (<Fish>pet).swim()
// } else {
//     (<Bird>pet).fly()
// }

// function isFish(pet: Fish | Bird): pet is Fish {
//     return (<Fish>pet).swim !== undefined
// }

// if (isFish(pet)) {
//     pet.swim();
// }
// else {
//     pet.fly();
// }

// function isNumber(x: any): x is number {
//     return typeof x === "undefined"
// }

// function isString(x: any): x is string {
//     return typeof x === "string"
// }

// function padLeft(value: string, padding: string | number) {
//     if (isNumber(padding)) {
//         return Array(padding + 1).join(" ") + value
//     }
//     if (isString(value)) {
//         return padding + value
//     }
//     throw new Error(`Expected string or number, got '${padding}'.`)
// }

// function padLeft(value: string, padding: string | number) {
//     if (typeof padding === "number") {
//         return Array(padding + 1).join(" ") + value
//     }
//     if (typeof value === "string") {
//         return padding + value
//     }
//     throw new Error(`Expected string or number, got '${padding}'.`)
// }

// interface Padder {
//     getPaddingString(): string
// }

// class SpaceRepeatingPadder implements Padder {
//     constructor(private numSpaces: number) { }
//     getPaddingString() {
//         return Array(this.numSpaces + 1).join(" ")
//     }
// }

// class StringPadder implements Padder {
//     constructor(private value: string) { }
//     getPaddingString() {
//         return this.value
//     }
// }

// function getRandomPadder() {
//     return Math.random() < 0.5 ?
//         new SpaceRepeatingPadder(4) :
//         new StringPadder("  ")
// }

// // 类型为SpaceRepeatingPadder | StringPadder
// let padder: Padder = getRandomPadder();

// if (padder instanceof SpaceRepeatingPadder) {
//     padder // 类型细化为'SpaceRepeatingPadder'
// }
// if (padder instanceof StringPadder) {
//     padder // 类型细化为'StringPadder'
// }

// 可以为null的类型
// let s = 'foo'
// s = null // error, 不能将类型“null”分配给类型“string”
// let sn: string | null = 'bar'
// sn = null // Ok

// sn = undefined // error, 不能将类型“undefined”分配给类型“string | null

// 可选参数和可选属性
// function f(x: number, y?: number) {
//     return x + (y || 0)
// }
// console.log(f(1, 2)) // 3
// console.log(f(1)) // 1
// console.log(f(1, undefined)) // 1
// console.log(f(1, null)) // 类型“null”的参数不能赋给类型“number | undefined”的参数。

// class C {
//     a: number
//     b?: number
// }

// let c = new C()
// console.log(c.a = 12) // 12
// console.log(c.a = undefined) // 不能将类型“undefined”分配给类型“number”。
// console.log(c.b = 13) // 13
// console.log(c.b = undefined) // undefined
// console.log(c.b = null) // 不能将类型“null”分配给类型“number | undefined”。

// 类型保护和类型断言
// function f(sn: string | null): string {
//     if (sn === null) {
//         return "default"
//     } else {
//         return sn
//     }
// }
// 短路运算符
// function f(sn: string | null): string {
//     return sn || "default"
// }
// function broken(name: string | null): string {
//     function postfix(epithet: string) {
//         return name.charAt(0) + '.  the ' + epithet // error, 对象可能为 "null"
//     }
//     name = name || 'Bob'
//     return postfix('great')
// }

// function fixed(name: string | null): string {
//     function postfix(epithet: string) {
//         return name!.charAt(0) + '.  the ' + epithet // ok
//     }
//     name = name || 'Bob'
//     return postfix('great')
// }

// 类型别名
// type Name = string;
// type NameResolver = () => string;
// type NameOrResolver = Name | NameResolver;
// function getName(n: NameOrResolver): Name {
//     if (typeof n === 'string') {
//         return n;
//     }
//     else {
//         return n();
//     }
// }

// type Constainer<T> = { value: T }
// type Tree<T> = {
//     value: T
//     letf: Tree<T>
//     right: Tree<T>
// }

// type LinkedList<T> = T & { next: LinkedList<T> }

// interface Person {
//     name: string
// }

// let people: LinkedList<Person>
// let s = people.name
// let s = people.next.name;
// let s = people.next.next.name;
// let s = people.next.next.next.name;

//

// 接口vs类型别名
// type Alias = { num: number }
// interface Interface {
//     num: number;
// }
// declare function aliased(arg: Alias): Alias;
// declare function interfaced(arg: Interface): Interface;

// 字符串字面量类型
// type Easing = "ease-in" | "ease-out" | "ease-in-out";
// class UIElement {
//     animate(dx: number, dy: number, easing: Easing) {
//         if (easing === "ease-in") {
//             // ...
//         }
//         else if (easing === "ease-out") {
//         }
//         else if (easing === "ease-in-out") {
//         }
//         else {
//             // error! should not pass null or undefined.
//         }
//     }
// }

// let button = new UIElement();
// button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // error: 类型“"uneasy"”的参数不能赋给类型“Easing”的参数。

// function createElement(tagName: "img"): HTMLImageElement;
// function createElement(tagName: "input"): HTMLInputElement;
// // ... more overloads ...
// function createElement(tagName: string): Element {
//     // ... code goes here ...
// }

// 数字字面量类型
// function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
//     // ...
// }

// function foo(x: number) {
//     if (x !== 1 || x !== 2) {
//         //         ~~~~~~~
//         // Operator 此条件将始终返回 "true"，因为类型 "1" 和 "2" 没有重叠。
//     }
// }

// 可辨识联合
// interface Square {
//     kind: "square"
//     size: number
// }

// interface Rectangle {
//     kind: "rectangle"
//     width: number
//     height: number
// }

// interface Circle {
//     kind: "Circle"
//     radius: number
// }

// type Shape = Square | Rectangle | Circle

// function area(s: Shape) {
//     switch (s.kind) {
//         case "square": return s.size * s.size
//         case "rectangle": return s.height * s.width
//         case "Circle": return Math.PI * s.radius ** 2
//     }
// }

// console.log(area({ kind: "rectangle", height: 10, width: 10, })) // 100

// interface Square {
//     kind: "square"
//     size: number
// }

// interface Rectangle {
//     kind: "rectangle"
//     width: number
//     height: number
// }

// interface Circle {
//     kind: "Circle"
//     radius: number
// }

// interface Triangle {
//     kind: "triangle"
//     width: number
//     height: number

// }

// type Shape = Square | Rectangle | Circle | Triangle

// function area(s: Shape) {
//     switch (s.kind) {
//         case "square": return s.size * s.size
//         case "rectangle": return s.height * s.width
//         case "Circle": return Math.PI * s.radius ** 2
//     }
// }

// function area(s: Shape): number { // error: 函数缺少结束 return 语句，返回类型不包括 "undefined"。
//     switch (s.kind) {
//         case "square": return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "Circle": return Math.PI * s.radius ** 2;
//     }
// }

// function assertNever(x: never): never {
//     throw new Error("Unexpected object: " + x);
// }
// function area(s: Shape) {
//     switch (s.kind) {
//         case "square": return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "circle": return Math.PI * s.radius ** 2;
//         default: return assertNever(s); // error here if there are missing cases
//     }
// }

// 多态的this
// class BasicCalculator {
//     public constructor(protected value: number = 0) { }
//     public currentValue(): number {
//         return this.value;
//     }
//     public add(operand: number): this {
//         this.value += operand;
//         return this;
//     }
//     public multiply(operand: number): this {
//         this.value *= operand;
//         return this;
//     }
//     // ... other operations go here ...
// }

// let v = new BasicCalculator(2)
//     .multiply(5)
//     .add(1)
//     .currentValue();

// class ScientificCalculator extends BasicCalculator {
//     public constructor(value = 0) {
//         super(value);
//     }
//     public sin() {
//         this.value = Math.sin(this.value);
//         return this;
//     }
//     // ... other operations go here ...
// }

// let v = new ScientificCalculator(2)
//     .multiply(5)
//     .sin()
//     .add(1)
//     .currentValue();

// 索引类型
// function pluck(o, names) {
//     return names.map(n => o[n]);
// }
// function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
//     return names.map(n => o[n]);
// }

// interface Person {
//     name: string;
//     age: number;
// }
// let person: Person = {
//     name: 'Jarid',
//     age: 35
// };
// let strings: string[] = pluck(person, ['name']); // ok, string[]

// let personProps: keyof Person; // 'name' | 'age'

// pluck(person, ['age', 'unknown']); // error, 不能将类型“"unknown"”分配给类型“keyof Person”。

// function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
//     return o[name]; // o[name] is of type T[K]
// }


// let name: string = getProperty(person, 'name');
// let age: number = getProperty(person, 'age');
// let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'

// interface Map<T> {
//     [key: string]: T;
// }
// let keys: keyof Map<number>; // string
// let value: Map<number>['foo']; // number

// 映射类型
// interface PersonPartial {
//     name?: string
//     age?: number
// }

// interface PersonReadonly {
//     readonly name: string
//     readonly age: number
// }

// type Readonly<T> = {
//     readonly [P in keyof T]: T[P]
// }
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }

// type PersonPartial = Partial<Person>
// type ReadonlyPerson = Readonly<Person>

// type Keys = 'option1' | 'option2'
// type Flags = { [K in Keys]: boolean }

// type Flags = {
//     option1: boolean;
//     option2: boolean;
// }

// type NullablePerson = { [P in keyof Person]: Person[P] | null }
// type PartialPerson = { [P in keyof Person]?: Person[P] }

// type Nullable<T> = { [P in keyof T]: T[P] | null }
// type Partial<T> = { [P in keyof T]?: T[P] }

// type Proxy<T> = {
//     get(): T
//     set(value: T): void
// }
// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>
// }
// function proxify<T>(o: T): Proxify<T> {
//     // ... wrap proxies ...
// }
// let proxyProps = proxify(props)

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P]
// }
// type Record<K extends string, T> = {
//     [P in K]: T
// }

// type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

// 由映射类型进行推断
// function unproxify<T>(t: Proxify<T>): T {
//     let result = {} as T;
//     for (const k in t) {
//         result[k] = t[k].get();
//     }
//     return result;
// }

// let originalProps = unproxify(proxyProps);

// type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
// type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

// type T02 = Exclude<string | number | (() => void), Function>;  // string | number
// type T03 = Extract<string | number | (() => void), Function>;  // () => void

// type T04 = NonNullable<string | number | undefined>;  // string | number
// type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

// function f1(s: string) {
//     return { a: 1, b: s };
// }

// class C {
//     x = 0
//     y = 0;
// }

// type T10 = ReturnType<() => string>;  // string
// type T11 = ReturnType<(s: string) => void>;  // void
// type T12 = ReturnType<(<T>() => T)>;  // {}
// type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
// type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
// type T15 = ReturnType<any>;  // any
// type T16 = ReturnType<never>;  // any
// type T17 = ReturnType<string>;  // Error 类型“string”不满足约束“(...args: any) => any”
// type T18 = ReturnType<Function>;  // Error 类型“Function”不满足约束“(...args: any) => any”。

// type T20 = InstanceType<typeof C>;  // C
// type T21 = InstanceType<any>;  // any
// type T22 = InstanceType<never>;  // any
// type T23 = InstanceType<string>;  // Error 类型“string”不满足约束“abstract new (...args: any) => any”。
// type T24 = InstanceType<Function>;  // Error 类型“Function”不满足约束“abstract new (...args: any) => any”。