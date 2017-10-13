import { BaseType, Selection } from 'd3-selection';
import { IPlanet } from './planet';
import { selectionGenerics } from './tool';
export interface IOrbit {
    radius: number;
    center: number[];
    speed: number;
    angle: number;
    planets: IPlanet[];
    pause(): void;
    resume(): void;
    propertyToBeClone(): object;
    addPlanet(planet: IPlanet): void;
    run(place: selectionGenerics, config?: object): void;
    remove(removeGroup?: boolean): void;
    getRadius(): number;
    setRadius(radius: number): void;
    getTargetRadius(): number;
    setTargetRadius(radius: number): void;
}
export declare class Orbit implements IOrbit {
    radius: number;
    center: number[];
    speed: number;
    angle: number;
    planets: IPlanet[];
    private animationFrame;
    private $group;
    private $orbitSelf;
    private _needInit;
    private _targetRadius;
    private _lastLength;
    private _paused;
    constructor(speed: number, center?: number[]);
    pause(): void;
    resume(): void;
    propertyToBeClone(): {
        $group: Selection<BaseType, any, BaseType, any>;
        $orbitSelf: Selection<BaseType, any, BaseType, any>;
        _needInit: boolean;
        radius: number;
        speed: number;
    };
    addPlanet(planet: IPlanet): void;
    run(place: any, {renderOrbit, orbitColor, planetFilter, requestGradient}?: {
        renderOrbit?: boolean;
        orbitColor?: string;
        planetFilter?: any;
        requestGradient?: any;
    }): void;
    remove(hard?: boolean): void;
    setRadius(radius: number): void;
    getRadius(): number;
    setTargetRadius(lastRadius: number): void;
    getTargetRadius(): number;
    private drawOrbit(renderOrbit, orbitColor);
}
