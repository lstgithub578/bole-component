---
title: Form 表单
lang: zh
---

# Form 表单

表单支持数组和表单配置，示例中大部分使用了对象配置

## 基础用法(数组配置)

::: demo 使用<a href='#FormArrayOptions'>`FormArrayOptions`</a>定义表单

form/basic-arr

:::

## 基础用法(对象配置)

::: demo 使用 <a href='#FormObjectOptions'>`FormObjectOptions`</a>定义表单

form/basic-obj

:::

## 内置组件

::: demo form 表单自带`8`种组件，分别是`input` `number` `select` `radio` `checkbox` `switch` `cascader` `date`;

form/built-in-component

:::

## 组件的props

下面的例子展示如果给组件添加props，`props: (formInstance => Props) | Props` 可以是函数或者是对象,`item: (formInstance => Props) | Props`； 以下带选项的组件：`select`、`radio`、`checkbox`可以通过设置 `dataItemProps` 来设置某项的props
::: demo

form/props

:::

## 插槽

可以通过定义`type:"slot"`来实现插槽，作用域上可以获取[`formExpose`](#form-expose)上所有API
::: demo
form/slot

:::

## 组件的插槽

可以通过定义`slots`来实现组件的插槽，目前支持`input`、`number`、`select`、`cascader`和`扩展组件`
::: demo

form/component-slot

:::

## 扩展组件

自定义表单组件，只需要组件上实现 `v-model` 双向绑定，即可与表单一起使用。下面是一个很简单的选择图标的扩展组件的例子，你必须全局注册或局部注册该组件；表单给组件传入了[`formExpose`](#form-expose)上所有API和绑定了[`FromComponentOption`](#formcomponentoption)的`props`和`event`

::: details 自定义选择图标组件代码

```vue
<template>
  <div>
    <el-radio-group v-model="model" @change="emits('change', $event)">
      <el-radio value="search">
        <el-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-6fbb019e="">
            <path
              fill="currentColor"
              d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
            ></path>
          </svg>
        </el-icon>
      </el-radio>
      <el-radio value="house">
        <el-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-6fbb019e="">
            <path
              fill="currentColor"
              d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"
            ></path>
          </svg>
        </el-icon>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'IconSelect'
})

const model = defineModel({ type: String })
const emits = defineEmits(['change'])
</script>
```

:::

::: demo

form/extend

:::

## 组件前置或者后置内容

可以使用`prepend`和`append`定义组件前置和后置内容，使用`componentPrepend`和`componentAppend`定义全部组件的前置和后置内容
::: demo

form/prepend-and-append

:::

## 带数据选项的组件

### 组件数据

::: demo 对于`select`、`radio`、`checkbox`、`cascader`类型组件，可以通过`data`配置组件的数据, `data`可以是数组或者对象。 除cascader外, 可以通过`dataGetter`和`labelGetter`分别配置选项的值和显示的内容

form/data-compoment

:::

### 异步数据

对于`select`、`radio`、`checkbox`、`cascader`类型组件，可以通过`asyncData`配置组件的异步数据,`asyncData`要求是一个函数，并返回`Promise`；异步数据可自行解析，详情请看[`异步数据解析器`](./form-global-setting.md#异步数据解析)
::: demo

form/async-data

:::

### props和数据的联动性

::: demo 这个例子展示了`props`和数据的联动性

form/props-data-linkage

:::

### 组件间的数据联动

::: demo 这个例子展示组件间的数据联动

form/component-data-linkage

:::

## 组件的显示与隐藏

::: demo 可以通过`show`来配置组件的显示与隐藏

form/show

:::

## 表单验证(复杂验证)

当表单验证规则需要用到表单数据时，可以传入一个函数，函数返回类型为`FormRules`
::: demo

form/validation

:::

## Form Attributes

| 名称               | 说明                                                                                       | 类型                                                | 默认值 |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------ |
| `formProps`        | [element plus表单属性](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `object`                                            | {}     |
| `options`          | [表单配置](#options)，支持[`数组`](#基础用法-数组配置)或者[`对象`](#基础用法-对象配置)形式 | `object\|array` [**FormOptions**](#formoptions)     |
| `rules`            | 表单的验证规则,可以传入一个方法，方法参数接收表单实例                                      | `object`\| `(formInstance: FormInstance)=>object`   | {}     |
| `model`            | 表单默认值                                                                                 | `object`                                            |        |
| `autoGetAsyncData` | 组件初始化时是否自动获取动态数据，在`dialog`中使用时默认值为`false`                        | `boolean`                                           | true   |
| `componentPrepend` | 组件的统一前置内容。接收一个方法，第一个参数是vue的渲染函数，第二个是表单暴露的实例        | `(h: Function, formInstance: FormInstance)=> VNode` |        |
| `componentAppend`  | 组件的统一后置内容。同上                                                                   | `(h: Function, formInstance: FormInstance)=> VNode` |        |
| `rowProps`         | [el-row 的 props](https://element-plus.org/zh-CN/component/layout.html#row-attributes)     | `object`                                            | null   |
| `colProps`         | [el-col 的 props](https://element-plus.org/zh-CN/component/layout.html#col-attributes)     | `object`                                            | null   |

### FormOptions

formOptions分为`FormObjectOptions`和`FormObjectOptions`，都是由 `FormComponentOption` 组成，只是`FormObjectOptions`每项上没有`key`API配置

#### FormComponentOption

::: warning
注意 **`input`** **`number`** 组件上没有 `data` `labelGetter` `valueGetter` `asyncData` `dataItemProps` 这5个API,
**`cascader`** 上没有`labelGetter` `valueGetter` `dataItemProps` 这3个API
:::
| 名称 | 说明 | 类型 | 是否必须 | 默认值 |
| ---- | ------- | ----| ---- | ---- |
| `key` | 字段标识（仅存在于使用数组配置时） | `string` | 是 | |
| `type` | 组件类型，`input` `number` `select` `radio` `checkbox` `switch` `cascader` `date` `slot` `extend` | `string` | 是 | |
| `label` | form-item的label | `string` | 否 | |
| `props` | 组件的props | `object` | 否 | |
| `show` | 是否显示该表单项 | `boolean` | 否 | `true` |
| `colProps` | el-col的props | `object` | 否 | `{}` |
| `formItemProps` | from-item的props | `object` | 否 | `{}` |
| `prepend` | 组件的前置内容 | `(h: Function, formInstance: FormInstance) => VNode \| VNode` | 否 | |
| `append` | 组件的后置内容 | `(h: Function, formInstance: FormInstance) => VNode \| VNode` | 否 | |
| `event` | 组件的事件 | `(formInstance: FormInstance) => Record<string, Function>` | 否 | `{}` |
| `slots` | 组件的插槽，目前支持`input`、`number`、`select`、`cascader`和`扩展组件` | `(instance: FormInstance) => Record<string, VNode>` | 否 | `{}` |
|`data`| 下拉选项的数据 | `object` \| `array` | 否 | `[]` |
|`labelGetter`| 选项的label, 接收一个函数，第一个参数为每项数据，第二项为没项数组的索引（对象时为key） | `(item: any, index: string \| number) => any` | 否 | |
|`valueGetter`| 选项的value, 接收一个函数，第一个参数为每项数据，第二项为没项数组的索引（对象时为key） | `(item: any, index: string \| number) => any` | 否 | |
|`asyncData`|异步数据，优先级比data高。 接收一个函数，第一个参数为`FormInstance`|`(instance: FormInstance, ...args: any[]) => Promise<any>`|否||
|`dataItemProps`|每项数据的props|`((instance: FormInstance) => Object)` \| `Object` |否||

`radio`组件特有的API

#### RadioOption

| 名称     | 说明                 | 类型      | 是否必须 | 默认值  |
| -------- | -------------------- | --------- | -------- | ------- |
| `button` | 选项是否为button类型 | `boolean` | 否       | `false` |

`checkbox`组件特有的API

#### CheckboxOption

| 名称     | 说明                 | 类型      | 是否必须 | 默认值  |
| -------- | -------------------- | --------- | -------- | ------- |
| `button` | 选项是否为button类型 | `boolean` | 否       | `false` |

## Form Expose

表单暴露的属性和方法，ts类型为`FormInstance`

| 名称                 | 说明                                                                                     | 类型                                           |
| -------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `formData`           | 表单数据,为响应式数据                                                                    | `object`                                       |
| `model`              | props传入的`model`                                                                       | `object`                                       |
| `elForm`             | [element表单的实例](https://element-plus.org/zh-CN/component/form.html#formitem-exposes) | `object`: `MaybeRef<ElementPlus.FormInstance>` |
| `getData`            | 获取表单的方法，返回一个promise,将会进行验证操作                                         | `<T = any>() => Promise<T>`                    |
| `componentData`      | 组件的数据（data或asyncData获得的数据）                                                  | `object`                                       |
| `setData`            | 设置表单的数据                                                                           | `(data: object) => void`                       |
| `resetData`          | 重置表单的数据                                                                           | `() => void`                                   |
| `getAsyncData`       | 获取异步数据                                                                             | `(key?: string \| string[]) => void`           |
| `execAsyncDataFunc`  | 执行异步数据的方法，即某项组件的asyncData方法                                            | `(key: string, ...args: any[]) => void`        |
| `clearComponentData` | 清空某项组件的数据，紧对带`data`或`asyncData`的组件有效                                  | `(key: string \| string[]) => void`            |
