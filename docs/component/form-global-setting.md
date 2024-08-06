---
title: Form 表单全局配置
lang: zh
---

# Form 表单全局配置

表单的全局配置，可以为表单注册组件，组件的公共props等

## 全局配置

首先导入`setFormConfig`, 然后可以根据[`全局配置选项`](#全局配置选项)定义表单的公共配置，下面是一个简单的例子

::: tip
注意需要在`main.ts/js`中导入配置
:::

```ts
import { setFormConfig } from 'bole-component'

setFormConfig({
  formProps: {
    // 设置全局表单域标签的后缀为“：”
    labelSuffix: '：'
  },
  componentProps: {
    // 设置所有输入框可以清空
    input: {
      clearable: true
    },
    // 设置所有下拉框可以清空
    select: {
      clearable: true
    }
  },
  componentPlaceholder: {
    // 设置输入框的默认占位符
    input: (option: FormComponentOption) => `输入${option.label || '该项'}`
  },
  // 为表单注册组件
  components: {
    // IconSelect: IconSelect
  }
  // 异步数据解析，请看下面章节
  // asyncDataParser(
  // func: Function,
  // formInstance: FormInstance,
  // ...args: any[]
  // ){

  // }
})
```

## 异步数据解析

前面提到，对于`select`、`radio`、`checkbox`、`cascader`类型组件，可以通过`asyncData`配置组件的异步数据. 如果对异步数据还不了解，请看[`异步数据`](./form.md#异步数据)

表单自带异步数据解析器，如果不符合您的业务需求，可自行更改；下面是默认解析器的代码：

```ts
{
  asyncDataParser: (
    // FormOptionComponent 传入的asyncData方法
    func: Function,
    // 表单实例
    formInstance: FormInstance,
    // 使用execAsyncDataFunc时传入的参数
    ...args: any[]
  ) => {
    /**
     * 默认解析器适用的数据结构，
     * {
     *  如果存在data属性，优先拿data属性的数据
     *  data: []
     * }
     */

    // 需要返回promise
    return new Promise((resolve, reject) => {
      func(formInstance, ...args).then((res: any) => {
        resolve(res?.data || res)
      })
    })
  },
}

```

::: warning
如果您需要自定义异步数据解析器，请务必返回一个promise
:::

## 全局配置选项 FormConfig

| 名称                 | 说明                                                                                                                                            | 类型                                                                              | 默认值 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------ |
| formProps            | 表单的props                                                                                                                                     | [`FormProps`](https://element-plus.org/zh-CN/component/form.html#form-attributes) | {}     |
| colProps             | el-col的props                                                                                                                                   | [`ColProps`](https://element-plus.org/zh-CN/component/layout.html#col-attributes) | {}     |
| componentProps       | 组件的props                                                                                                                                     | `object`                                                                          | {}     |
| componentPlaceholder | 组件的默认提示                                                                                                                                  | `Record<string, string \| ((option: FormComponentOption) => string)>`             | {}     |
| components           | 局部注册组件                                                                                                                                    | `object`                                                                          | {}     |
| asyncDataParser      | 异步数据解析器,第一个为`FormComponentOption`传入的`asyncData`,第二个为表单暴露的熟悉和方法，第三个是表单`execAsyncDataFunc`方法执行时传入的参数 | `(func: Function, form: FormInstance, ...args: any[]) => any`                     |        |
