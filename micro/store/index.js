export const createStore = (initData = {}) => (
  () => {
    // 状态初始化
    let store = initData
    // 订阅收集
    let observers = []
    // 获取当前状态
    const getStore = () => store
    // 发布更新
    const update = (newStore) => {
      if (store !== newStore) {
        const oldStore = store
        store = newStore
        observers.forEach(async cb => await cb(store, oldStore))
      }
    }
    // 订阅
    const subscribe = (fn) => {
      observers.push(fn)
    }
    return {
      getStore,
      update,
      subscribe
    }
  }
)()