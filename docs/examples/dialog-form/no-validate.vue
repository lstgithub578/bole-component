<template>
  <div>
    <bo-dialog ref="dialog">
      <bo-form :formProps="{ labelWidth: 'auto' }" :options="options" :rules="rules"></bo-form>
    </bo-dialog>
    <el-button type="primary" @click="open">打开表单</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type DialogInstance } from 'bole-component'
import { FormRules } from 'element-plus'

const options: FormObjectOptions = {
  name: '名称',
  age: {
    label: '年龄',
    type: 'number',
    props: {
      placeholder: '年龄'
    }
  },
  career: {
    label: '职业',
    type: 'select',
    data: ['前端开发', '后端开发']
  },
  introduction: {
    label: '个人简介',
    type: 'input',
    props: {
      type: 'textarea',
      rows: 4,
      showWordLimit: true,
      maxlength: 255
    }
  }
}

const rules: FormRules = {
  name: { required: true, message: '请输入名称' },
  age: {
    required: true,
    type: 'number',
    trigger: 'blue',
    message: '请输入年龄'
  },
  career: { required: true, message: '请选择年龄' }
}

const dialog = ref<DialogInstance>()

function open() {
  dialog.value?.open({
    title: '表单',
    validateForm: false,
    confirm({ data, close }) {
      console.log('data', data)
      close()
    }
  })
}
</script>

<style scoped></style>
