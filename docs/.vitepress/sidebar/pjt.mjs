const vueWithDjango = {
  text: 'Vue + DRF',
  items: [    
    { text: 'CORS', link: '/examples/cors' },        
    { text: 'pagination', link: '/examples/pagination' },        
    { text: 'tmdb', link: '/examples/tmdb' },        
    { text: 'dj-rest-auth', link: '/examples/dj_rest' },        
    { text: 'Custom User', link: '/examples/custom_registration' },        
    { text: 'jwt', link: '/examples/jwt' },        
  ]
}

export const pjt = {
  '/examples/': {
    text: '결합',
    collapsed: true,
    items: [
      { text: '소개', link: '/examples/' },      
      vueWithDjango,    
    ]
  },
}
