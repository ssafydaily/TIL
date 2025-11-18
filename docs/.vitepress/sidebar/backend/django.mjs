const djangoRoot = '/back-end/django'
export const django = {
  '/back-end/django/': {
    text: 'Django',
    collapsed: true,
    items: [
      { text: '소개', link: `${djangoRoot}/` },        
      { text: '요청과 응답', link: `${djangoRoot}/request_response` },        
      { text: 'CBV', link: `${djangoRoot}/cbv` },        
      { text: 'environ', link: `${djangoRoot}/environ` },        
    ]
  }
}