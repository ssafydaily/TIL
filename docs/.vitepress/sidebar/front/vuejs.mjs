const vueRoot = '/front-end/vuejs'

const pinia = {
  text: 'pinia',
  items: [
    {text: 'Store', link: `${vueRoot}/pinia/01_store`},
    {text: 'State', link: `${vueRoot}/pinia/02_state`},
    {text: 'Getters', link: `${vueRoot}/pinia/03_getters`},
    {text: 'Actions', link: `${vueRoot}/pinia/04_actions`},
    {text: 'PLugins', link: `${vueRoot}/pinia/05_plugins`},
  ]
}
// -------------------------------------------
const vueRouter = {
  text: 'vue-router',
  items: [
    {text: '네이게이션 가드', link: `${vueRoot}/navigation_guard`}
  ]
}
// -------------------------------------------
const vuejs = {
  '/front-end/vuejs/': {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: '소개', link: `${vueRoot}/` },          
      { text: 'Provide/inject', link: `${vueRoot}/provide_inject` },          
      { text: '이미지 업로드', link: `${vueRoot}/image_upload` },
      { text: 'Youtube 검색', link: `${vueRoot}/youtube_axios` },
      { text: 'vue + 모달', link: `${vueRoot}/bootstrap_modal` },
      { text: 'watch와 ref객체 감시', link: `${vueRoot}/watch_source` },
      vueRouter,
      pinia,
    ]
  },
}

export { vuejs,}