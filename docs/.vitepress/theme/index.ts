import * as Bole from 'bole-component'
import * as ElementPlus from 'element-plus'
import { define } from '../utils/types'
import type { Theme as ThemeType } from 'vitepress'

import { globals } from '../vitepress'

// 使用vitepress-theme-demoblock主题，并注册组件(包含主题中默认的组件)。
import Theme from 'vitepress/dist/client/theme-default/index.js'

export default define<ThemeType>({
  base: '/bole-component/',
  ...Theme,
  enhanceApp: ({ app }) => {
    Object.keys(Bole).forEach((key) => {
      if (key.startsWith('Bo') && Bole[key].name) {
        app.component(Bole[key].name, Bole[key])
      }
    })

    Object.keys(ElementPlus).forEach((key) => {
      if (key.startsWith('El') && ElementPlus[key].name) {
        app.component(ElementPlus[key].name, ElementPlus[key])
      }
    })

    globals.forEach(([name, comp]) => {
      app.component(name as string, comp as any)
    })
  }
})
