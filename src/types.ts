export type Event = (...args: any[]) => any
export type Events = { [index: string]: Event[] }
