import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar/sidebar.mjs'
import { nav } from './sidebar/nav.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TIL",
  base: '/TIL',
  description: "algorithm, python, html, css, javascript, Vuejs, ...",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-JongYun'
    },

    search: {
      provider: 'local'
    }
  },

})
