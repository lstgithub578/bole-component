<template>
  <div>
    <bo-dialog ref="dialog">
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
    title: '标题',
    confirmBtnText: 'confirm',
    cancelBtnText: 'cancel'
  })
}
</script>

<style scoped></style>
