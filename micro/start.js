import { rewriteRouter } from './router/rewriteRouter'
import { setLifeCycle } from "./const/mainLiftCycle"
import { getList, setList } from "./const/subApp"
import { getCurrentApp } from './utils'
import { prefetch } from './loader/prefetch'

// 路由拦截
rewriteRouter()

export const registerMicroApps = (appList, lifeCycle) => {
  // 子应用注册
  setList(appList)
  // 主应用生命周期
  setLifeCycle(lifeCycle)
}

export const start = () => {

  const appList = getList()
  if (!appList.length) {
    throw new Error('子应用不能为空，请注册子应用')
  }

  const app = getCurrentApp()

  const { pathname, hash } = window.location

  if (!hash) {
    // 没有使用的子应用路由
    // 1、抛出错误
    // 2、跳转默认页面，一般是登录页或者首页
    window.history.pushState('', '', '/vue3#/index')
  }

  if (app && hash) {
    const url = pathname + hash
    window.history.pushState('', '', url)
  }

  // 预加载子应用
  prefetch()
}