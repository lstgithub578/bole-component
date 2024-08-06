<script setup lang="ts">
import { ElRadio, ElRadioButton } from 'element-plus'
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
  <el-radio v-if="!props.button" v-bind="attrs"></el-radio>
  <el-radio-button v-else v-bind="attrs"></el-radio-button>
</template>
