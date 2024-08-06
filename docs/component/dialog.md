---
title: Dialog 对话框
lang: zh
---

# Dialog 对话框

## 基础用法

可以使用`open`方法来打开对话框
::: demo
dialog/basic
:::

## 对话框宽度

可以在打开的时候使用`width`定义对话框宽度
::: demo
dialog/width
:::

## 对话框高度

可以在打开的时候使用`height`定义对话框高度；可以使用固定高度或者百分比高度，使用百分比高度时，推荐将`dialog`的`align-center`设置为`true`，百分比高度基于`window.innerHeight`来计算；高度包括 header和footer的高度
::: demo
dialog/height
:::

## 手动处理确定事件

通过`confrim`函数来手动处理确定事件，如果不传`confrim`，则点击确定按钮后默认关闭
::: demo
dialog/confrim
:::

## 手动处理取消事件

通过`cancel`函数来手动处理取消事件，如果不传`cancel`，则点击取消按钮后默认关闭
::: demo
dialog/cancel
:::

## 按钮文字

通过`confirmBtnText`和`cancelBtnText`来控制确定和取消按钮的文字
::: demo
dialog/btn-text
:::

## 确定按钮的loading

通过`confrim`函数中的`loading`和`stopLoading`参数来控制确定按钮的加载状态
::: demo
dialog/confrim-loading
:::

## 插槽

通过插槽自定义 header 和 footer
::: demo
dialog/slot
:::

## Dialog Attributes

| 名称                        | 说明                                                                                          | 类型      | 默认值 |
| --------------------------- | --------------------------------------------------------------------------------------------- | --------- | ------ |
| `dialogProps`               | [`el-dialog`的原生props](https://element-plus.org/zh-CN/component/dialog.html#attributes)     | `object`  | `{}`   |
| `getAsyncDataWhenEveryOpen` | 是否每次打开表单弹窗的时候都获取异步数据，如果为`false`只有第一次打开弹窗的时候才获取异步数据 | `boolean` | `true` |

## Form Expose

对话框暴露的属性和方法，ts类型为`DialogInstance`

| 名称     | 说明                                                                  | 类型                                              |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| `open`   | 打开弹窗的方法, 参数详情请看[`DialogOpenOptions`](#dialogopenoptions) | `(dialogOpenOptions?: dialogopenoptions) => void` |
| `inject` | 表单的注入的内容                                                      | `object`: [`DialogInject`](#dialoginject)         |

### DialogOpenOptions

| 名称             | 说明                                       | 类型                                                        | 默认值   |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------- | -------- |
| `title`          | 对话框标题                                 | `string`                                                    | `""`     |
| `top`            | dialog CSS 中的 margin-top 值，默认为 15vh | `string`                                                    | `"15vh"` |
| `width`          | 对话框宽度                                 | `string`                                                    | `"50%"`  |
| `height`         | 对话框高度，支持固定高度或者百分比         | `string`                                                    | `"auto"` |
| `confirmBtnText` | 确定按钮的文字                             | `string`                                                    | `"确定"` |
| `cancelBtnText`  | 取消按钮的文字                             | `string`                                                    | `"取消"` |
| `setFormData`    | 设置弹窗表单中表单的值                     | `((callBack: (form: FormInstance) => void) => any) \| null` |          |
| `validateForm`   | 点击“确定”按钮时是否对表单进行验证         | `boolean`                                                   | `true`   |
| `confirm`        | 点击确定按钮的事件                         | `(param: DialogConfirmParam<T>) => void`                    |          |
| `cancel`         | 点击取消按钮的事件                         | `(param: DialogCloseParam) => void`                         |          |

#### DialogConfirmParam

| 名称          | 说明                                                 | 类型       |
| ------------- | ---------------------------------------------------- | ---------- |
| `close`       | 关闭弹窗方法                                         | `Function` |
| `loading`     | 触发“确认”按钮loading                                | `Function` |
| `stopLoading` | 取消“确认”按钮loading                                | `Function` |
| `data`        | 跟`form`组件一起使用时才有的属性，详情请看`弹窗表单` | `Function` |

#### DialogCloseParam

| 名称    | 说明         | 类型       |
| ------- | ------------ | ---------- |
| `close` | 关闭弹窗方法 | `Function` |

#### DialogInject

表单注入的内容
| 名称 | 说明 | 类型 |
|------|-----|------|
|`form`|详情请看`弹窗表单`|`object`: `FormInstance`|
