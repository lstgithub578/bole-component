<template>
  <!-- autoGetAsyncData 设置表单初始化时是否自动加载异步数据，默认为true -->
  <bo-form
    ref="form"
    :formProps="{ labelWidth: 'auto' }"
    :options="options"
    :autoGetAsyncData="true"
  >
  </bo-form>

  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

interface Api {
  getSexData: () => Promise<any[]>
  getGradeData: () => Promise<string[]>
  getStrongPointData: () => Promise<Record<string, any>>
  getHobbyData: () => Promise<any[]>
}

// 模拟api
const api: Api = {
  getSexData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
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
        ])
      }, 1000)
    })
  },
  getGradeData() {
    return Promise.resolve(['一', '二', '三', '四', '五', '六'])
  },
  getStrongPointData() {
    return Promise.resolve({
      sing: '唱',
      dance: '跳',
      rap: 'rap'
    })
  },
  getHobbyData() {
    return Promise.resolve([
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
    ])
  }
}

const options: FormObjectOptions = {
  sex: {
    type: 'select',
    label: '性别',
    asyncData: api.getSexData,
    valueGetter: (item) => item.value,
    labelGetter: (item) => item.label
  },
  grade: {
    type: 'radio',
    label: '年级',
    asyncData: api.getGradeData,
    valueGetter: (item, index) => index
    // 默认为item
    // labelGetter: (item) => item.label,
  },
  strongPoint: {
    type: 'checkbox',
    label: '特长',
    asyncData: api.getStrongPointData,
    valueGetter: (val, key) => key,
    labelGetter: (val, key) => val
  },
  hobby: {
    type: 'cascader',
    label: '爱好',
    asyncData: api.getHobbyData
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
