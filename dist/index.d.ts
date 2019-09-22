export default class EventEmitter {
    events: {
        [index: string]: (() => void)[];
    };
    on(name: string, fn: () => void): void;
    off(name: string, fn: () => void): void;
    emit(name: string, ...args: any[]): void;
}
