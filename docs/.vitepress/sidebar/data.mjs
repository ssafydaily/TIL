const pipeline = {
  text: '파이프라인',
  items: [
    { text: '소개', link: '/data/pipeline/00_intro.md' },        
  ]
}
const openai = {
  text: 'open AI',
  items: [
    { text: '소개', link: '/data/openai/00_intro.md' },        
    { text: 'responses', link: '/data/openai/01_responses.md' },        
    { text: 'chat completions', link: '/data/openai/02_chat_completions.md' },        
    { text: 'Text generation', link: '/data/openai/03_text_gen.md' },        
    { text: 'Image & Vision', link: '/data/openai/04_image_vision.md' },        
  ]
}
export const data = {
  '/data/': {
    text: 'data',
    collapsed: true,
    items: [
      { text: '소개', link: '/data/' },        
      pipeline,
      openai,
    ]
  }
}