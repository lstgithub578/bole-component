import { ExtractPropTypes, PropType, ComputedRef } from "vue"

import { ButtonProps, TableColumnCtx } from "element-plus"

export interface ButtonOption {
  label?: string
  props?:
    | ((scope: {
        row: any
        column: any
        $index: number
      }) => Partial<ButtonProps>)
    | Partial<ButtonProps>
  click?: <T = any>(scope: { row: T; column: any; $index: number }) => void
}

export interface TableColumn<T = any> {
  label?: string
  prop?: string
  buttons?: Array<ButtonOption>
  props?: Partial<TableColumnCtx<T>>
  children?: Array<TableColumn>
  show?: boolean | (() => boolean)
  slot?: string
}

export type ActionOptions = {
  label?: String
} & Omit<TableColumn, "children" | "slot">

export interface TableObjectColumns {
  [prop: string]: string | TableColumn
}

export type TableArrayColumns = Array<TableColumn>

export type TableColums = TableArrayColumns | TableObjectColumns

export const tableProps = {
  // 操作列配置
  action: {
    default: null,
    type: Object as PropType<ActionOptions>,
  },
  data: {
    default: null,
    type: Array as PropType<Array<any>>,
  },
  options: {
    default: () => ({}),
    type: Object as PropType<TableColums>,
  },
  hiddenColsByLabel: {
    default: () => [],
    type: Array as PropType<string[]>,
  },
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export interface TableInstance {
  tableColumnsOptions: ComputedRef<TableArrayColumns>
}
