<template>
  <div>
    <bo-dialog ref="dialog">
      <template #header="{ title }">
        <div style="background-color: #ffd6e7">
          {{ title }}
        </div>
      </template>

      <!-- <template #footer="{ close, confirm, loading, cancelBtnText, confirmBtnText }"> -->
      <template #footer="{ close, confirm, loading }">
        <div style="background-color: #ffd6e7">
          <span>自定义footer</span>
          <el-button @click="close"> 关闭对话框 </el-button>
          <el-button @click="confirm" type="primary" :loading="loading"> 确认 </el-button>
        </div>
      </template>
      <!-- <template #header></template> -->
      <span>这是一个对话框</span>
    </bo-dialog>

    <el-button type="primary" @click="open">打开对话框</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DialogInstance } from 'bole-component'

const dialog = ref<DialogInstance>()

function open() {
  dialog.value?.open({
    title: '自定义header',
    confirm({ close, loading, stopLoading }) {
      loading()

      setTimeout(() => {
        close()
        stopLoading()
      }, 3000)
    }
  })
}
</script>

<style scoped></style>
