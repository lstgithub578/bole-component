import { ColProps, type FormProps } from 'element-plus'
import { isFunction, isString, mergeObj } from '@bole-component/utils'
import { FormInstance, FormComponentOption, FormArrayOption, ExtendOption } from './form'

export interface FormConfig {
  formProps?: Partial<FormProps>
  colProps?: ColProps
  componentProps?: Record<string, any>
  componentPlaceholder?: Record<string, string | ((option: FormComponentOption) => string)>
  components?: Record<string, any>
  asyncDataParser?: (func: Function, form: FormInstance, ...args: any[]) => any
}

function selectPlaceholder(option: FormComponentOption): string {
  return `请选择${option.label || '该项'}`
}

export const formConfig: Required<FormConfig> = {
  formProps: {} as FormProps,
  colProps: {} as ColProps,
  componentProps: {} as Record<string, any>,
  componentPlaceholder: {
    input: (option: FormComponentOption) => `请输入${option.label || '该项'}`,
    select: selectPlaceholder,
    radio: selectPlaceholder,
    cascader: selectPlaceholder,
    date: selectPlaceholder,
    number: (option: FormComponentOption) => `请输入${option.label || '该项'}`
  },
  asyncDataParser: async (func: Function, formInstance: FormInstance, ...args: any[]) => {
    return new Promise((resolve) => {
      func(formInstance, ...args)
        .then((res: any) => {
          resolve(res?.data || res)
        })
        .catch()
    })
  },
  components: {}
}

// 获取表单默认设置
export function getFormConfig(key: keyof FormConfig): any {
  return formConfig[key]
}

// 设置表单默认设置
export function setFormConfig(config: FormConfig) {
  mergeObj(config, formConfig)
}

// 获取组件提示符
export function getComponentPlaceholder(option: FormArrayOption): string {
  const { type } = option

  let paceholder: string = ''

  if (isString(formConfig?.componentPlaceholder[type])) {
    paceholder = formConfig?.componentPlaceholder[type] as string
  } else if (isFunction(formConfig?.componentPlaceholder[type])) {
    const func = formConfig?.componentPlaceholder[type] as (option: any) => string
    paceholder = func(option)
  }

  return paceholder
}

// 获取表表单默认props
export function getFormProps(formProps: Partial<FormProps>): Partial<FormProps> {
  return { ...formConfig.formProps, ...formProps }
}

// 获取col组件的props
export function getColProps(colProps: Partial<ColProps>, option: FormComponentOption): ColProps {
  return Object.assign({}, formConfig.colProps || {}, colProps, option.colProps || {})
}

// 组件数据解析器
export function asyncDataParser(func: Function, formInstance: FormInstance, ...args: any[]) {
  return formConfig.asyncDataParser(func, formInstance, args)
}

// 获取组件的 props
export function getComponentProps(componentOption: FormArrayOption, instance: FormInstance) {
  const { type, props } = componentOption

  const defaultComponentProps = getFormConfig('componentProps')

  let defaultProps

  if (type === 'extend' && isString(componentOption?.component)) {
    defaultProps = defaultComponentProps[(componentOption as ExtendOption).component as string] || {}
  } else {
    defaultProps = defaultComponentProps[type] || {}
  }

  const placeholder =  getComponentPlaceholder(componentOption)
  if(placeholder) defaultProps.placeholder = placeholder

  const componentProps = isFunction(props) ? props(instance) : props
  return Object.assign(
    {},
    defaultProps,
    componentProps
  )
}

// 获取选项组件element-plus props
export function getDataItemProps(
  componentOption: FormComponentOption,
  instance: FormInstance,
  data: any,
  dataItem: any,
  index: string | number
) {
  const { dataItemProps } = componentOption

  const props = isFunction(dataItemProps)
    ? dataItemProps(instance, data, dataItem, index)
    : dataItemProps
  return props || {}
}

//获取组件事件
export function getComponentEvent(option: FormArrayOption, instance: FormInstance): any {
  return isFunction(option.event) ? option.event(instance) : option.event || {}
}

export function getComponentSlots(option: FormArrayOption, instance: FormInstance) {
  return isFunction(option.slots) ? option.slots(instance) : {}
}

// 获取扩展组件
export function getExtendComponent(component: ExtendOption['component'], instance: FormInstance) {
  if (isFunction(component)) {
    return component(instance)
  } else {
    return component
  }
}


// 判断组件是否显示
export function getComponentIsShow(
  item: FormComponentOption,
  formExpose: FormInstance,
  state: any
): Boolean {
  let show: Boolean = true
  if (isFunction(item.show)) {
    show = item.show(formExpose)
  } else if (item.show === false) {
    show = false
  }

  // 不显示的时候清空formData里的值
  if (show === false) {
    state.formData[item.key] = undefined
  }

  return show
}
