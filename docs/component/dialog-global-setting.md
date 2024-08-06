---
title: Form 表单全局配置
lang: zh
---

# Dialog 对话框全局配置

表单的全局配置，可以设置解析表单数据的方法、组件的公共props等

## 全局配置

首先导入`setDialogConfig`, 然后可以根据[`全局配置选项`](#全局配置选项)定义对话框的公共配置，下面是一个简单的例子

::: tip
注意需要在`main.ts/js`中导入配置
:::

```ts
setDialogConfig({
  dialogProps: {
    // 可以拖动的对话框
    draggable: true,
    // 居中的对话框
    alignCenter: true
  }
  // 表单数据解析，请看下面章节
  // formDataParser(value: any) {
  //   return xxx
  //   },
})
```

## 表单数据解析

表单数据解析用于`弹窗表单`, 即解析`setFormData`的返回值，可以看[`设置表单的数据`](./dialog-form.md#设置表单的数据)

对话框自带`setFormData`数据解析器，如果不符合您的业务需求，可自行更改；下面是默认解析器的代码：

```ts
{
   formDataParser: async (value: any) => {
    /**
     * 默认解析器适用的数据结构，
     * {
     *  如果存在data属性，优先拿data属性的数据
     *  data: []
     * }
     */

    if (value instanceof Promise) {
      try {
        value = await value
      } catch (error: any) {
        ElMessage.error(error)
      }
    }
    if (isObject(value)) {
      value = Object.assign({}, value)
      value = isObject(value.data) ? value.data : value
    }

    // 需要返回一个值
    return value
  },
}

```

## 全局配置选项 DialogConfig

| 名称             | 说明                                                        | 类型                                                                             | 默认值 |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- | ------ |
| `dialogProps`    | el-dialog的Props                                            | [`DialogProps`](https://element-plus.org/zh-CN/component/dialog.html#attributes) | `{}`   |
| `formDataParser` | 表单数据解析方法，为一个函数，参数接收`setFormData`的返回值 | `(value: any) => any`                                                            |
