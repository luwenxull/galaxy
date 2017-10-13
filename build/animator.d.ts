import { BaseType, Selection } from 'd3-selection';
import { IOrbit } from './orbit';
import { IPlanetCircle } from './planetCircle';
export declare const planetSizeAnimator: {
    execute(planet: IPlanetCircle, node: Selection<BaseType, any, BaseType, any>, time: number, endCallback?: any): void;
};
export declare const planetAngleAnimator: {
    execute(planet: IPlanetCircle, node: Selection<BaseType, any, BaseType, any>, time: number): void;
};
export declare const orbitAnimator: {
    execute(orbitInstance: IOrbit, node: Selection<BaseType, any, BaseType, any>, duration: number, endCallback: any): void;
};
