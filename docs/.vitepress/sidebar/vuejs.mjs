const pinia = {
  text: 'pinia',
  items: [
    {},
  ]
}
// -------------------------------------------
const vueRouter = {
  text: 'vue-router',
  items: [
    {text: '네이게이션 가드', link: '/vuejs/navigation_guard'}
  ]
}
// -------------------------------------------
const vuejs = {
  '/vuejs/': {
    text: 'Vue',
    collapsed: true,
    items: [
      { text: '소개', link: '/vuejs/' },          
      { text: 'Provide/inject', link: '/vuejs/provide_inject' },          
      { text: '이미지 업로드', link: '/vuejs/image_upload' },
      { text: 'Youtube 검색', link: '/vuejs/youtube_axios' },
      { text: 'vue + 모달', link: '/vuejs/bootstrap_modal' },
      vueRouter,
      pinia,
    ]
  },
}

export { vuejs,}