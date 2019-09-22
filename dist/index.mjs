/**
 * fast filter function
 * @param arr - The array (or array-like) to filter
 * @param fn - The filter function
 * @returns filtered array
 */
function filter(arr, fn) {
    var length = arr.length;
    var result = [];
    for (var i = 0; i < length; i++) {
        var current = arr[i];
        if (fn(current, i))
            result.push(current);
    }
    return result;
}

var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = {};
        /**
         * Alias for emitter.on(name, fn)
         */
        this.addListener = this.on;
        /**
         * Alias for emitter.off(name, fn)
         */
        this.removeListener = this.off;
    }
    Object.defineProperty(EventEmitter.prototype, "eventNames", {
        /**
         * Returns an array listing the events for which the emitter has registered listeners
         */
        get: function () {
            return Object.keys(this._events);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a copy of the array of listeners for the event named eventName
     * @param name - name of the event
     */
    EventEmitter.prototype.listeners = function (name) {
        var event = this._events[name];
        return event ? event.slice() : [];
    };
    /**
     * Returns the number of listeners listening to the given event name
     * @param name - name of the event
     * @returns number of listeners listening to the given event name
     */
    EventEmitter.prototype.listenerCount = function (name) {
        var event = this._events[name];
        return event ? event.length : 0;
    };
    /**
     * Adds the listener function to the end of the listeners array for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    EventEmitter.prototype.on = function (name, fn) {
        if (!this._events[name])
            this._events[name] = [];
        this._events[name].push(fn);
        return this;
    };
    /**
     * Adds a one-time listener function for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    EventEmitter.prototype.once = function (name, fn) {
        var _this = this;
        var onceFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            fn.apply(_this, args);
            _this.off(name, onceFn);
        };
        this.on(name, onceFn);
        return this;
    };
    /**
     * Removes the specified listener from the listener array for the given event name
     * @param name - name of the event
     * @param fn - callback function
     * @returns EventEmitter instance
     */
    EventEmitter.prototype.off = function (name, fn) {
        if (this._events[name]) {
            var result = filter(this._events[name], function (event) { return event !== fn; });
            if (result.length > 0)
                this._events[name] = result;
            else
                delete this._events[name];
        }
        return this;
    };
    /**
     * Removes all listeners, or those of the specified eventName
     *
     * **It's a bad practice to remove listeners added elsewhere in the code**
     * @param name - name of the event
     * @returns EventEmitter instance
     */
    EventEmitter.prototype.removeAllListeners = function (name) {
        if (this._events[name])
            delete this._events[name];
        return this;
    };
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each
     * @param name - name of the event
     * @param ...args - supplied arguments to listeners
     * @returns returns true if the event had listeners, false otherwise
     */
    EventEmitter.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._events[name])
            return false;
        var length = this._events[name].length;
        for (var i = 0; i < length; i++) {
            this._events[name][i].apply(null, args);
        }
        return length > 0;
    };
    return EventEmitter;
}());

export default EventEmitter;
