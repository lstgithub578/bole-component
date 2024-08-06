import { TableColumn } from "./table"
import { ExtractPropTypes, PropType } from "vue"
export const tableColumnProps = {
  option: {
    default: () => ({}),
    type: Object as PropType<TableColumn>,
  },
  slots: {
    default: () => ({}),
    type: Object as PropType<Record<string, any>>,
  },
  hiddenColsByLabelSet: {
    default: () => (new Set()),
    type: Set as PropType<Set<string>>,
  }
}

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
