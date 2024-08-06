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

defineOptions({
  name: 'FormExtend'
})

const options: FormObjectOptions = {
  icon: {
    label: '扩展组件',
    type: 'extend',
    component: 'icon-select',
    event() {
      return {
        change(val: string) {
          console.log('val', val)
        }
      }
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
