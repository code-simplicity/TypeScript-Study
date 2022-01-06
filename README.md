# 什么是TypeScript

## 理解

**`TypeScript`（Typed JavaScript at Any Scale）**，就是指添加了类型系统的`JavaScript`，适用于任何规模的项目。`TypeScript`强调了两个重要的特性--“类型系统”、“适用于任何规模”。

## 特性

### 类型系统

“类型系统”是`TypeScript`最核心的特性。

### 类型分类

类型系统按照**类型检查机制**可以分为动态类型和静态类型。`TypeScript`是静态类型。

**静态类型**是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。`TypeScript`在运行时先编译为`JavaScript`，在编译阶段就会进行类型检查，所以`TypeScript`是静态类型。

```ts
let foo = 10;
foo.split(' '); // 类型“number”上不存在属性“split”,直接类型检查报错
```

**动态类型**是指在运行的时候才会进行类型检查，这种语言的类型错误往往都是在运行的时候出现错误，而`JavaScript`是一门解释型语言，没有编译阶段，所以它是**动态类型**。下面这个代码只有在运行的时会报错：

```js
let foo = 10
foo.split(" ") // TypeError: foo.split is not a function
```

上面两个代码块看起来是一样的，都是报错原因和检查原因为什么会不一样呢？原因是在于`TypeScript`有着强大的类型推断能力，即使不用声明变量`foo`的类型，`TypeScript`也能推断出这事一个`number`类型的变量，而完整的写法是如下的。

```ts
let foo: number = 10
foo.split(' ') // 类型“number”上不存在属性“split”。
```

### 弱类型语言

类型系统按照**是否允许隐式类型转换**来分类，可以分为强类型和弱类型。

以下的代码不管在`JavaScript`还是在`TypeScript`中都可以正常运行，运行时候数字`1`会被隐式类型转换为字符串`1`，而`+`号会被识别为字符串拼接，所以它们最后输出的结果都是`"11"`

```js
console.log(1 + '1') // 11
```

`TypeScript`完全兼容`JavaScript`的，它不会修改`JavaScript`运行时的特性，所以它们都是**弱类型**语言。

类型系统体现了`TypeScript`核心设计理念，在完整保留了`JavaScript`运行时行为的基础上，引入静态类型系统来提高代码的可维护性，减少可能出现的bug。

### 适用于任何规模

TypeScript 非常适用于大型项目——这是显而易见的，类型系统可以为大型项目带来更高的可维护性，以及更少的 bug。

在中小型项目推行`TypeScript`的最大障碍就是认为`TypeScript`需要编写一些额外的代码，降低开发效率，但是有了**类型推论**，大部分类型都不需要手动声明，相反，`TypeScript`增强了编辑器的功能，包括代码补全，接口提示，跳转到定义，代码重构等。这在很大程度上提高了开发效率，而且，`TypeScript`有近百个**编译选项**，可以自定义编译选项来降低类型检查的标准。

## 发展

目前的`TypeScript`版本已经迎来了`TypeScript 4.5.4`时代，目前很多大型项目都是基于`TypeScript`编写，成功经受住了考验。

`TypeScript`始终保持着与`ECMAScript`标准的同步发展。

## 安装

`TypeScript`采用命令行工具进行安装。

```js
npm install -g typescript
```

首先就是全局安装`TypeScript`，在安装完成之后，我们就可以在任何地方执行了`tsc`命令。

编译一个`TypeScript`文件如下：

```ts
 tsc Hello-TypeScript.ts
```

同时也可以采用如下的编辑方式，采用`ts-node`命令编译，可以直接在控制台查看编译输出的结果，不需要将`ts`编译成`js`。

安装`ts-node`。

```sh
npm install -g ts-node
```

采用全局安装的方式进行安装即可，具体的`ts-node`的一些配置请访问其`github`地址查看[ts-node](https://github.com/TypeStrong/ts-node)。

编译一个简单的`TypeScript`代码。

```ts
console.log(1 + '1') // 11
```

通过如下命令编译。

```ts
ts-node Hello-TypeScript.ts
```

编译结果如下图。

![编译结果](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/83c3c78a15aae0a28bb32e2831818a82-20211224160953-cf7b52.png)

编写一个`Hello-TypeScript.ts`文件之后，通过`tsc` + 文件名的方式就可以编译一个`ts`文件，将文件编译成`.js`文件。后续不再使用`tsc`命令编译，统一采用`ts-node`编译。

![ts文件编译成js](https://raw.githubusercontent.com/dpy0912/PicGo/main/Roaming/picgo/2021/12/24/5ceaf50382575e1dff9a4022a56be177-20211224153712-0fd7f3.png)

## Hello TypeScript

下面通过一个简单的例子来了解`TypeScript`。


```ts
function sayTypeScript(info: string) {
    if (typeof info === "string") {
        return 'Hello, ' + info;
    } else {
        throw new Error("typescript is not a string")
    }
}

let info = 'TypeScript';
console.log(sayTypeScript(info));
```

上面代码中定义了一个函数`sayTypeScript`，`sayTypeScript`的形参`info`的类型是一个`string`字符串类型的，通过判断`info`类型，然后输出不同的结果，如果`info`的类型为`string`为真，输出下图所示结果，为假就编译不通过。具体请继续阅读下面内容。

![Hello, TypeScript](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/c18fe10dd7a02a83a392057bf0e310ee-20211224161454-9eb8bc.png)。

将上面代码函数的参数`info`的类型改为`number`类型，再进行编译。

```ts
function sayTypeScript(info: string) {
    if (typeof info === "string") {
        return 'Hello, ' + info;
    } else {
        throw new Error("typescript is not a string")
    }
}

let info = 1;
console.log(sayTypeScript(info));
```

通过查看编译结果，直接就编译失败了，报错信息如下，***Argument of type 'number' is not assignable to parameter of type 'string**。类型装换失败。

![编译失败](https://raw.githubusercontent.com/dpy0912/PicGo/main/images/Roaming/picgo/2021/12/24/445f960306a75be2268212bbe38d471f-20211224161906-1d2f36.png)