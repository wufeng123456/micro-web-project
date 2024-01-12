import { getList } from '../const/subApp'
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    // 执行原生的方法
    globalEvent.apply(this, arguments)
    // 注册并触发自定义事件
    const event = new Event(eventName)
    window.dispatchEvent(event)
  }
}

export const getCurrentApp = () => {
  const { pathname } = window.location
  return filterApp('activeRule', pathname)
}

export const getAppByRoute = (router) => {
  return filterApp('activeRule', router)
}

const filterApp = (key, value) => {
  const currentApp = getList().filter(app => app[key] === value)
  return currentApp && currentApp.length ? currentApp[0] : {}
}

export const isTurnChild = () => {
  const { pathname, hash } = window.location
  const url = pathname + hash
  const currentPrefix = url.match(/(\/\w+)/g)
  // 如果路由没有切换，
  if (currentPrefix && currentPrefix[0] === window.__CURRENT_SUB_APP__ && hash === window.__CURRENT_HASH__) return false

  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__

  // 获取当前子应用
  const currentSubApp = pathname.match(/(\/\w+)/)
  if (!currentSubApp) return false

  // 更新当前路由信息
  window.__CURRENT_SUB_APP__ = currentSubApp[0]
  window.__CURRENT_HASH__ = hash

  return true
}
