<template>
  <div>
    <bo-dialog ref="dialog">
      <bo-form :formProps="{ labelWidth: 'auto' }" :options="options" :rules="rules"></bo-form>
    </bo-dialog>
    <el-button type="primary" @click="open(12)">打开并设置表单数据</el-button>
    <el-button type="primary" @click="open()">打开表单</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type DialogInstance } from 'bole-component'
import { FormRules } from 'element-plus'

const options: FormObjectOptions = {
  name: '名称',
  career: {
    label: '职位',
    type: 'select',
    data: ['前端开发', '后端开发']
  },
  hobby: {
    label: '爱好',
    type: 'checkbox',
    asyncData() {
      return Promise.resolve(['唱', '跳', 'rap'])
    }
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
  career: { required: true, message: '请选择年龄' },
  hobby: { required: true, type: 'array', message: '请选择爱好' }
}

const dialog = ref<DialogInstance>()

// 模拟回显表单数据
function getById(): any {
  return Promise.resolve({
    name: '鄙人张三',
    career: '前端开发',
    hobby: ['唱', '跳']
  })
}

function open(id?: number) {
  dialog.value?.open({
    title: '表单',
    setFormData: id ? getById() : null,
    confirm({ data, close, loading, stopLoading }) {
      console.log('data', data)
      loading()
      setTimeout(() => {
        stopLoading()
        close()
      }, 500)
    }
  })
}
</script>

<style scoped></style>
