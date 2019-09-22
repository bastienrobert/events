export default class EventEmitter {
  events: { [index: string]: (() => void)[] } = {}

  public on(name: string, fn: () => void): void {
    if (!this.events[name]) this.events[name] = []
    this.events[name].push(fn)
  }

  public once(name: string, fn: () => void): void {
    const onceFn = (...args: any[]) => {
      fn.apply(this, args)
      this.off(name, onceFn)
    }
    this.on(name, onceFn)
  }

  public off(name: string, fn: () => void): void {
    if (this.events[name]) {
      const length = this.events[name].length
      let result = []
      for (let i = 0; i < length; i++) {
        const currentFn = this.events[name][i]
        if (currentFn !== fn) result.push(currentFn)
      }
      this.events[name] = result
    }
  }

  public emit(name: string, ...args: any[]): void {
    if (!this.events[name]) return

    const length = this.events[name].length
    for (let i = 0; i < length; i++) {
      this.events[name][i].apply(null, args)
    }
  }
}
