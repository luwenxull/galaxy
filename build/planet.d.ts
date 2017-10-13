import { BaseType, Selection } from 'd3-selection';
import { IOrbit } from './orbit';
import { selectionGenerics } from './tool';
export interface IPlanetCallback {
    [prop: string]: (planet?: IPlanet, orbit?: IOrbit) => any;
}
export interface IPlanet {
    propertyToBeClone(): object;
    create(parent: selectionGenerics, filter: string, requestGradient: (baseColor: string, id: string) => string, orbit: IOrbit): void;
    updatePosition(radius: number, center: number[]): void;
    remove(): void;
    getAngle(): number;
    setAngle(angle: number): void;
    getTargetAngle(): number;
    setTargetAngle(angle: number): void;
    requesetAngleAnimation(): void;
    cancelAngleAnimation(): void;
    getExternalData(): any;
}
export declare class Planet implements IPlanet {
    needRemove: boolean;
    protected $group: selectionGenerics;
    protected angle: number;
    protected x: number;
    protected y: number;
    protected _targetAngle: number;
    protected _angleAnimation: boolean;
    protected _angleAnimationEnd: boolean;
    protected _externalData: any;
    protected _events: IPlanetCallback;
    constructor(data?: any, events?: IPlanetCallback);
    propertyToBeClone(): {
        $group: Selection<BaseType, any, BaseType, any>;
        _targetAngle: number;
        angle: number;
    };
    create(parent: selectionGenerics, filter: string, requestGradient: (baseColor: string, id: string) => string, orbit: IOrbit): void;
    updatePosition(r: number, center: number[]): void;
    remove(): void;
    getAngle(): number;
    setAngle(angle: any): void;
    getTargetAngle(): number;
    setTargetAngle(angle: number): void;
    requesetAngleAnimation(): void;
    cancelAngleAnimation(): void;
    getExternalData(): any;
}
