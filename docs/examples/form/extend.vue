<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>
  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'
import { ElInput } from 'element-plus'

defineOptions({
  name: 'FormExtend'
})

const options: FormObjectOptions = {
  icon: {
    label: '注册的扩展组件',
    type: 'extend',
    component: 'icon-select',
    event() {
      return {
        change(val: string) {
          console.log('val', val)
        }
      }
    }
  },
  jsx: {
    label: '扩张组件(jsx)',
    type: 'extend',
    component: (formInstance) => {
      return <ElInput placeholder="使用jsx"></ElInput>
    }
  },
  component: {
    label: '直接使用组件',
    type: 'extend',
    component: <ElInput></ElInput>,
    props: {
      placeholder: '直接使用组件'
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
