import DefaultTheme from 'vitepress/theme'
import Demo from './component/Demo.vue'
import IconSelect from './component/IconSelect.vue'
import './styles/app.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'bole-component/dist/index.css'
export const globals = [
  ['Demo', Demo],
  [IconSelect.name, IconSelect]
]

export default {
  extends: DefaultTheme
}
