<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>

  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

const options: FormObjectOptions = {
  sex: {
    type: 'select',
    label: '性别',
    data: [
      {
        label: '女',
        value: '0'
      },
      {
        label: '男',
        value: '1'
      },
      {
        label: '未知',
        value: '2'
      }
    ],
    valueGetter: (item) => item.value,
    labelGetter: (item) => item.label
  },
  grade: {
    type: 'radio',
    label: '年级',
    data: ['一', '二', '三', '四', '五', '六'],
    valueGetter: (item, index) => index
    // 默认为item
    // labelGetter: (item) => item.label,
  },
  strongPoint: {
    type: 'checkbox',
    label: '特长',
    data: {
      sing: '唱',
      dance: '跳',
      rap: 'rap'
    },
    valueGetter: (val, key) => key,
    labelGetter: (val, key) => val
  },
  hobby: {
    type: 'cascader',
    label: '爱好',
    data: [
      {
        label: '运动',
        data: '1',
        children: [
          {
            label: '跑步',
            data: '1-1'
          },
          {
            label: '跳远',
            data: '1-2'
          }
        ]
      },
      {
        label: '艺术',
        data: '2',
        children: [
          {
            label: '跳舞',
            data: '2-1'
          },
          {
            label: '摄影',
            data: '2-2'
          },
          {
            label: '绘画',
            data: '2-3'
          }
        ]
      }
    ]
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
