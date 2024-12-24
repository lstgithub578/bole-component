import {
  FormProps as ElFormProps,
  FormInstance as ElFormInstance,
  ColProps,
  FormItemProps,
  RowProps,
  InputProps as ElInputProps,
  InputNumberProps,
  ISelectProps,
  RadioProps,
  DatePickerProps,
  // 非Cascader的props，是cascader-panel的props
  // CascaderProps,
  cascaderProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  SwitchProps,
  type FormRules
} from 'element-plus'
import { VNode, PropType, ExtractPropTypes, CSSProperties, MaybeRef } from 'vue'

// 表单暴露的属性和方法
export interface FormInstance {
  formData: Record<string, any>
  model: Record<string, any>
  elForm: MaybeRef<ElFormInstance>
  componentData: Record<string, any>
  getData: <T = any>() => Promise<T>
  setData: (data: Record<string, any>) => void
  resetData: () => void
  getAsyncData: (key?: string | string[]) => void
  execAsyncDataFunc: (key: string, ...args: any[]) => void
  clearComponentData: (key: string | string[]) => void
}

type DefineProps<T> = ((formInstance: FormInstance) => Partial<T>) | Partial<T>
type DefineDataItemProps<T> =
  | ((formInstance: FormInstance, data: any, dataItem: any, index: string | number) => Partial<T>)
  | Partial<T>

// 通用组件配置
export interface FormComponentOption {
  key: string
  type: string
  label?: string
  props?: DefineProps<Record<string, any>>
  show?: Boolean | ((formExpose: FormInstance) => Boolean)
  colProps?: Partial<ColProps>
  formItemProps?: Partial<FormItemProps>
  event?: (instance: FormInstance) => Record<string, Function>
  slots?: (instance: FormInstance) => Record<string, VNode>
  prepend?: (formExpose: FormInstance) => VNode | VNode
  append?: (formExpose: FormInstance) => VNode | VNode
  warpCss?: CSSProperties
  data?: Array<any> | Record<string, any>
  labelGetter?: (item: any, index: string | number) => any
  valueGetter?: (item: any, index: string | number) => any
  asyncData?: (instance: FormInstance, ...args: any[]) => Promise<any>
  dataItemProps?: DefineDataItemProps<Record<string, any>>
}

// 没有数据选项的的组件配置
export type FormNotDataComponentOption = Omit<
  FormComponentOption,
  'data' | 'labelGetter' | 'valueGetter' | 'asyncData' | 'dataItemProps'
>

export type InputProps = ElInputProps & { rows: number }
// 文字输入框组件配置
export interface InputOption extends FormNotDataComponentOption {
  type: 'input'
  props?: DefineProps<InputProps>
}

// 数字输入框组件配置
export interface NumberOption extends FormNotDataComponentOption {
  type: 'number'
  props?: DefineProps<InputNumberProps>
}

interface DisabledProps {
  disabled: boolean
}

// 下拉框组件配置
export interface SelectOption extends FormComponentOption {
  type: 'select'
  props?: DefineProps<ISelectProps>
  dataItemProps?: DefineDataItemProps<DisabledProps>
}

// 下拉框组件配置
export interface RadioOption extends FormComponentOption {
  type: 'radio'
  button?: Boolean
  dataItemProps?: DefineDataItemProps<RadioProps>
  props?: DefineProps<RadioGroupProps>
}

// 多选框组件配置
export interface CheckboxOption extends FormComponentOption {
  type: 'checkbox'
  button?: Boolean
  dataItemProps?: DefineDataItemProps<CheckboxProps>
  props?: DefineProps<CheckboxGroupProps>
}

// 开关组件配置
export interface SwitchOption extends FormComponentOption {
  type: 'switch'
  props?: DefineProps<SwitchProps>
}

export interface DateOption extends FormComponentOption {
  type: 'date'
  props?: DefineProps<DatePickerProps>
}

export type ElCascaderProps = ExtractPropTypes<typeof cascaderProps>

// 级联选择器组件配置
export interface CascaderOption extends FormNotDataComponentOption {
  type: 'cascader'
  props?: DefineProps<ElCascaderProps>
  data?: FormComponentOption['data']
  asyncData?: FormComponentOption['asyncData']
}

// 自定义组件配置
export interface ExtendOption extends FormComponentOption {
  type: 'extend'
  component: string | VNode | ((formInstance: FormInstance) => VNode | null)
}

// 插槽组件配置
export interface SlotOption extends FormComponentOption {
  type: 'slot'
}
export type FormObjectOption =
  | string
  | Omit<InputOption, 'key'>
  | Omit<NumberOption, 'key'>
  | Omit<SelectOption, 'key'>
  | Omit<RadioOption, 'key'>
  | Omit<CheckboxOption, 'key'>
  | Omit<SwitchOption, 'key'>
  | Omit<CascaderOption, 'key'>
  | Omit<DateOption, 'key'>
  | Omit<SlotOption, 'key'>
  | Omit<ExtendOption, 'key'>

export type FormObjectOptions = {
  [key: string]: FormObjectOption
}

export type FormArrayOption =
  | InputOption
  | NumberOption
  | SelectOption
  | RadioOption
  | CheckboxOption
  | SwitchOption
  | CascaderOption
  | DateOption
  | SlotOption
  | ExtendOption

export type FormArrayOptions = Array<FormArrayOption>

export type FormOptions = FormObjectOptions | FormArrayOptions

export const formProps = {
  // 表单原生属性
  formProps: {
    default: () => ({}),
    type: Object as PropType<Partial<ElFormProps>>
  },
  // 字段配置
  options: {
    type: Object as PropType<FormOptions>,
    default: () => ({})
  },
  rules: {
    type: [Object, Function] as PropType<FormRules | ((formInstance: FormInstance) => FormRules)>,
    default: () => ({})
  },
  // 默认值
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  // 是否自动加载组件的数据
  autoGetAsyncData: {
    type: Boolean,
    default: true
  },
  // 全部组件的前缀
  componentPrepend: {
    type: Function as PropType<(formExpose: FormInstance) => VNode>,
    default: null
  },
  // 组件的后缀
  componentAppend: {
    type: Function as PropType<(formExpose: FormInstance) => VNode>,
    default: null
  },
  rowProps: {
    type: Object as PropType<Partial<RowProps>>,
    default: null
  },
  colProps: {
    type: Object as PropType<Partial<ColProps>>,
    default: () => ({})
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>
