<template>
  <div>
    <bo-dialog ref="dialog">
      <span>这是一个对话框</span>
    </bo-dialog>

    <el-button @click="open('600px')" type="primary"> 宽度600px </el-button>
    <el-button @click="open('80%')" type="primary"> 宽度80% </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DialogInstance } from 'bole-component'

defineOptions({
  name: 'DialogWidth'
})

const dialog = ref<DialogInstance>()

function open(width: string) {
  dialog.value?.open({
    title: '标题',
    width
  })
}
</script>

<style scoped></style>
