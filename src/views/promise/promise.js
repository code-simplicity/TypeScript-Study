"use strict";
/*
手写Promise-typescript版本
*/
exports.__esModule = true;
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
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["FULFILLED"] = "fulfilled";
    Status["REJECTED"] = "rejected";
})(Status || (Status = {}));
// 判断是否是promise
function isPromise(value) {
    return (((typeof value === "object" && value !== null) ||
        typeof value === "function") && typeof value.then === "function");
}
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        this.status = Status.PENDING;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        }
        catch (e) {
            // 出错直接 reject
            this._reject(e);
        }
    }
    MyPromise.prototype._resolve = function (value) {
        var _this = this;
        try {
            setTimeout(function () {
                if (isPromise(value)) {
                    value.then(_this._resolve.bind(_this), _this._reject.bind(_this));
                    return;
                }
                if (_this.status === Status.PENDING) {
                    _this.status = Status.FULFILLED;
                    _this.value = value;
                    _this.onFulfilledCallback.forEach(function (fn) { return fn(); });
                }
            });
        }
        catch (e) {
            this._reject(e);
        }
    };
    MyPromise.prototype._reject = function (value) {
        var _this = this;
        setTimeout(function () {
            if (_this.status === Status.PENDING) {
                _this.status = Status.REJECTED;
                _this.value = value;
                _this.onRejectedCallback.forEach(function (fn) { return fn(); });
            }
        });
    };
    MyPromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        var onfulfilledFn = typeof onfulfilled === "function" ? onfulfilled : function (v) { return v; };
        var onrejectedFn = typeof onrejected === "function" ? onrejected : function (e) {
            throw e;
        };
        var promise2 = new MyPromise(function (resolve, reject) {
            if (_this.status === Status.FULFILLED) {
                setTimeout(function () {
                    try {
                        var x = onfulfilledFn(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            if (_this.status === Status.REJECTED) {
                setTimeout(function () {
                    try {
                        var x = onrejectedFn(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            if (_this.status === Status.PENDING) {
                _this.onFulfilledCallback.push(function () {
                    try {
                        var x = onfulfilledFn(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                _this.onRejectedCallback.push(function () {
                    try {
                        var x = onrejectedFn(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        });
        // 实现链式调用
        return promise2;
    };
    return MyPromise;
}());
// 链式调用
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        var e = new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise>');
        e.stack = "";
        return reject(e);
    }
    var called = false;
    if (typeof x === "object" && x !== null || typeof x === "function") {
        try {
            var then = x.then;
            if (typeof then === "function") {
                then.call(x, function (y) {
                    if (called) {
                        return;
                    }
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called) {
                        return;
                    }
                    reject(r);
                });
            }
            else {
                resolve(x);
            }
        }
        catch (e) {
            if (called) {
                return;
            }
            called = true;
            reject(e);
        }
    }
    else {
        resolve(x);
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
var promise2 = new MyPromise(function (resolve, reject) {
    resolve();
});
promise2.then(function () {
    return "step1";
}).then(function (res) {
    return res + ":" + "setp2";
}).then(function (res) {
    console.log(res); // step1:setp2
});
// 忽略 typescript 校验
// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
    var dfd = {};
    dfd.promise = new MyPromise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
exports["default"] = MyPromise;
