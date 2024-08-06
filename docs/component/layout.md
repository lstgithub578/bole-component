---
title: Layout 布局组件
lang: zh
---

# Layout 布局组件

## 基础用法

::: demo

layout/basic

:::

## 注意事项

::: danger layout里面的table不能使用`action`prop

```vue
<template>
  <BoLayout>
    <template #default="{ hiddenColums }">
      <!-- ❌ 错误用法，action不能直接使用对象配置，hiddenColums更改后会导致options的computed刷新，请使用插槽或者将action作为变量 -->
      <BoTable
        :options="[...]"
        :hiddenColsByLabel="hiddenColums"
        :action="{
          label: '操作列',
          buttons: [
            {
              label: '修改'
            },
            {
              label: '刪除'
            }
          ]
        }"
      >
      </BoTable>
    </template>
  </BoLayout>

  <!--  ✅ 正确用法，使用插槽 -->
  <BoLayout>
    <template #default="{ hiddenColums }">
      <BoTable :options="[...]" :hiddenColsByLabel="hiddenColums">
        <template #action>
          <el-button type="warning">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </BoTable>
    </template>
  </BoLayout>
</template>
```

:::

## Layout Attributes

| 名称              | 说明                 | 类型                                                           | 默认值    |
| ----------------- | -------------------- | -------------------------------------------------------------- | --------- |
| `hideToolbarBtns` | 需要隐藏的工具栏按钮 | `Array`:`"refresh" \| "size" \| "colToggle" \| "searchToggle"` | []        |
| `defaultSize`     | 默认的大小           | `String`:`"large" \| "default" \| "small"`                     | "default" |

## Layout 事件

| 名称      | 说明                 | 类型         |
| --------- | -------------------- | ------------ |
| `refresh` | 点击刷新按钮时的事件 | `() => void` |

## Layout 插槽

| 名称                | 说明                                           |
| ------------------- | ---------------------------------------------- |
| `toolbar-left-btn`  | 工具栏左边按钮，将会追加在【刷新】按钮后面     |
| `toolbar-rigth-btn` | 工具栏右边按钮，将会追加在【表格大小】按钮后面 |
