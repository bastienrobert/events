var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function (name, fn) {
        if (!this.events[name])
            this.events[name] = [];
        this.events[name].push(fn);
    };
    EventEmitter.prototype.off = function (name, fn) {
        if (this.events[name]) {
            var length_1 = this.events[name].length;
            var result = [];
            for (var i = 0; i < length_1; i++) {
                var currentFn = this.events[name][i];
                if (currentFn !== fn)
                    result.push(currentFn);
            }
            this.events[name] = result;
        }
    };
    EventEmitter.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.events[name])
            return;
        var length = this.events[name].length;
        for (var i = 0; i < length; i++) {
            this.events[name][i].apply(null, args);
        }
    };
    return EventEmitter;
}());

export default EventEmitter;
