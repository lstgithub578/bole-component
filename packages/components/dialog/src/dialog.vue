<script setup lang="ts">
import { reactive, watch, onUnmounted, nextTick, provide, ref, toRaw } from 'vue'
import { dialogProps } from './dialog'
import type { DialogInstance, DialogState, DialogOpenOptions } from './dialog'
import { ElScrollbar, ElButton, ElDialog } from 'element-plus'
import { isString, isFunction } from '@bole-component/utils'
import { dialogConfig, getDialogProps } from './config'
import { DialogProvideKey, DialogInject } from './dialog'
import { FormInstance } from '../../form'

defineOptions({
  name: 'BoDialog'
})

const state = reactive<DialogState>({
  show: false,
  loading: false,
  windowHeight: window.innerHeight,
  scopedData: {},
  height: 'auto'
})

const dialogRef = ref<any>()
const headerRef = ref<HTMLElement>()
const footerRef = ref<HTMLElement>()

function getDefaultOpenOptions(): DialogOpenOptions {
  return {
    title: '',
    cancelBtnText: '取消',
    confirmBtnText: '确定',
    width: '50%',
    height: 'auto',
    validateForm: true,
    cancel: null as unknown as () => void,
    confirm: null as unknown as () => void
  }
}

const openOptions = ref<DialogOpenOptions>(getDefaultOpenOptions())

const inject: DialogInject = {
  form: undefined
}

provide(DialogProvideKey, inject)
const props = defineProps(dialogProps)

defineExpose<DialogInstance>({
  open,
  inject
})

const debounce = (fn: () => void, wait = 33.34) => {
  let timmer: ReturnType<typeof setTimeout> | null
  return () => {
    timmer && clearTimeout(timmer)
    timmer = setTimeout(() => {
      fn()
    }, wait)
  }
}

const getWindowHeight = debounce(() => {
  if (openOptions.value.height?.endsWith('%')) state.windowHeight = window.innerHeight
})

function getDialogHeight() {
  let height = openOptions.value.height

  if (isString(height)) {
    let headerHeight: number = headerRef.value!.parentElement!.offsetHeight
    let footerHeight: number = footerRef.value!.parentElement!.offsetHeight

    let style = getComputedStyle(dialogRef.value.dialogContentRef.$el)
    let heightNum: number

    if (height.endsWith('%')) {
      heightNum = Math.floor(
        (parseInt(height.slice(0, height.length - 1)) / 100) *
          (state.windowHeight -
            headerHeight -
            footerHeight -
            parseInt(style.paddingTop) -
            parseInt(style.paddingBottom))
      )
    } else {
      heightNum = parseInt(height)

      heightNum =
        heightNum -
        headerHeight -
        footerHeight -
        parseInt(style.paddingTop) -
        parseInt(style.paddingBottom)
    }

    height = heightNum < 0 ? 'auto' : heightNum + 'px'
  } else {
    height = 'auto'
  }
  state.height = height
}

watch(
  () => state.show,
  (val: boolean) => {
    if (val) {
      nextTick(() => {
        window.addEventListener('resize', getWindowHeight)
        getDialogHeight()
      })
    } else {
      window.removeEventListener('resize', getWindowHeight)
    }
  }
)

watch(() => state.windowHeight, getDialogHeight)

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    if (state.show && dialogRef.value) getWindowHeight()
  })
})

// 打开次数
let openCount = -1

function open<T = any>(dialogOpenOptions?: DialogOpenOptions<T>) {
  openCount++

  openOptions.value = Object.assign(getDefaultOpenOptions(), dialogOpenOptions || {})
  state.show = true

  getWindowHeight()

  nextTick(async () => {
    if (inject.form) {
      if (props.getAsyncDataWhenEveryOpen) {
        inject.form.getAsyncData()
      } else if (!props.getAsyncDataWhenEveryOpen && !openCount) {
        inject.form.getAsyncData()
      }

      let data = null
      // 判断有无设置表单数据的方法
      // 函数时
      if (isFunction(dialogOpenOptions?.setFormData)) {
        let callBackFunc: ((form: FormInstance) => void) | undefined
        data = dialogOpenOptions.setFormData((callBack: (form: FormInstance) => void) => {
          if (isFunction(callBack)) {
            callBackFunc = callBack
          }
        })

        data = await dialogConfig.formDataParser(data)
        if (data) inject.form.setData(data)
        if (isFunction(callBackFunc)) callBackFunc(inject.form)
      }
    }
  })
}

function close() {
  state.show = false
}

function closed() {
  if (inject.form) {
    inject.form.resetData()
  }
}

function loading() {
  state.loading = true
}

function stopLoading() {
  state.loading = false
}

async function handleConfirm() {
  let formData = null
  if (isFunction(openOptions.value.confirm)) {
    if (inject.form) {
      if (openOptions.value.validateForm) {
        try {
          formData = await inject.form.getData()
        } catch (error) {
          return
        }
      } else {
        formData = toRaw(inject.form.formData)
      }
    }

    openOptions.value.confirm({
      data: formData,
      close,
      loading,
      stopLoading
    })
  } else {
    close()
  }
}

function handleClose() {
  if (isFunction(openOptions.value.cancel)) {
    openOptions.value.cancel({
      close: close
    })
  } else {
    close()
  }
}
</script>

<template>
  <ElDialog
    ref="dialogRef"
    :top="openOptions.top"
    v-bind="getDialogProps(props.dialogProps)"
    v-model="state.show"
    :width="openOptions.width"
    :before-close="handleClose"
    @closed="closed"
  >
    <template #header>
      <div ref="headerRef">
        <slot name="header" :title="openOptions.title"
          ><span>{{ openOptions.title }}</span></slot
        >
      </div>
    </template>
    <div class="bo-dialog-body" :style="{ height: state.height }">
      <el-scrollbar>
        <slot :scopedData="state.scopedData"> </slot>
      </el-scrollbar>
    </div>
    <template #footer>
      <div ref="footerRef">
        <slot
          name="footer"
          :loading="state.loading"
          :close="handleClose"
          :confirm="handleConfirm"
          :cancelBtnText="openOptions.cancelBtnText"
          :confirmBtnText="openOptions.confirmBtnText"
        >
          <el-button @click="handleClose"> {{ openOptions.cancelBtnText }}</el-button>
          <el-button :loading="state.loading" @click="handleConfirm" type="primary">
            {{ openOptions.confirmBtnText }}
          </el-button>
        </slot>
      </div>
    </template>
  </ElDialog>
</template>
