import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TIL",
  base: '/TIL',
  description: "algorithm, python, html, css, javascript, Vuejs, ...",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vuejs', link: '/vuejs/' },
      { text: 'DRF', link: '/drf/' }
    ],

    sidebar: {
      '/drf/': {
        text: 'DRF',
        collapsed: true,
        items: [
          { text: '소개', link: '/drf/' },          
        ]
      },
      '/vuejs/': {
        text: 'Vue',
        collapsed: true,
        items: [
          { text: '소개', link: '/vuejs/' },          
          { text: 'Youtube 검색', link: '/vuejs/youtube_axios' }
        ]
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-JongYun'
    }  
  }
})
