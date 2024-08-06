<template>
  <div>
    <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="arrOptions"> </bo-form>

    <div>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormArrayOptions, type FormInstance } from 'bole-component'

const arrOptions: FormArrayOptions = [
  {
    key: 'name',
    type: 'input',
    label: '名称'
  },
  {
    key: 'age',
    type: 'number',
    label: '年龄'
  },
  {
    key: 'status',
    type: 'select',
    label: '状态',
    data: ['发呆', '运动', '搬砖'],
    props: {
      multiple: true
    }
  }
]

const form = ref<FormInstance>()

function submit() {
  form.value?.getData<any>().then((data) => {
    console.log(data)
  })
}
function reset() {
  form.value?.resetData()
}
</script>
