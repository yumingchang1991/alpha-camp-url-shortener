function addCSSLinkToHead() {
  const HEAD = document.getElementsByTagName('HEAD')[0]
  const link = document.createElement('link')
  HEAD.appendChild(link)
  link.href = '/stylesheets/index.css'
  link.type = 'text/css'
  link.rel = 'stylesheet'
}

addCSSLinkToHead()