import { math } from './ai/math.mjs'
import { mldl } from './ai/mldl.mjs'
import { pipeline } from './ai/pipeline.mjs'
import { openai } from './ai/openai.mjs'
import { tools } from './ai/tools.mjs'

export const data = {
  '/data/': {
    text: 'data',
    collapsed: true,
    items: [
      { text: '소개', link: '/data/' },        
      math,
      mldl,
      pipeline,
      tools,
      openai,      
    ]
  }
}