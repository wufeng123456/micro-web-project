import { performScriptForFunction, performScriptForEval } from './performScript'
import { ProxySandbox } from './proxySandbox'

const isCheckLifeCycle = (lifeCycle) => lifeCycle && lifeCycle.bootstrap && lifeCycle.mount && lifeCycle.unmount

export const sandBox = (app, script) => {
  const proxy = new ProxySandbox()

  if (!app.proxy) {
    app.proxy = proxy
  }

  // 1. 设置环境变量
  window.__MICRO_WEB__ = true

  // 执行js，获取子应用生命周期
  const lifeCycle = performScriptForFunction(script, app.name, app.proxy.proxy)

  if (isCheckLifeCycle(lifeCycle)) {
    app.bootstrap = lifeCycle.bootstrap
    app.mount = lifeCycle.mount
    app.unmount = lifeCycle.unmount
  }
}