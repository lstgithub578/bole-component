<template>
  <div>
    <bo-table :data="data" :options="objOptions"> </bo-table>
  </div>
</template>

<script setup lang="ts">
import { type TableObjectColumns } from 'bole-component'

const objOptions: TableObjectColumns = {
  name: '姓名',
  age: {
    label: '年龄'
  }
}

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
