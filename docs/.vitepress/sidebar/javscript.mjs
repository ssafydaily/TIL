export const language = {  
  text: 'lang.',
  collapsed: true,
  items: [
    { text: 'intro.', link: '/js/' },          
    { text: 'async/await', link: '/js/async_await' }, 
    { text: '무한 스크롤', link: '/js/infinite_scroll' },          
    { text: '요소 가시성 관찰', link: '/js/intersection_observer' },
    { text: '로컬 저장소', link: '/js/localstorage' },
    { text: '모듈', link: '/js/module' },          
    { text: '옵셔널 체이닝', link: '/js/opt_chain' },          
    { text: 'setTimeout/setInterval', link: '/js/set_time_interval' },          
    { text: 'Promise', link: '/js/promise' },          
    { text: '정렬', link: '/js/sorting' },          
    { text: 'this', link: '/js/this' },                
    { text: 'Form', link: '/js/form' },                
    { text: 'getter & setter', link: '/js/getter_setter' },                
  ]  
}

export const browser = {  
  text: 'browser',
  collapsed: true,
  items: [
 
  ]  
}

export const javascript = {
  '/js/': {
    text: 'JS',
    collapsed: true,
    items: [      
      language,
    ]
  },
}
