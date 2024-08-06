import { reactive, computed, ref, toRaw, inject, onMounted, watch, ComputedRef, Ref } from 'vue'
import type {
  FormProps,
  FormInstance,
  FormArrayOptions,
  FormArrayOption,
  FormObjectOption,
  FormOptions,
  FormComponentOption
} from './form'

import { asyncDataParser } from './config'

import type { FormInstance as ElFormInstance } from 'element-plus'
import { isString, isArray } from '@bole-component/utils'

import { DialogProvideKey } from '../../dialog'

interface State {
  formData: Record<string, any>
  componentData: Record<string, any>
}

interface Context {
  state: State
  componentOptions: ComputedRef<FormArrayOptions>
  formRef: Ref<ElFormInstance>
  formExpose: FormInstance
  setData: (data: Record<string, any>) => void
  getComponentData: (key: string) => any
}

const formContext = (props: FormProps): Context => {
  // diaolog组件
  const dialogCmponentInstace: any = inject(DialogProvideKey, null)

  // 表单实例
  const formRef = ref() as Ref<ElFormInstance>

  const state = reactive<State>({
    formData: Object.assign({}, props.model),
    componentData: {}
  })

  // 组件暴露的属性和方法
  const formExpose: FormInstance = {
    formData: state.formData,
    elForm: formRef,
    componentData: state.componentData,
    model: props.model,
    getAsyncData,
    execAsyncDataFunc,
    clearComponentData,
    resetData,
    getData,
    setData
  }

  if (dialogCmponentInstace) dialogCmponentInstace.form = formExpose

  // 获取组件配置
  const componentOptions = computed<FormArrayOptions>((): FormArrayOptions => {
    const options: FormOptions = props.options
    if (isArray(options)) {
      return options
    } else {
      return Object.keys(options).reduce((prev: FormArrayOptions, key) => {
        const item: FormObjectOption = options[key]
        // 处理字符串
        if (isString(item)) {
          prev.push({
            key,
            label: item,
            type: 'input'
          })
        } else {
          ;(item as FormArrayOption).key = key
          prev.push(item as FormArrayOption)
        }
        return prev
      }, [])
    }
  })

  watch(
    componentOptions,
    (options) => {
      options.forEach((v: FormComponentOption) => {
        if (v.data) state.componentData[v.key] = v.data
      })
    },
    {
      immediate: true
    }
  )

  const asyncDataFuncs: ComputedRef<Record<string, Function>> = computed(() =>
    componentOptions.value.reduce(
      (prev: Record<string, Function>, { key, asyncData }: FormComponentOption) => {
        if (asyncData) prev[key] = asyncData
        return prev
      },
      {}
    )
  )

  // 设置表单的值
  function setData(data: Record<string, any>): void {
    state.formData = Object.assign(state.formData, data)
  }
  // 获取表单的数据
  function getComponentData(key: string): any {
    return state.componentData[key] || []
  }

  // 获取组件数据
  function getAsyncData(keys?: string | string[]): void {
    keys = isString(keys) ? [keys] : isArray(keys) ? keys : Object.keys(asyncDataFuncs.value)

    keys.forEach((key) => {
      if (!Object.hasOwnProperty.call(asyncDataFuncs.value, key)) return
      asyncDataParser(asyncDataFuncs.value[key], formExpose).then((data: any) => {
        state.componentData[key] = data
      })
    })
  }

  function execAsyncDataFunc(key: string, ...args: any[]): void {
    if (!Object.hasOwnProperty.call(asyncDataFuncs.value, key)) return
    asyncDataParser(asyncDataFuncs.value.key, formExpose, args).then((data: any) => {
      state.componentData[key] = data
    })
  }

  // 清空组件数据
  function clearComponentData(keys: string | string[]): void {
    keys = isString(keys) ? [keys] : keys

    keys.forEach((key) => {
      if (!state.componentData[key]) return
      state.componentData[key] = []
      state.formData[key] = undefined
    })
  }

  // 获取表单数据
  function getData<T = any>(): Promise<T> {
    return new Promise((resolve, reject) => {
      formRef.value!.validate((valid, fields) => {
        if (valid) {
          resolve(toRaw(state.formData) as T)
        } else {
          reject(fields)
        }
      })
    })
  }

  // 重置表单数据至默认值
  function resetData() {
    formRef.value?.resetFields()
  }

  onMounted(() => {
    // 在dialog外使用时自动加载数据
    if (!dialogCmponentInstace && props.autoGetAsyncData)
      formExpose.getAsyncData(Object.keys(asyncDataFuncs.value))
  })

  return {
    state,
    formRef,
    componentOptions,
    formExpose,
    setData,
    getComponentData
  }
}

export { State, Context, formContext }

export default formContext
