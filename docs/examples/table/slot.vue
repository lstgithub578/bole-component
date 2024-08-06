<template>
  <div>
    <bo-table :data="data" :options="arrOptions">
      <template #status="{ row }">
        <el-tag :type="row.status" effect="dark">{{ row.status }}</el-tag>
      </template>
    </bo-table>
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
  },
  {
    prop: 'status',
    label: '状态',
    slot: 'status'
  }
]

const data = [
  {
    name: '张三',
    age: 18,
    status: 'primary'
  },
  {
    name: '李四',
    age: 22,
    status: 'success'
  },
  {
    name: '小明',
    age: 22,
    status: 'info'
  }
]
</script>

<style scoped></style>
