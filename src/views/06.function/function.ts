// 函数
// function add(x: number, y: number) {
//     return x + y
// }

// let myAdd = function (x: number, y: number) { return x + y }

// let z = 100

// function add(x: number, y: number) {
//     return x + y + z
// }

// console.log(add(1, 2)) // 103

// 函数类型
// function add(x: number, y: number): number {
//     return x + y
// }

// let myAdd = function (x: number, y: number): number {
//     return x + y
// }

// 完整的函数类型
// let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
//     return x + y
// }

// let myAdd: (baseValue: number, increment: number) => number = function (
//     x: number,
//     y: number
// ): number {
//     return x + y;
// };

// 类型推断
// let myAdd = function (x: number, y: number): number { return x + y }

// let myAdd: (baseValue: number, increment: number) => number = function (x, y) {
//     return x + y
// }

// 可选参数和默认参数
// function buildName(firstName: string, lastName?: string): string {
//     return firstName + "-" + lastName
// }

// let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个
// console.log(result1) // Bob-undefined
// let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

// let result3 = buildName("", "Bob")
// console.log(result3) // -Bob

// let result4 = buildName("Bob", "Adams")
// console.log(result4) // Bob-Adams

// function buildName(firstName: string, lastName = "Smith"): string {
//     return firstName + "-" + lastName
// }

// let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个
// console.log(result1) // Bob-Smith
// let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

// let result3 = buildName("", "Bob")
// console.log(result3) // -Bob

// let result4 = buildName("Bob", "Adams")
// console.log(result4) // Bob-Adams

// function buildName(firstName: string, lastName?: string): string {
//     // ...
// }

// function buildName(firstName: string, lastName = "Smith"): string {
//     // ...
// }

// function buildName(firstName = "Will", lastName: string) {
//     return firstName + "-" + lastName
// }

// let result1 = buildName("Bob") // error 应有 2 个参数，但获得 1 个。

// let result2 = buildName("Bob", "Adams", "Sr") // error 应有 2 个参数，但获得 3 个。

// let result3 = buildName("Bob", "Adams")
// console.log(result3) // Bob-Adams

// let result4 = buildName("", "Adams")
// console.log(result4) // -Adams

// let result5 = buildName(undefined, "Adams")
// console.log(result5) // Will-Adams

// 剩余参数
// function buildName(firstName: string, ...restOfName: string[]) {
//     return firstName + " " + restOfName.join(" ")
// }

// let result = buildName("Joseph", "Samuel", "Lucas", "MacKinzie")
// console.log(result) // Joseph Samuel Lucas MacKinzie

// function buildName(firstName: string, ...restOfName: string[]) {
//     return firstName + " " + restOfName.join(" ")
// }

// let buildNameFun: (fname: string, ...rest: string[]) => string = buildName

// this
// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function () {
//         return () => {
//             let pickerCard = Math.floor(Math.random() * 52)
//             let pickerSuits = Math.floor(pickerCard / 13)
//             return { suit: this.suits[pickerSuits], card: pickerCard % 13 }
//         }
//     }
// }

// let cardPicker = deck.createCardPicker()
// let pickerCard = cardPicker()

// console.log("card " + pickerCard.card + " of " + pickerCard.suit) // card 8 of diamonds

// function f(this: void) {
//     // ...
// }

// interface Card {
//     suit: string
//     card: number
// }

// interface Deck {
//     suits: string[]
//     cards: number[]
//     createCardPicker(this: Deck): () => Card
// }

// let deck: Deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function (this: Deck) {
//         return () => {
//             let pickerCard = Math.floor(Math.random() * 52)
//             let pickerSuits = Math.floor(pickerCard / 13)
//             return { suit: this.suits[pickerSuits], card: pickerCard % 13 }
//         }
//     }
// }

// let cardPicker = deck.createCardPicker()
// let pickerCard = cardPicker()

// console.log("card " + pickerCard.card + " of " + pickerCard.suit) // card 9 of clubs

// interface UIElement {
//     addClickListener(onClick: (this: void, e: Event) => void): void
// }

// class Handler {
//     info: string
//     onClickBad(this: Handler, e: Event) {
//         this.info = e.message
//     }
// }

// let h = new Handler()
// uiElement.addClickListener(h.onClickBad)

// class Handler {
//     info: string
//     onClickGood(this: Handler, e: Event) {
//         console.log("clicked")
//     }
// }

// let h = new Handler()
// uiElement.addClickListener(h.onClickGood)

// class Handler {
//     info: string;
//     onClickGood = (e: Event) => { this.info = e.message }
// }

// 重载
// let suits = ["hearts", "spades", "clubs", "diamonds"]

// function pickCard(x: any): any {
//     if (typeof x === "object") {
//         let pickCard = Math.floor(Math.random() * x.length)
//         return pickCard
//     } else if (typeof x === "number") {
//         let pickedSuit = Math.floor(x / 13)
//         return { suit: suits[pickedSuit], card: x % 13 }
//     }
// }

// let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }]
// let pickedCard1 = myDeck[pickCard(myDeck)]
// console.log("card " + pickedCard1.card + " of " + pickedCard1.suit) // card 10 of spades

// let pickedCard2 = pickCard(15)
// console.log("card " + pickedCard2.card + " of " + pickedCard2.suit) // card 2 of spades

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x: any): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit); // card: 4 of hearts

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit) // card: 2 of spades