<template>
  <div>
    <bo-dialog ref="dialog">
      <span>这是一个对话框</span>
    </bo-dialog>

    <el-button @click="open" type="primary"> 打开对话框 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DialogInstance } from 'bole-component'
defineOptions({
  name: 'DialogBasic'
})

const dialog = ref<DialogInstance>()

function open() {
  dialog.value?.open({
    title: '标题'
  })
}
</script>

<style scoped></style>
