/* 
手写Promise-typescript版本
*/

// 定义接口
interface PromiseConstructor {
    readonly prototype: Promise<any>
    resolve(): Promise<void>
    resolve<T>(value: T | PromiseLink<T>): Promise<T>

    reject<T = never>(reason?: any): Promise<T>

    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    all<T1, T2, T3, T4, T5, T6, T7>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

    all<T1, T2, T3, T4, T5, T6>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;

    all<T1, T2, T3, T4, T5>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;

    all<T1, T2, T3, T4>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;

    all<T1, T2, T3>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;

    all<T1, T2>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;

    all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
    // 看着有点多，其实上面都是表示传入参数是一个数组的情况，这样写是因为传入的 Promise<T> 中的 T 可能不同而重载不同元组类型

    // see: lib.es2015.iterable.d.ts
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]>;

    race<T>(values: readonly T[]): Promise<T extends PromiseLink<infer U> ? U : T>

    race<T>(values: Iterable<T>): Promise<T extends PromiseLink<infer U> ? U : T>

    new <T>(executor: (
        resolve: (value?: T | PromiseLink<T>) => void,
        reject: (reason?: any) => void) => void): Promise<T>
}

interface Promise<T> {
    then<result1 = T, result2 = never>(
        onfulfilled?: ((value: T) => result1 | PromiseLink<result1>) | undefined | null,
        onrejected?: ((reason: any) => result2 | PromiseLink<result2>) | undefined | null): Promise<result1 | result2>
    // catch方法
    catch<result = never>(onrejected?: ((reason: any) => result | PromiseLink<result>) | undefined | null): Promise<T | result>
}

interface PromiseLink<T> {
    then<result1 = T, result2 = never>(
        onfulfilled?: ((value: T) => result1 | PromiseLink<result1>) | undefined | null,
        onrejected?: ((reason: any) => result2 | PromiseLink<result2>) | undefined | null): PromiseLink<result1 | result2>
}

// new Promise((resolve) => {
//     resolve({
//         prop: 'common property',
//         // 这里我们自己构造了个 then 方法，Promise 会自动为 then 方法 reslove 和 reject 函数
//         then(reslove2: any) {
//             reslove2('promiselike')
//         }
//     })
// }).then((res) => {
//     // 果然，被当做成了 Promise
//     console.log(res) // promiselike
// })


// 定义枚举，响应状态的变量
enum Status {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

// 类型提取
type Resolve<T> = (value: T | PromiseLink<T>) => void
type Reject = (reason?: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type onFulfilled<T, result1> = ((value: T) => result1 | PromiseLink<result1>) | undefined | null
type onRejected<result2> = ((reason: any) => result2 | PromiseLink<result2>) | undefined | null

// 判断是否是promise
function isPromise(value: any): value is PromiseLink<any> {
    return (
        (
            (typeof value === "object" && value !== null) ||
            typeof value === "function") && typeof value.then === "function"
    )
}

class MyPromise<T> {
    status: Status = Status.PENDING
    private value!: T
    private reason: any
    private onFulfilledCallback: (() => void)[] = []
    private onRejectedCallback: (() => void)[] = []
    // 函数重载
    static resolve(): MyPromise<void>
    static resolve<T>(value: T | PromiseLink<T>): MyPromise<T>
    static resolve<T>(value?: T | PromiseLink<T>): MyPromise<T> {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise((resolve) => {
            resolve(value!)
        })
    }

    static reject<T = never>(reason?: any): MyPromise<T> {
        return new MyPromise((reject) => {
            return reject(reason!)
        })
    }

    constructor(executor: Executor<T>) {
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            // 出错直接 reject
            this._reject(e)
        }
    }
    private _resolve(value: T | PromiseLink<T>) {
        try {
            setTimeout(() => {
                if (isPromise(value)) {
                    value.then(this._resolve.bind(this), this._reject.bind(this))
                    return
                }
                if (this.status === Status.PENDING) {
                    this.status = Status.FULFILLED
                    this.value = value
                    this.onFulfilledCallback.forEach((fn) => fn())
                }
            })
        } catch (e) {
            this._reject(e)
        }
    }

    private _reject(value: any) {
        setTimeout(() => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED
                this.value = value
                this.onRejectedCallback.forEach((fn) => fn())
            }
        })
    }

    public then<result1 = T, result2 = never>(
        onfulfilled?: onFulfilled<T, result1>,
        onrejected?: onRejected<result2>): MyPromise<result1 | result2> {
        const onfulfilledFn = typeof onfulfilled === "function" ? onfulfilled : (v: T | result1) => v as result1
        const onrejectedFn = typeof onrejected === "function" ? onrejected : (e: any) => {
            throw e
        }
        const promise2 = new MyPromise<result1 | result2>((resolve, reject) => {
            if (this.status === Status.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilledFn!(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === Status.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejectedFn!(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === Status.PENDING) {
                this.onFulfilledCallback.push(() => {
                    try {
                        let x = onfulfilledFn!(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallback.push(() => {
                    try {
                        let x = onrejectedFn!(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
        // 实现链式调用
        return promise2
    }

    // catch方法
    public catch<result = never>(onrejected?: onRejected<result>): MyPromise<T | result> {
        return this.then(null, onrejected)
    }

    // all
    static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        values: readonly [
            T1 | PromiseLike<T1>,
            T2 | PromiseLike<T2>,
            T3 | PromiseLike<T3>,
            T4 | PromiseLike<T4>,
            T5 | PromiseLike<T5>,
            T6 | PromiseLike<T6>,
            T7 | PromiseLike<T7>,
            T8 | PromiseLike<T8>,
            T9 | PromiseLike<T9>,
            T10 | PromiseLike<T10>
        ]
    ): MyPromise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>

    static all<T>(values: Iterable<T | PromiseLike<T>>): MyPromise<T[]>

    static all<T>(values: Iterable<T | PromiseLike<T>>): MyPromise<T[]> {
        return new MyPromise((resolve, reject) => {
            const resultArr: T[] = []
            const doneArr: boolean[] = []
            let iter = values[Symbol.iterator]()
            let cur = iter.next()
            const resolveResult = (value: T, index: number, done?: boolean) => {
                resultArr[index] = value
                doneArr[index] = true
                if (done && doneArr.every((item) => item)) {
                    resolve(resultArr)
                }
            }
            for (let i = 0; !cur.done; i++) {
                const value = cur.value
                doneArr.push(false)
                cur = iter.next()
                if (isPromise(value)) {
                    value.then((value: T) => {
                        resolveResult(value, i, cur.done)
                    }, reject)
                } else {
                    resolveResult(value, i, cur.done)
                }
            }
        })
    }

    // race
    static race<T>(
        values: Iterable<T>
    ): MyPromise<T extends PromiseLike<infer U> ? U : T>

    static race<T>(
        values: readonly T[]
    ): MyPromise<T extends PromiseLike<infer U> ? U : T>

    static race<T>(
        values: Iterable<T>
    ): MyPromise<T extends PromiseLike<infer U> ? U : T> {
        return new MyPromise((resolve, reject) => {
            const iter = values[Symbol.iterator]()
            let cur = iter.next()
            while (!cur.done) {
                const value = cur.value
                cur = iter.next()
                if (isPromise(value)) {
                    value.then(resolve, reject)
                } else {
                    resolve(value as T extends PromiseLike<infer U> ? U : T)
                }
            }
        })
    }
}

// 链式调用
function resolvePromise<T>(
    promise2: MyPromise<T>,
    x: T | PromiseLink<T>,
    resolve: Resolve<T>,
    reject: Reject
) {
    if (promise2 === x) {
        const e = new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise>')
        e.stack = ""
        return reject(e)
    }
    let called = false
    if (typeof x === "object" && x !== null || typeof x === "function") {
        try {
            const then = (x as PromiseLink<T>).then
            if (typeof then === "function") {
                then.call(x, (y) => {
                    if (called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                },
                    (r) => {
                        if (called) {
                            return
                        }
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

// const promise = new MyPromise((resolve, reject) => {
//     resolve("success")
// })

// promise.then(
//     (res) => {
//         console.log(1) // 1
//         console.log(res) // success
//     },
//     (err) => {
//         console.log(2)
//         console.log(err)
//     }
// )

// const promise1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("异步成功")
//     }, 2000)
// })

// promise1.then(
//     (res) => {
//         console.log(3) // 3
//         console.log(res) // 异步成功
//     },
//     (err) => {
//         console.log(4)
//         console.log(err)
//     }
// )

// const promise2 = new MyPromise<void>((resolve, reject) => {
//     resolve()
// }).catch(() => {
//     console.log(1)
// })

// promise2.then(() => {
//     return "step1"
// }).then((res) => {
//     return res + ":" + "setp2"
// }).then((res) => {
//     console.log(res) // step1:setp2
// })

const promise1 = MyPromise.resolve(3);
const promise2 = 42;
const promise3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo")
    }, 100);
});

MyPromise.all([promise2, promise3]).then((values) => {
    console.log(values);
});




// // 忽略 typescript 校验
// // @ts-ignore
// MyPromise.defer = MyPromise.deferred = function () {
//     let dfd: any = {}
//     dfd.promise = new MyPromise((resolve, reject) => {
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }

// export default MyPromise
