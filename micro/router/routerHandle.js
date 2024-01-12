import { lifeCycle } from "../lifecycle"
import { isTurnChild } from "../utils"

export const turnApp = async () => {
  if (isTurnChild()) {
    console.log('路由更新了，下一步走生命周期')
    await lifeCycle()
  }
}