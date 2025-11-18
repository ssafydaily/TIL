const projectTools = {
  text: '프로젝트 도구',
  collapsed: true,
  items: [    
    { text: '소개', link: '/examples/' },
    { text: 'CLI', link: '/examples/tools/cli' },
    { text: 'git', link: '/examples/tools/git' },
    { text: 'npm & 패키지', link: '/examples/tools/npm_package' },
    { text: 'gTTS', link: '/examples/tools/gtts' },

  ]
}

const vueWithDjango = {
  text: 'Vue + DRF',
  collapsed: true,
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
