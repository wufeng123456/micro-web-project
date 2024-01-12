import { getLifeCycle } from "../const/mainLiftCycle"
import { loadHtml } from "../loader"
import { getAppByRoute } from "../utils"

export const lifeCycle = async () => {
  // 获取上一个子应用
  const prevApp = getAppByRoute(window.__ORIGIN_APP__)
  // 获取下一个子应用
  const nextApp = getAppByRoute(window.__CURRENT_SUB_APP__)

  if (!nextApp) return

  // 销毁上一个子应用
  if (prevApp && prevApp.unmount) {
    // 销毁沙箱
    if (prevApp.proxy) {
      prevApp.proxy.inactive()
    }
    await destoryed(prevApp)
  }

  // 加载下一个子应用
  const app = await beforeLoad(nextApp)

  await mounted(app)
}

const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad() // 子应用注册传入生命周期
  const subApp = await loadHtml(app) // 获取子应用内容
  subApp && subApp.beforeLoad && subApp.beforeLoad() // 子应用在项目中注册的生命周期
  return subApp
}

const destoryed = async (app) => {
  app && app.unmount && app.unmount(app)

  await runMainLifeCycle('destoryed')
}

const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })
  await runMainLifeCycle('mounted')
}

const runMainLifeCycle = async (type) => {
  const lifeCycle = getLifeCycle()
  await Promise.all(lifeCycle[type].map(async item => await item()))
}