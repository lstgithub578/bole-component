<template>
  <div>
    <bo-table :data="data" :options="options"> </bo-table>
    <el-button style="margin-top: 10px" @click="showAgeCol = !showAgeCol" type="primary">{{
      (showAgeCol ? '隐藏' : '显示') + '年龄列'
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type TableArrayColumns } from 'bole-component'

defineOptions({
  name: 'TableColumnShow'
})

const showAgeCol = ref(true)

const options: TableArrayColumns = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'age',
    label: '年龄',
    show: () => {
      return showAgeCol.value
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
