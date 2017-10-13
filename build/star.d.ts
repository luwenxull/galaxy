import { BaseType } from 'd3-selection';
import { selectionGenerics } from './tool';
export interface IStar {
    center: number[];
    radius: number;
    twinkle(place: BaseType, start: string, stop: string, step?: number, filterID?: string): void;
}
export declare class Star implements IStar {
    center: number[];
    radius: number;
    protected $group: selectionGenerics;
    private twinkleController;
    private colorInitial;
    private colorBrighter;
    private colorInterpolator;
    constructor(center: number[], radius: number);
    twinkle(place: BaseType, start: string, stop: string, step?: number, filterID?: string): void;
    private create(place, filterID);
    private processTwinkle();
}
