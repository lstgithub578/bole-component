import { ConfigProviderProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export const LayoutProvideKey = Symbol('BoLayout')

export type ToolbarButtonType = 'refresh' | 'size' | 'colToggle' | 'searchToggle'

export const layoutProps = {
  hideToolbarBtns: {
    type: Array as PropType<ToolbarButtonType[]>,
    default: () => []
  },
  defaultSize: {
    size: String as PropType<ConfigProviderProps['size']>,
    default: 'default'
  }
}

export type LayoutProps = ExtractPropTypes<typeof layoutProps>
