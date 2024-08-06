<template>
  <bo-filter
    :options="options"
    :model="{ status: '启用' }"
    :formProps="{ labelWidth: '50px' }"
    @search="search"
  >
  </bo-filter>
</template>

<script setup lang="ts">
import { FormOptions } from 'bole-component'

defineOptions({
  name: 'FilterBasic'
})

const options: FormOptions = [
  {
    key: 'name',
    label: '姓名',
    type: 'input'
  },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    props: { clearable: true },
    data: ['启用', '停用']
  }
]

function search(data: any) {
  console.log(data)
}
</script>
