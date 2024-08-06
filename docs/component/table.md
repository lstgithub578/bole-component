---
title: Table 表格
lang: zh
---

# Table 表格

## 基础用法（数组配置）

使用`TableArrayColumns`定义表单

::: demo
table/basic-arr
:::

使用`TableObjectColumns`定义表单

## 基础用法（对象配置）

::: demo
table/basic-obj
:::

## 插槽

只需要配置`slot`就可以使用插槽
::: demo
table/slot
:::

## 多级表头

通过`children`来配置按钮
::: demo
table/children
:::

## 列的props

通过`props`可以配置`el-table-column`的props
::: demo
table/props
:::

## 列的按钮

如果列中想要显示按钮但是又不想用插槽，可以使用`buttons`来配置按钮
::: demo
table/buttons
:::

## 列的显示与隐藏

可以使用`show`来控制列的显示与隐藏
::: demo
table/show
:::

## 操作列

可以使用`action`prop在末尾添加“操作”列，列的标题默认为“操作”；`action`可以在[`TableColums`]抽离在另一个文件时使用

::: warning
推荐使用插槽
:::

::: demo
table/action
:::

## Table Attributes

::: tip
除了下面的Attributes，您还可以传入`el-table`的原生props和事件，例如`show-header`、`selection-change`等，更多Attributes请看[el-table文档](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)
:::

| 名称                | 说明           | 类型                                                                   | 默认值 |
| ------------------- | -------------- | ---------------------------------------------------------------------- | ------ |
| `data`              | 表格数据       | `array`                                                                | []     |
| `options`           | 表格配置项     | [`TableColums`](#tablecolums)                                          |        |
| `hiddenColsByLabel` | 根据标题隐藏列 | `array`                                                                | []     |
| `action`            | 操作列         | `object`: `{label?: String} & Omit<TableColumn, "children" \| "slot">` | []     |

### TableColums

TableColums由`TableArrayColumns`和`TableObjectColumns`，都是由 `TableColum` 组成，其中`TableObjectColumns`对象上的value可以是字符串
| 名称 | 说明 | 类型 | 是否必须 | 默认值 |
| ---- | ------- | ----| ---- | ---- |
|`label`|列的标题,优先级比props的label低|`string`|否||
|`prop`|列内容的字段名,优先级比props的prop低|`string`|否||
|`props`|[el-table-column的props](https://element-plus.org/zh-CN/component/table.html#table-column-api)|`object` |否||
|`children`|子级列|`array:Array<TableColumn>`|否||
|`buttons`|列内容的字段名,优先级比props的prop低|[`ButtonOption`](#buttonoption)|否||
|`show`|是否显示列|`show?: boolean \| (() => boolean)`|否|`true`|
|`slot`|插槽名称|`string`|否||

#### ButtonOption

| 名称    | 说明               | 类型                                                                                                 | 是否必须 | 默认值 |
| ------- | ------------------ | ---------------------------------------------------------------------------------------------------- | -------- | ------ |
| `label` | 按钮的文字         | `string`                                                                                             | 否       |        |
| `props` | `el-button`的props | `((scope: {row: any,  column: any, $index:number}) => Partial<ButtonProps>) \| Partial<ButtonProps>` | 否       |        |
| `click` | 点击按钮的事件     | `Function`                                                                                           | 否       |        |
