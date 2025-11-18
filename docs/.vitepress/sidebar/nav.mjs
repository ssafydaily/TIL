import { frontNav } from './front/nav.mjs'
import { backendNav } from './backend/nav.mjs'

const langRoot = '/lang'
const algoRoot = '/algo'

export const nav = [
  { text: 'Home', link: '/' },
  { text: 'Lang.',
    items: [
      { text: 'Python', link: '/python/' },
      { text: 'Java', link: '/java/' },
    ]
  },
  { text: 'Algo.', 
    items: [
      { text: 'Intro.', link: '/algo/' },
      { text: 'Basic', link: '/algo/basic/' },      
    ]
  },
  
  backendNav,
  frontNav,

  { text: 'DATA', link: '/data/' },
  { text: 'PJT', link: '/examples/' },
]
