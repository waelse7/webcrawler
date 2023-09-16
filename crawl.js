const { JSDOM } = require('jsdom')



function getURLsFromHTML(htmlBody, baseURL){
  let lst = []
  const dom = new JSDOM(htmlBody)
  const elements = dom.window.document.querySelectorAll('a')
  for (const el of elements) {
    if (el.href.startsWith('/')){
      try {
        url = new URL(`${baseURL}${el.href}`)
        lst.push(`${baseURL}${el.href}`)
      }catch (err){console.log(err.message)}
    }else {
      try {
        url = new URL(el.href)
        lst.push(el.href)
      }catch (err){console.log(err.message)}
    }
  }
  return lst
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const path = `${urlObj.hostname}${urlObj.pathname}`
  if (path.length > 0 && path.slice(-1) === "/"){
    return path.slice(0, -1)
  }
  return path
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}
