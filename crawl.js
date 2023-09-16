const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
  
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)
  if (baseURLObj.hostname !== currentURLObj.hostname){
    return pages
  }

  const normalizeBaseURL = normalizeURL(baseURL)
  const normalizeCurrentURL = normalizeURL(currentURL)
  if (pages[normalizeCurrentURL] >= 1){
    pages[normalizeCurrentURL]++
    return pages
  }
  pages[normalizeCurrentURL] = 1

  console.log(`Crawling: ${currentURL}`);
  try {
    const response = await fetch(baseURL)
    if (!response.ok){
      console.log(`Failed to fetch HTML from ${url}. Status: ${response.status}`)
      return pages
    }


    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')){
      console.log(`Failed to fetch HTML from ${url}. content-type: ${contentType}`)
      return pages
    }
    
    const htmlBody = await response.text()
    const urls = getURLsFromHTML(htmlBody, baseURL)
    for (const u of urls){
      pages = await crawlPage(baseURL, u, pages)
    }
  }catch (err){console.log(`Error: ${err.message} \n On page: ${currentURL}`)}
  return pages
}

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
  getURLsFromHTML,
  crawlPage
}
