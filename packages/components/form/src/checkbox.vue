<script setup lang="ts">
import { ElCheckbox, ElCheckboxButton } from 'element-plus'
import { useAttrs } from 'vue'

defineOptions({
  name: 'FormItemRadio'
})

const props = defineProps({
  button: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()
</script>

<template>
  <el-checkbox v-if="!props.button" v-bind="attrs"></el-checkbox>
  <el-checkbox-button v-else v-bind="attrs"></el-checkbox-button>
</template>
