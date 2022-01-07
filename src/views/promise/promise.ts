const PENDING: string = "PENDING"
const FULFILLED: string = "FULFILLED"
const REJECTED: string = "REJECTED"

class Promiser {
    status: string
    value: undefined
    reason: undefined
    onResolvedCallbacks: any[]
    onRejectedCallbacks: any[]
    constructor(executor: any) {
        this.status = PENDING
        this.value = undefined;
        this.reason = undefined;
        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];

        let resolve = (value: any) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason: any) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 依次将对应的函数执行
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled: any, onRejected: any) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }

        if (this.status === PENDING) {
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value)
            });

            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}

const promise = new Promiser((resolve: any, reject: any) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then(
    (data: any) => {
        console.log('success', data)
    },
    (err: any) => {
        console.log('faild', err)
    }
)