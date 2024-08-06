# BoleCompoment

[![ docs by vitepress](https://img.shields.io/badge/docs%20by-vitepress-10b981)](https://vitepress.dev/)
[![Build With Rollup](https://img.shields.io/badge/build%20with-rollup-646cff.svg)](https://rollupjs.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://www.pnpm.cn/)
[![element-plus](https://img.shields.io/badge/ui%20-element%20plus-409eff.svg)](https://element-plus.org/)

element-plus增强组件

## 文档

[在线文档](https://lstgithub578.github.io/bole-component/)

## 组件列表

- Form 表单
- Dialog 对话框
- Table 表格
- Filter 搜索
- Layout 布局

## 安装

```sh
# pnpm
$ pnpm install bole-component

# NPM
$ npm install bole-component --save

# Yarn
$ yarn add bole-component

```

## 完整导入

```TypeScript
// main.ts / main.js
import { createApp } from 'vue'

// 导入element-plus 及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入bole-component 及其样式
import BoleComponent from 'bole-component'
import 'bole-component/dist/index.css'

import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)
// 使用bole-component
app.use(BoleComponent)

app.mount('#app')
```

## 自动按需导入

```sh
$ npm install -D unplugin-vue-components unplugin-auto-import
```

```TypeScript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { BoleComponentResolver } from 'bole-component'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), BoleComponentResolver()],
    }),
  ],
})

```

## LICENSE

MIT
