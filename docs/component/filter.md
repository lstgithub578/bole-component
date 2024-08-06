---
title: Filter 搜索组件
lang: zh
---

# Filter 搜索组件
搜索组件基于 [`Form`](./form.md) 组件, 用法几乎与 Form 组件一致

## 基础用法

::: demo

filter/basic

:::

## Filter Attributes

| 名称          | 说明                 | 类型  | 默认值 |
| ------------- | ------------------- | ----- | ------ |
| `options` | `Form`组件的[`Options`](./form.md#formoptions) | `Object` | {} |
| `model` | `Form`组件的[`model`](./form.md#form-attributes) | `Object` | {} |
| `formProps`   | [element plus表单属性](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `object` |     {}   |
| `dataChange`   | 表单的值发生变化时的处理函数 | `(data: Record<string, any>) => void` |    |
| `showSearchBtn`   | 是否显示搜索按钮 | `Boolean` |  true  |
| `showResetBtn`   | 是否显示重置按钮 | `Boolean` |  true  |
| `searchBtnText`   | 搜索按钮文字 | `String` |  '搜索'  |

## Filter 事件

| 名称          | 说明                 | 类型  |
| ------------- | ------------------- | ----- |
| `search` | 点击搜索按钮时的事件 | `(data: Record<string, any>) => void` |

## Filter 插槽

| 名称          | 说明                 |
| ------------- | ------------------- |
| `btn-append` |  右侧的追加按钮 |