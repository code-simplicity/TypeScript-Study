# 从零实现Promise-typescript版本

## Promise介绍

`Promsie`是`ES6`引入的一种异步编程的解决方案，比传统的解决方案多了回调函数和事件，所谓`Promise`简单来说就是一个容器，保存着某个未来才会结束的事件的结果。

`Promise`对象有以下两个特点

1. 对象的状态不受外界的影响。
2. 一旦状态改变，就不会发生变化。

怎么理解上面两个特点呢，首先先介绍一下**对象的状态不受外界影响**。`Promise`代表的是一个异步操作，一共有三种状态，`pending`（进行中），`fulfilled`（已完成），`rejected`（已失败）。只有异步操作的结果才可以决定是哪一种状态，其他任何时候都无法改变这种状态。

第二就是**一旦状态改变，就不会发生变化**，`Promise`状态的改变只有两种可能，状态只能是由`pending`变为`fulfilled`，`pending`变为`rejected`，只要这两种情况发生了，状态就不会再发生改变，会一直保持这个结果，将这种称之为`resolve`（已定型）。

## 实现`Promise`

### 实现功能

#### 实现resolve，reject和then方法

首先定义构造的接口`PromiseConstructor`

```ts
interface PromiseConstructor {
    readonly prototype: Promise<any>
}
```

