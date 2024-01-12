import { sandBox } from "../sandbox"
import { fetchResource } from "../utils/fetchResource"
// let path = require('path')

export const loadHtml = async (app) => {
  let container = app.container
  let entry = app.entry
  if (!entry) return
  const [dom, scripts] = await parseHtml(entry, app.name)
  let ct = document.querySelector(container)
  if (!ct) {
    throw new Error('子应用没有挂载点')
  }
  ct.innerHTML = dom
  scripts.forEach(item => {
    sandBox(app, item)
  })
  return app
}

// 缓存
const cache = {}

export const parseHtml = async (entry, name) => {
  if (cache[name]) {
    return cache[name]
  }

  const html = await fetchResource(entry)

  let allScript = []
  const div = document.createElement('div')
  div.innerHTML = html
  
  const [dom, scriptUrl, script] = await getResources(div, entry)
  const fetchedScripts = await Promise.all(scriptUrl.map(async url => await fetchResource(url)))
  allScript = script.concat(fetchedScripts)

  cache[name] = [dom, allScript]
  return [dom, allScript]
}

export const getResources = (root, entry) => {
  const scriptUrl = [] // script标签外部链接
  const script = [] // 写在script标签内部的代码
  const dom = root.outerHTML

  function deepParse(element) {
    let parent = element.parent
    let children = element.children

    // script标签资源
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src')
      if (!src) {
        script.push(element.outerHTML)
      } else {
        // 外部资源链接
        if (src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          const { protocol } = window.location
          scriptUrl.push(`${protocol}${entry}/${src}`)
        }
      }

      if (parent) {
        parent.replaceChild(document.createComment('该标签已被为前端替换'), element)
      }
    }

    // link标签资源
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href')
        // 外部资源链接
        if (href.endsWith('.js')) {
          if (href.startsWith('http')) {
            scriptUrl.push(href)
          } else {
            const { protocol } = window.location
            scriptUrl.push(`${protocol}${entry}/${src}`)
          }
        }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }
  }

  deepParse(root)

  return [dom, scriptUrl, script]
}