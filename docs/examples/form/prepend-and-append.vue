<template>
  <bo-form
    ref="form"
    :formProps="{ labelWidth: 'auto' }"
    :options="options"
    :componentAppend="() => renderUnit('')"
  >
  </bo-form>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { type FormObjectOptions } from 'bole-component'

function renderUnit(unit: string) {
  return h('div', { style: { width: '2em', paddingLeft: '0.5em' } }, unit)
}

const options: FormObjectOptions = {
  name: {
    type: 'input',
    label: '物体名称',
    prepend() {
      return h('div', { style: { width: '5em', color: '#ff0000' } }, '前置内容')
    }
  },
  length: {
    type: 'input',
    label: '长度',
    append() {
      return renderUnit('米')
    }
  },
  width: {
    type: 'input',
    label: '宽',
    append() {
      return renderUnit('cm')
    }
  },
  height: {
    type: 'input',
    label: '高',
    append() {
      return renderUnit('cm')
    }
  }
}

defineOptions({
  name: 'PrependAndAppend'
})
</script>
