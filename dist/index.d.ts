import { Event } from './types';
export default class EventEmitter {
    private _events;
    /**
     * Returns an array listing the events for which the emitter has registered listeners
     */
    readonly eventNames: string[];
    /**
     * Returns a copy of the array of listeners for the event named eventName
     * @param name - name of the event
     */
    listeners(name: string): Event[] | [];
    /**
     * Returns the number of listeners listening to the given event name
     * @param name - name of the event
     * @returns number of listeners listening to the given event name
     */
    listenerCount(name: string): number;
    /**
     * Alias for emitter.on(name, fn)
     */
    addListener: (name: string, fn: () => void) => this;
    /**
     * Alias for emitter.off(name, fn)
     */
    removeListener: (name: string, fn: () => void) => this;
    /**
     * Adds the listener function to the end of the listeners array for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    on(name: string, fn: () => void): this;
    /**
     * Adds a one-time listener function for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    once(name: string, fn: () => void): this;
    /**
     * Removes the specified listener from the listener array for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    off(name: string, fn: () => void): this;
    /**
     * Removes all listeners, or those of the specified eventName
     *
     * **It's a bad practice to remove listeners added elsewhere in the code**
     * @param name - name of the event
     * @returns EventEmitter instance
     */
    removeAllListeners(name: string): this;
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each
     * @param name - name of the event
     * @param ...args - supplied arguments to listeners
     * @returns returns true if the event had listeners, false otherwise
     */
    emit(name: string, ...args: any[]): boolean;
}
