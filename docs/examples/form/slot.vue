<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options">
    <template #slotKey="{ formData }">
      <!-- <template #slotKey="{formData, model, elForm, componentData, getData, setData, resetData, getAsyncData, execAsyncDataFunc, clearComponentData}"> -->
      <el-input v-model="formData.slotKey" />
      <span>这是自定义插槽</span>
    </template>
  </bo-form>
  <div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormObjectOptions, type FormInstance } from 'bole-component'

const options: FormObjectOptions = {
  slotKey: {
    warpCss: {
      flexWrap: 'wrap'
    },
    label: '插槽',
    type: 'slot'
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
