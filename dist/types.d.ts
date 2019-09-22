export declare type Event = (...args: any[]) => any;
export declare type Events = {
    [index: string]: Event[];
};
