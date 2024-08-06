import type { PropType, ExtractPropTypes } from "vue"
import { formProps } from "../../form"
import { FormProps } from "element-plus"

export const filterProps = {
  options: formProps.options,
  model: formProps.model,
  formProps: {
    type: Object as PropType<Partial<FormProps>>,
    default: () => ({}),
  },
  dataChange: {
    type: Function as PropType<(data: Record<string, any>) => void>,
    default: null,
  },
  showSearchBtn: {
    default: true,
    type: Boolean as PropType<boolean>,
  },
  showResetBtn: {
    default: true,
    type: Boolean as PropType<boolean>,
  },
  searchBtnText: {
    type: String as PropType<string>,
    default: "搜索",
  },
}

export type FilterProps = ExtractPropTypes<typeof filterProps>
