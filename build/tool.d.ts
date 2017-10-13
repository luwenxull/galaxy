import { BaseType, Selection } from 'd3-selection';
import { IPlanetCallback } from './planet';
export declare type selectionGenerics = Selection<BaseType, any, BaseType, any>;
export interface IStringIndexed {
    [prop: string]: any;
}
export declare function isNullOrUndefined(value: any): boolean;
export declare function angleToRadian(angle: number): number;
export declare function radianToAngle(radian: number): number;
export declare function getAngle(r1: number, r2: number): number;
export declare function getPlanetPosition(radius: number, radian: number, center: number[]): number[];
export declare function isArray<T>(val: T): boolean;
export declare function toArray(val: any): any[];
export declare function iterateObj<T extends IStringIndexed, K extends keyof T>(obj: T, callback: (val: T[K], key: K) => void): IStringIndexed;
export declare function bindEvents<T extends IPlanetCallback>(selection: selectionGenerics, events: T, externalArgs: any[], type?: string): void;
