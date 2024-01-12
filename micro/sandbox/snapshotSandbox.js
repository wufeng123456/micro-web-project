export class snapShotSandbox {
  constructor () {
    this.proxy = window
    this.active()
  }

  active () {
    this.snapshot = {}

    for (let key in window) {
      snapshot[key] = window[key]
    }
  }

  inactive () {
    for (let key in window) {
      if (window[key] !== this.snapshot[key]) {
        window[key] = this.snapshot[key]
      }
    }
  }

}