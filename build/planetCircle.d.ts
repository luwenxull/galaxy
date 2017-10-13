import { INode } from 'color-text';
import { BaseType, Selection } from 'd3-selection';
import { IOrbit } from './orbit';
import { IPlanet, IPlanetCallback, Planet } from './planet';
import { selectionGenerics } from './tool';
export interface IPlanetCircle extends IPlanet {
    putOnCap(): void;
    takeOffCap(): void;
    getSize(): number;
    setSize(size: number): void;
    getTargetSize(): number;
    setTargetSize(size: number): void;
}
export declare class PlanetCircle extends Planet implements IPlanetCircle {
    private color;
    private _targetColor;
    private size;
    private _targetSize;
    private gradient?;
    private $circle;
    private requestGradient;
    private _sizeAnimationEnd;
    private _sizeAnimationCallback;
    private hinter;
    constructor({color, size, gradient}?: {
        color?: string;
        size?: number;
        gradient?: any;
    }, externalData?: any, events?: IPlanetCallback);
    propertyToBeClone(): {
        $circle: Selection<BaseType, any, BaseType, any>;
        hinter: INode;
        size: number;
    } & {
        $group: Selection<BaseType, any, BaseType, any>;
        _targetAngle: number;
        angle: number;
    };
    create(parent: selectionGenerics, filter: string, requestGradient: (baseColor: string, id: string) => string, orbit: IOrbit): void;
    updatePosition(r: number, center: number[]): void;
    remove(): void;
    getSize(): number;
    setSize(size: number): void;
    getTargetSize(): number;
    setTargetSize(size: number): void;
    putOnCap(): void;
    takeOffCap(): void;
}
