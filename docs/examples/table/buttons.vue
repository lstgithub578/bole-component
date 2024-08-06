<template>
  <div>
    <bo-table :data="data" :options="options"> </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableArrayColumns } from 'bole-component'

defineOptions({
  name: 'ColumnButtons'
})

const options: TableArrayColumns = [
  {
    props: {
      type: 'selection',
      width: '40'
    }
  },
  {
    prop: 'name',
    label: '名称',
    props: {
      align: 'center',
      width: 100
    }
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'hobby',
    label: '爱好'
  },
  {
    label: '详情',
    buttons: [
      {
        // 按钮显示的文字
        label: '查看详情',
        // 按钮的props
        // props: {
        //     type: "success"
        // }
        props: ({ row, $index }) => {
          return {
            type: 'primary',
            disabled: $index === 1
          }
        },
        click() {
          // do something
        }
      },
      {
        label: '按钮二',
        props: {
          type: 'info'
        }
      }
    ]
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
