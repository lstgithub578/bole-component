import { isObject } from '@bole-component/utils'
import { DialogProps, ElMessage } from 'element-plus'
import { mergeObj } from '@bole-component/utils'

export interface DialogConfig<T = any, V = any> {
  formDataParser?: (value: T) => V
  dialogProps?: Partial<DialogProps>
}

export const dialogConfig: Required<DialogConfig> = {
  formDataParser: async (value: any) => {
    if (value instanceof Promise) {
      try {
        value = await value
      } catch (error: any) {
        ElMessage.error(error)
      }
    }
    if (isObject(value)) {
      value = Object.assign({}, value)
      value = isObject(value.data) ? value.data : value
    }
    return value
  },
  dialogProps: {}
}

export function setDialogConfig(config: DialogConfig) {
  mergeObj(config, dialogConfig)
}

export function getDialogProps(props: Partial<DialogProps>): Partial<DialogProps> {
  return Object.assign({}, dialogConfig.dialogProps, props)
}
