<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>
</template>

<script setup lang="ts">
import { type FormObjectOptions } from 'bole-component'

const options: FormObjectOptions = {
  name: {
    type: 'input',
    label: '输入框'
  },
  age: {
    type: 'number',
    label: '数字输入'
  },
  select: {
    type: 'select',
    label: '下拉框',
    data: ['选项一', '选项二', '选项三']
  },
  radio: {
    type: 'radio',
    label: '单选框',
    data: ['选项一', '选项二', '选项三']
  },
  checkbox: {
    type: 'checkbox',
    label: '多选框',
    data: ['选项一', '选项二', '选项三']
  },
  switch: {
    type: 'switch',
    label: '开关'
  },
  cascader: {
    type: 'cascader',
    label: '树形选择',
    data: [
      {
        label: '1',
        value: '1',
        children: [
          {
            label: '1-1',
            value: '1-1'
          },
          {
            label: '1-2',
            value: '1-2'
          }
        ]
      },
      {
        label: '2',
        value: '2'
      }
    ]
  },
  date: {
    type: 'date',
    label: '日期'
  }
}
</script>
