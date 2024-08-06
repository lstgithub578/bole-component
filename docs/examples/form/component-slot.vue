<template>
  <bo-form ref="form" :formProps="{ labelWidth: 'auto' }" :options="options"> </bo-form>
</template>

<script setup lang="ts">
import { type FormObjectOptions } from 'bole-component'
import { ElIcon } from 'element-plus'
import { Search, Finished } from '@element-plus/icons-vue'
import { h } from 'vue'
defineOptions({
  name: 'ComponentSlot'
})

const options: FormObjectOptions = {
  input: {
    type: 'input',
    label: '输入框',
    slots() {
      return {
        prefix: h(ElIcon, { size: 20 }, () => [h(Search)])
      }
    },
    props: {
      placeholder: '输入框的插槽'
    }
  },
  select: {
    type: 'select',
    label: '选项的插槽',
    slots() {
      return {
        prefix: h(ElIcon, { size: 20 }, () => [h(Finished)]),
        footer: h('div', 'footer')
      }
    },
    props: {
      placeholder: '下拉框的插槽'
    }
  }
}
</script>
