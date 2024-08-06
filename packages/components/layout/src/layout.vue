<script setup lang="ts">
import {
  ElCollapseTransition,
  ElTooltip,
  ElButton,
  ElDropdown,
  ElPopover,
  ElIcon,
  ElTree,
  ElConfigProvider
} from 'element-plus'
import { Refresh, Grid, Search } from '@element-plus/icons-vue'
import { ref, provide, computed, watch, nextTick } from 'vue'
import { layoutProps, LayoutProvideKey } from './layout'
import { ConfigProviderProps, TreeInstance } from 'element-plus'
import { type TableArrayColumns } from '../../table'

defineOptions({
  name: 'BoLayout'
})

const props = defineProps(layoutProps)
const hideToolbarBtnsSet = new Set(props.hideToolbarBtns)

const tableColumns = ref<TableArrayColumns>([])
provide(LayoutProvideKey, tableColumns)

const treeList = computed(() => {
  return tableColumns.value.map((val) => {
    return {
      label: val.props?.label || val.label,
      children: val.children || []
    }
  })
})

let maxLabelLength = 0
const maxLabelLengthVal = ref<number>(0)

function getChildLabels(keys: any[], arr: any[], level: number = 1) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    keys.push(item.label || '')
    let labelLength = (level - 1) * 18 + (item.label?.length || 0) * 16 + 36 + 32
    if (labelLength > maxLabelLength) maxLabelLength = labelLength
    if (item.children && item.children.length) getChildLabels(keys, item.children, ++level)
  }
}

const defaultLabels = computed(() => {
  const labels: string[] = []
  getChildLabels(labels, treeList.value)

  return labels
})

watch(defaultLabels, () => {
  maxLabelLengthVal.value = maxLabelLength
})

const emits = defineEmits(['refresh'])
const size = ref<ConfigProviderProps['size']>(props.defaultSize as ConfigProviderProps['size'])
const showHeader = ref<boolean>(true)
const hiddenColums = ref<string[]>([])
const tree = ref<TreeInstance>()
const colsControlPopoverWidth = ref<number>(100)

function getColsControlPopoverWidth() {
  nextTick(() => {
    colsControlPopoverWidth.value = tree.value?.el$?.clientWidth || 100
  })
}

function treeCheckChange() {
  let showColums = [
    ...(tree.value?.getCheckedKeys() || []),
    ...(tree.value?.getHalfCheckedKeys() || [])
  ]
  const showColumsSet = new Set(showColums)
  hiddenColums.value = defaultLabels.value.filter((label: string) => !showColumsSet.has(label))
}
</script>

<template>
  <div class="bo-layout">
    <el-collapse-transition>
      <div v-show="showHeader">
        <slot name="header"> </slot>
      </div>
    </el-collapse-transition>
    <div class="bo-layout-toolbar">
      <div>
        <el-tooltip content="刷新" placement="top" v-if="!hideToolbarBtnsSet.has('refresh')">
          <el-button :icon="Refresh" type="info" @click="emits('refresh')"></el-button>
        </el-tooltip>
        <slot name="toolbar-left-btn"></slot>
      </div>
      <div>
        <slot name="toolbar-rigth-btn"></slot>
        <el-tooltip content="表格大小" placement="top" v-if="!hideToolbarBtnsSet.has('size')">
          <el-dropdown @command="size = $event" class="bo-layout-toolbar-btn">
            <el-button :icon="Grid"></el-button>
            <template #dropdown>
              <div class="bo-layout-toolbar-size">
                <div>
                  <el-button
                    :type="size === 'large' ? 'primary' : 'default'"
                    style="border-radius: 0px"
                    @click="size = 'large'"
                    >大</el-button
                  >
                </div>
                <div>
                  <el-button
                    :type="size === 'default' ? 'primary' : 'default'"
                    style="border-radius: 0px"
                    @click="size = 'default'"
                    >中</el-button
                  >
                </div>
                <div>
                  <el-button
                    :type="size === 'small' ? 'primary' : 'default'"
                    style="border-radius: 0px"
                    @click="size = 'small'"
                    >小</el-button
                  >
                </div>
              </div>
            </template>
          </el-dropdown>
        </el-tooltip>
        <el-popover
          @show="getColsControlPopoverWidth"
          placement="bottom"
          title="显示列"
          trigger="hover"
          :width="maxLabelLengthVal"
          v-if="!hideToolbarBtnsSet.has('colToggle')"
        >
          <template #reference>
            <el-button class="bo-layout-toolbar-btn">
              <template #icon>
                <el-icon>
                  <svg
                    t="1720347219476"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11820"
                    width="48"
                    height="48"
                  >
                    <path
                      d="M848.768 128.042667H170.666667c-47.061333 0-85.333333 38.272-85.333334 85.333333v597.333333c0 47.061333 38.272 85.333333 85.333334 85.333334h678.101333c47.061333 0 85.333333-38.272 85.333333-85.333334V213.333333a85.461333 85.461333 0 0 0-85.333333-85.290666zM341.333333 810.709333H170.666667V341.333333h170.666666v469.376z m256 0h-170.666666V341.333333h170.666666v469.376z m85.333334 0V341.333333h166.101333l0.042667 469.376H682.666667z"
                      p-id="11821"
                    ></path>
                  </svg>
                </el-icon>
              </template>
            </el-button>
          </template>
          <div>
            <el-tree
              ref="tree"
              @check-change="treeCheckChange"
              @node-expand="getColsControlPopoverWidth"
              show-checkbox
              node-key="label"
              :data="treeList"
              :default-checked-keys="defaultLabels"
            />
          </div>
        </el-popover>
        <el-tooltip
          :content="showHeader ? '隐藏搜索' : '显示搜索'"
          placement="top"
          v-if="!hideToolbarBtnsSet.has('searchToggle')"
        >
          <el-button
            :icon="Search"
            class="bo-layout-toolbar-btn"
            :type="showHeader ? 'primary' : 'default'"
            @click="showHeader = !showHeader"
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-config-provider :size="size">
      <slot :hiddenColums="hiddenColums"> </slot>
    </el-config-provider>
  </div>
</template>
