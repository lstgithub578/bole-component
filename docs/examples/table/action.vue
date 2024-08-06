<template>
  <div>
    <bo-table
      :data="data"
      :options="options"
      :action="{
        label: '操作列',
        buttons: [
          {
            props: {
              type: 'warning',
              size: 'small'
            },
            label: '修改'
          },
          {
            props({ row, column, $index }) {
              return {
                type: 'danger',
                size: 'small',
                disabled: $index === 0
              }
            },
            label: '刪除',
            click() {
              // do something
            }
          }
        ]
      }"
    >
    </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableArrayColumns } from 'bole-component'

defineOptions({
  name: 'TableAction'
})

const options: TableArrayColumns = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'hobby',
    label: '爱好'
  }
]

const data = [
  {
    name: '张三',
    age: 18,
    hobby: '唱'
  },
  {
    name: '李四',
    age: 22,
    hobby: '跳'
  },
  {
    name: '小明',
    age: 22,
    hobby: 'rap'
  }
]
</script>

<style scoped></style>
