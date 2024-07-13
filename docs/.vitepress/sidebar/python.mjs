const data = {
  text: '데이터 처리',
  items: [
    { text: '데이터 분석', link: '/python/20_data.md'},
    { text: 'Numpy', link: '/python/21_numpy.md'},
    { text: 'Pandans', link: '/python/31_pandas.md'},
    { text: 'Matplot', link: '/python/41_matplot.md'},
  ]
}
export const python = {
  '/python/': {
    text: 'Python',
    collapsed: true,
    items: [
      { text: '소개', link: '/python/' },        
      { text: '자료형', link: '/python/01_data_type.md' },              
      { text: 'File I/O', link: '/python/10_fileIO.md' }, 
      { text: '내장 변수', link: '/python/12_main.md' }, 
      data,
    ]
  }
}