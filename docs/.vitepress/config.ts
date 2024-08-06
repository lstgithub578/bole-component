import type { UserConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
import { nav } from './config/nav'
import sidebars from './config/sidebar'

const config: UserConfig = {
  markdown: {
    config: (md) => mdPlugin(md)
  },
  // locales: {
  //   root: {
  //     label: '简体中文',
  //     lang: 'zh',
  title: 'Bole',
  description: '基于ElemenPlus的组件库',
  themeConfig: {
    sidebar: sidebars['/zh'],
    nav,
    outline: {
      level: [2, 3],
      label: '页面导航'
    },
    footer: {
      message: 'MIT Licensed.'
    },
    socialLinks: [{ icon: 'github', link: 'https://lstgithub578.github.io/bole-component' }]
    // },

    // },
    // en: {
    //   label: 'English',
    //   lang: 'en',
    // }
  }
}

export default config
