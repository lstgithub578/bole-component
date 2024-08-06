<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { BoForm, FormInstance } from '../../form'
import { ElCol, ElButton } from 'element-plus'
import { filterProps } from './filter'
import { Search } from '@element-plus/icons-vue'
import { isFunction } from '@bole-component/utils'
defineOptions({
  name: 'BoFilter'
})

const emits = defineEmits<{
  search: [data: Record<string, any>]
}>()

const props = defineProps(filterProps)

const filter = ref<FormInstance>()

onMounted(() => {
  if (isFunction(props.dataChange)) {
    watch(
      () => filter.value?.formData,
      async () => {
        try {
          props.dataChange(await filter.value!.getData())
        } catch (error) {
          //
        }
      },
      {
        deep: true
      }
    )
  }
})
async function searchBtnClick() {
  try {
    emits('search', await filter.value!.getData())
  } catch (error) {
    //
  }
}

function resetClick() {
  filter.value?.resetData()
  searchBtnClick()
}
</script>

<template>
  <bo-form
    ref="filter"
    class="bo-filter"
    :options="props.options"
    :colProps="{ span: null as any }"
    :formProps="{ ...props.formProps }"
    :model="props.model"
  >
    <el-col :span="null as any" class="bo-filter-btns">
      <el-button :icon="Search" v-if="props.showSearchBtn" type="primary" @click="searchBtnClick">
        {{ props.searchBtnText }}
      </el-button>
      <el-button v-if="props.showResetBtn" @click="resetClick"> 重置 </el-button>
      <slot name="btn-append"></slot>
    </el-col>
  </bo-form>
</template>
