
const jsRoot = '/front-end/js'
export const language = {  
  text: 'lang.',
  collapsed: true,
  items: [
    { text: 'intro.', link: `${jsRoot}/` },          
    { text: 'async/await', link: `${jsRoot}/async_await` }, 
    { text: '깊은 복사', link: `${jsRoot}/deep_copy` }, 
    { text: '동등성', link: `${jsRoot}/equality` }, 
    { text: '무한 스크롤', link: `${jsRoot}/infinite_scroll` },          
    { text: '요소 가시성 관찰', link: `${jsRoot}/intersection_observer` },
    { text: '로컬 저장소', link: `${jsRoot}/localstorage` },
    { text: '모듈', link: `${jsRoot}/module` },          
    { text: '옵셔널 체이닝', link: `${jsRoot}/opt_chain` },          
    { text: 'setTimeout/setInterval', link: `${jsRoot}/set_time_interval` },          
    { text: 'Promise', link: `${jsRoot}/promise` },          
    { text: '정렬', link: `${jsRoot}/sorting` },          
    { text: 'this', link: `${jsRoot}/this` },                
    { text: '폼조작', link: `${jsRoot}/form` },                
    { text: 'getter & setter', link: `${jsRoot}/getter_setter` },                
  ]  
}

export const browser = {  
  text: 'browser',
  collapsed: true,
  items: [
 
  ]  
}

export const javascript = {
  '/front-end/js/': {
    text: 'JS',
    collapsed: true,
    items: [      
      language,
    ]
  },
}
