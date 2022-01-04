# 类型推断

## 介绍

`TypeScript`具有类型推断的这样一个功能，接下来我们将学习到类型推断的原理以及类型是如何被推断出来的。

## 基础

`TypeScript`中，在有些没有明确指出类型的地方，类型推断会帮助提供类型，比如下面的例子。

```ts
let x = 3
if (typeof x === "number") {
    console.log(x) // 3
}
```

上面代码中，变量`x`进行类型验证，如果`x`类型等于`number`，那么就会输出`x`的值`3`，变量`x`的类型被推断为`number`，这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

大多数情况下，类型推断是直接了当的，后面的例子，我们会进一步了解浏览器类型推断的细微区别。

## 最佳通用类型

当需要从几个表达式中推断类型的时候，会使用这些表达式的类型来推断出一个最合适的通用类型，例如。

```ts
let x = [0, 1, null]
```

为了推断`x`的类型，我们必须考虑所有元素的类型，这里有两种选择：`number`和`null`，计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。

由于最终的通用类型选自候选类型，有时候候选类型共享相同的通用类型，但是却没有一个类型能作为所有候选类型的类型，例如。

```ts
let zoo = [new Rhino(), new Elephant(), new Snake()]
```

这里我们想让`zoo`被推断为`Animal[]`类型，但是这个数组里面没有对象是`Animal`类型的，因此不能推断出这个结果，为了更正，当候选类型不能使用的时候我们需要明确的指出类型。

```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]
```

如果没有找到最佳的通用类型的话，类型推断的结果为联合类型，`（Rhino | Elephant | Snake）[]`。

## 上下文类型

`TypeScript`类型推断论也可以按照相反的方向进行，这叫做`按上下文归类`。按上下文归类会发生表达式的类型与所处的位置相关时。比如。

```ts
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button) // Error
}
```

这个例子会得到会得到一个类型错误，`TypeScript`类型检查器使用`window.onmousedown`函数的类型来推断右边函数表达式的类型，因此，就能推断出`mouseEvent`参数的类型了。如果函数表达式不是上下文类型的位置，`mouseEvent`参数的类型需要指定为`any`，这样也不会报错了。

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略，重写上面的代码。

```ts
window.onmousedown = function (mouseEvent: any) {
    console.log(mouseEvent.button) // Ok
}
```

上面的代码明确了参数类型，上下文类型就会被忽略，这样就不报错了，因为这里不会使用到上下文的类型。

上下文归类会在很多情况下使用到，通常包含函数的参数，赋值表达式的右边，函数断言，对象成员和数组字面量和返回值语句。上下文类型也会作为最佳通用类型的候选类型，比如。

```ts
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()]
}
```

这个例子里面，最佳通用类型有4个候选者，`Animal`，`Rhino`，`Elephant`，`Snake`，当然，`Animal`会被称为最佳通用类型。