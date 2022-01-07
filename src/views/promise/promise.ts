/* 
手写Promise-typescript版本
*/

// 定义接口
interface PromiseConstructor {
    readonly prototype: Promise<any>
    resolve(): Promise<void>
    resolve<T>(value: T | PromiseLink<T>): Promise<T>

    reject<T = never>(reason?: any): Promise<T>

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

const promise2 = new MyPromise<void>((resolve, reject) => {
    resolve()
}).catch(() => {
    console.log(1)
})

promise2.then(() => {
    return "step1"
}).then((res) => {
    return res + ":" + "setp2"
}).then((res) => {
    console.log(res) // step1:setp2
})




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
