import { DialogProps as ELDialogProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'
import { FormInstance } from '../../form/src/form'

export const DialogProvideKey = Symbol('BoDialog')

export interface DialogConfirmParam<T = any> {
  close: () => void
  data: T
  loading: () => void
  stopLoading: () => void
}

export interface DialogCloseParam {
  close: () => void
}

export interface DialogOpenOptions<T = any, V = any> {
  cancelBtnText?: string
  confirmBtnText?: string
  width?: string | number
  height?: string
  title?: string
  top?: string
  validateForm?: boolean
  setFormData?: ((callBack: (func: (form: FormInstance) => void) => void) => V) | null
  cancel?: (param: DialogCloseParam) => void
  confirm?: (param: DialogConfirmParam<T>) => void
}

export type DialogState = {
  show: boolean
  loading: boolean
  scopedData: any
  windowHeight: number
  height: string
}

export interface DialogInject {
  form?: FormInstance
}

export type DialogInstance = {
  open: <T = any>(dialogOpenOptions?: DialogOpenOptions<T>) => void
  inject: DialogInject
}

export const dialogProps = {
  // dialog原生属性
  dialogProps: {
    default: () => ({}),
    type: Object as PropType<Partial<ELDialogProps>>
  },
  getAsyncDataWhenEveryOpen: {
    default: true,
    type: Boolean as PropType<boolean>
  }
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
