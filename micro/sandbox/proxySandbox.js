let defaultValue = {}

export class ProxySandbox {
  constructor () {
    this.proxy = null
    this.active()
  }
  // 激活
  active () {
    this.proxy = new Proxy(window, {
      get: (target, key) => {
        if (typeof target[key] === 'function') {
          target[key] = target[key].bind(target)
        }
        // 沙箱内没有的值，获取原有的值
        return defaultValue[key] || target[key]
      },
      set: (target, key, value) => {
        defaultValue[key] = value
        return true
      }
    })
  }
  // 失活
  inactive () {
    defaultValue = {}
  }
}