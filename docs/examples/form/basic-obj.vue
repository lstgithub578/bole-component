<template>
  <div>
    <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="objOptions"> </bo-form>

    <div>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

const objOptions: FormObjectOptions = {
  // FormObjectOptions 可以使用字符串进行配置，解析为input输入框
  strongPoint: '特长',
  name: {
    type: 'input',
    label: '名称'
  },
  age: {
    type: 'number',
    label: '年龄'
  },
  status: {
    type: 'select',
    label: '状态',
    data: ['发呆', '运动', '搬砖'],
    props: {
      multiple: true
    }
  }
}

const form = ref<FormInstance>()

function submit() {
  form.value?.getData<any>().then((data) => {
    console.log('data', data)
  })
}

function reset() {
  form.value?.resetData()
}
</script>
