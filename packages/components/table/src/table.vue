<script setup lang="ts">
import { ElTable } from 'element-plus'
import BoTableColumn from './table-column.vue'
import {
  tableProps,
  TableArrayColumns,
  TableColumn,
  TableObjectColumns,
  TableInstance
} from './table'
import { useSlots, useAttrs, computed, inject, watch, type Ref } from 'vue'
import { isArray, isObject, isString, isFunction } from '@bole-component/utils'
import { LayoutProvideKey } from '../../layout'

const layoutProvide = inject<Ref<TableArrayColumns> | null>(LayoutProvideKey, null)

defineOptions({
  name: 'BoTable'
})

const slots = useSlots()

const attrs = useAttrs()

const props = defineProps(tableProps)

const options = computed<TableArrayColumns>((): TableArrayColumns => {
  let columns: TableArrayColumns = []

  if (isArray(props.options)) {
    columns = [...props.options]
  } else if (isObject(props.options)) {
    let objOptions: TableObjectColumns = props.options
    columns = Object.keys(objOptions).map((key): TableColumn => {
      if (isString(objOptions[key])) {
        return {
          label: objOptions[key] as string,
          prop: key
        }
      } else {
        let op = objOptions[key] as TableColumn
        op.prop = op.prop || key
        return op
      }
    })
  }

  if (props.action) {
    let action = { ...props.action }
    if (!action || !action.props?.label) action.label = '操作'
    columns.push(action)
  }

  return columns
})

watch(
  options,
  (val) => {
    if (layoutProvide !== null) layoutProvide.value = val
  },
  {
    immediate: true
  }
)

const hiddenColsByLabelSet = computed(() => {
  return new Set(props.hiddenColsByLabel)
})

defineExpose<TableInstance>({
  tableColumnsOptions: options
})

function getColumnShow(isShow?: Function | boolean): boolean {
  return isFunction(isShow) ? isShow() : isShow === false ? false : true
}
</script>

<template>
  <div>
    <ElTable v-bind="attrs" :data="props.data">
      <template v-for="(option, index) in options" :key="index">
        <BoTableColumn
          v-if="
            getColumnShow(option.show) &&
            !hiddenColsByLabelSet.has((option as any)?.props?.label || option?.label)
          "
          :option="option"
          :slots="slots"
          :hiddenColsByLabelSet="hiddenColsByLabelSet"
        ></BoTableColumn>
      </template>
    </ElTable>
  </div>
</template>
