export const createStore = (initData = {}) => (
  () => {
    let store = initData
    let observers = []
    const getStore = () => store

    const update = (newStore) => {
      if (store !== newStore) {
        const oldStore = store

        store = newStore
  
        observers.forEach(async cb => await cb(store, oldStore))
      }
    }

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