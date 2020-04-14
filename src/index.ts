import { filter } from './helpers'
import { Event, Events } from './types'

export type Arguments = any[]
export type Callback = (...args: Arguments) => any

export default class EventEmitter {
  private _events: Events = {}

  /**
   * Returns an array listing the events for which the emitter has registered listeners
   */
  public get eventNames(): string[] {
    return Object.keys(this._events)
  }

  /**
   * Returns a copy of the array of listeners for the event named eventName
   * @param name - name of the event
   */
  public listeners(name: string): Event[] | [] {
    const event = this._events[name]
    return event ? event.slice() : []
  }

  /**
   * Returns the number of listeners listening to the given event name
   * @param name - name of the event
   * @returns number of listeners listening to the given event name
   */
  public listenerCount(name: string): number {
    const event = this._events[name]
    return event ? event.length : 0
  }

  /**
   * Alias for emitter.on(name, fn)
   */
  public addListener = this.on

  /**
   * Alias for emitter.off(name, fn)
   */
  public removeListener = this.off

  /**
   * Adds the listener function to the end of the listeners array for the given event name
   * @param name - name of the event
   * @param fn - callback function
   * @returns EventEmitter instance
   */
  public on(name: string, fn: Callback): this {
    if (!this._events[name]) this._events[name] = []
    this._events[name].push(fn)
    return this
  }

  /**
   * Adds a one-time listener function for the given event name
   * @param name - name of the event
   * @param fn - callback function
   * @returns EventEmitter instance
   */
  public once(name: string, fn: Callback): this {
    const onceFn = (...args: any[]) => {
      fn.apply(this, args)
      this.off(name, onceFn)
    }
    this.on(name, onceFn)
    return this
  }

  /**
   * Removes the specified listener from the listener array for the given event name
   * @param name - name of the event
   * @param fn - callback function
   * @returns EventEmitter instance
   */
  public off(name: string, fn: Callback): this {
    if (this._events[name]) {
      const result = filter(this._events[name], (event) => event !== fn)
      if (result.length > 0) this._events[name] = result
      else delete this._events[name]
    }
    return this
  }

  /**
   * Removes all listeners, or those of the specified eventName
   *
   * **It's a bad practice to remove listeners added elsewhere in the code**
   * @param name - name of the event
   * @returns EventEmitter instance
   */
  public removeAllListeners(name?: string): this {
    if (!name) this.eventNames.forEach((n) => this.removeAllListeners(n))
    else if (this._events[name]) delete this._events[name]
    return this
  }

  /**
   * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each
   * @param name - name of the event
   * @param ...args - supplied arguments to listeners
   * @returns returns true if the event had listeners, false otherwise
   */
  public emit(name: string, ...args: Arguments): boolean {
    if (!this._events[name]) return false

    const length = this._events[name].length
    for (let i = 0; i < length; i++) {
      this._events[name][i].apply(null, args)
    }
    return length > 0
  }
}
