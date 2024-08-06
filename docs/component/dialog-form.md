---
title: 弹窗表单
lang: zh
---

# Dialog 对话框

使用`弹窗表单`前，建议先查看[`Dialog`](./dialog.md)的用法

## 基础用法

`Dialog`的`open`方法中`confirm`的回调可以拿到`data`属性，即表单的值

::: demo
dialog-form/basic
:::

## 不验证表单

只需将`validateForm`设置成`false`点击“确定”按钮时不验证表单

::: demo
dialog-form/no-validate
:::

## 设置表单的数据

使用`setFormData`可以设置表单的数据；可以根据自己的需求解析`setFormData`的返回值，详情请看[`表单数据解析`](./dialog-global-setting.md#表单数据解析)

::: demo
dialog-form/set-form-data
:::

## 联动数据的处理

在使用`setFormData`设置表单的数据时，对于某些联动的数据，您可以通过调用`setFormData`的`callBack`回调参数进行二次获取异步数据，比如下面的例子中的`二级部门`和`三级部门`, 则需要等待表单数据设置完毕后再调用`setFormData`的`callBack`回调参数进行获取

::: demo
dialog-form/set-form-data-linkage
:::
