import { patchRouter } from "../utils"
import { turnApp } from "./routerHandle"

export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')

  // 监听自定义事件
  window.addEventListener('micro_push', turnApp)
  window.addEventListener('micro_replace', turnApp)

  // 监听返回事件
  window.onpopstate = async function () {
    await turnApp()
  }
}