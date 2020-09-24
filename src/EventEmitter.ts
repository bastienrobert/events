import LightEventEmitter from './LightEventEmitter'
import { Event } from './types'

export type Arguments = any[]
export type Callback = (...args: Arguments) => any

export default class EventEmitter extends LightEventEmitter {
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
}
