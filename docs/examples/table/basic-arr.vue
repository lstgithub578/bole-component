<template>
  <div>
    <bo-table :data="data" :options="arrOptions"> </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableArrayColumns } from 'bole-component'

const arrOptions: TableArrayColumns = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'age',
    label: '年龄'
  }
]

const data = [
  {
    name: '张三',
    age: 18
  },
  {
    name: '李四',
    age: 22
  },
  {
    name: '小明',
    age: 22
  }
]
</script>

<style scoped></style>
