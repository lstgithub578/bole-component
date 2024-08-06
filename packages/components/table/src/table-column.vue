<script setup lang="ts">
import { ElTableColumn, ElButton } from 'element-plus'
import { tableColumnProps } from './tableColumn'
import { isFunction, isArray } from '@bole-component/utils'
import { ButtonOption } from './table'

defineOptions({
  name: 'BoTableColumn'
})

const props = defineProps(tableColumnProps)

function getBtnProps(
  props: ButtonOption['props'],
  scope: { row: any; column: any; $index: number }
) {
  return isFunction(props) ? props(scope) : props || {}
}
</script>

<template>
  <ElTableColumn
    v-bind="
      Object.assign(
        { label: props.option.label, prop: props.option.prop },
        props.option.props || {}
      )
    "
  >
    <template #default="scope">
      <template v-if="props.option.slot && props.slots[props.option.slot]">
        <component :is="props.slots[props.option.slot]" v-bind="scope"></component>
      </template>
      <el-button
        v-else-if="isArray(props.option.buttons)"
        v-for="(btn, index) in props.option.buttons"
        v-bind="getBtnProps(btn.props, scope)"
        :key="index"
        @click="btn?.click && btn.click(scope)"
        >{{ btn.label }}</el-button
      >
      <template v-else-if="isArray(props.option.children)">
        <template v-for="(option, index) in props.option.children" :key="index">
          <BoTableColumn
            v-if="
              !props.hiddenColsByLabelSet.has((option?.props?.label || option?.label) as string)
            "
            :option="option"
            :slots="props.slots"
            :hiddenColsByLabelSet="props.hiddenColsByLabelSet"
          ></BoTableColumn>
        </template>
      </template>
    </template>
  </ElTableColumn>
</template>
