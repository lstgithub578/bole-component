<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>
</template>

<script setup lang="ts">
import { type FormObjectOptions } from 'bole-component'

defineOptions({
  name: 'ComponentShow'
})

const frontendSkills = ['vue', 'react', 'angular']
const backendSkills = ['java', 'mysql', 'golang']

const options: FormObjectOptions = {
  career: {
    label: '职业',
    type: 'radio',
    dataItemProps: {
      border: true
    },
    data: ['前端', '后端'],
    valueGetter: (item, index) => index
  },
  frontend: {
    label: '前端技能',
    type: 'select',
    data: frontendSkills,
    props: {
      multiple: true
    },
    show({ formData }) {
      return formData.career === 0
    }
  },
  backend: {
    label: '后端技能',
    type: 'select',
    data: backendSkills,
    props: {
      multiple: true
    },
    show({ formData }) {
      return formData.career === 1
    }
  },
  hidden: {
    label: '这是一项永久隐藏的组件',
    type: 'input',
    show: false
  }
}
</script>
