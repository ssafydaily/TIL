const pipeline = {
  text: '파이프라인',
  items: [
    { text: '소개', link: '/data/pipeline/00_intro.md' },        
  ]
}
export const data = {
  '/data/': {
    text: 'data',
    collapsed: true,
    items: [
      { text: '소개', link: '/data/' },        
      pipeline,
    ]
  }
}