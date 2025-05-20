const projectTools = {
  text: '프로젝트 도구',
  items: [    
    { text: '소개', link: '/examples/' },
    { text: '패키지와 npm', link: '/examples/tools/npm_package' },
  ]
}

const vueWithDjango = {
  text: 'Vue + DRF',
  items: [    
    { text: 'CORS', link: '/examples/cors' },        
    { text: 'dj-rest-auth', link: '/examples/dj_rest' },        
    { text: 'Custom User', link: '/examples/custom_registration' },        
    { text: 'pagination', link: '/examples/pagination' },        
    { text: 'tmdb', link: '/examples/tmdb' },        
    { text: 'jwt', link: '/examples/jwt' },        
    { text: 'API 요청', link: '/examples/request_api.md' },        
    { text: 'Kakao MAP API', link: '/examples/kakao.md' },        
  ]
}

export const pjt = {
  '/examples/': {
    text: '결합',
    collapsed: true,
    items: [      
      projectTools,
      vueWithDjango,    
    ]
  },
}
