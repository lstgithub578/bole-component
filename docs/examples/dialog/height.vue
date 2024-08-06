<template>
  <div>
    <bo-dialog ref="dialog" :dialogProps="{ alignCenter: true }">
      <div class="content">
        <div>里面内容高1200px</div>
        <div>到底了</div>
      </div>
    </bo-dialog>

    <el-button @click="open('400px')" type="primary"> 固定高度400px </el-button>
    <el-button @click="open('80%')" type="primary"> 百分比高度80% </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type DialogInstance } from 'bole-component'

defineOptions({
  name: 'DialogHeight'
})

const dialog = ref<DialogInstance>()

function open(height: string) {
  dialog.value?.open({
    top: '0px',
    title: '标题',
    height
  })
}
</script>

<style scoped>
.content {
  height: 1200px;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
