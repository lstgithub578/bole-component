<template>
  <div>
    <bo-table border :data="data" :options="options"> </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableArrayColumns } from 'bole-component'
import { h } from 'vue'

defineOptions({
  name: 'TableProps'
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
    props: {
      renderHeader() {
        return h(
          'div',
          {
            style: {
              color: 'skyblue'
            }
          },
          '年龄'
        )
      }
    }
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
