---
title: 快速开始
lang: zh
---

# 快速开始

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
