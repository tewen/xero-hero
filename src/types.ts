export type DecisionFunction<T> = (item: T) => boolean;

export type PropertyOrFunction<T> = string | ((item: T) => string);

export type Constructor<T> = new (...arguments_: any[]) => T;
