import { BaseType, Selection } from 'd3-selection';
import { selectionGenerics } from './tool';
export interface IStop {
    offset: string;
    color: string;
}
export declare function stop(gradient: selectionGenerics, stops: IStop[]): Selection<BaseType, any, BaseType, any>;
export declare function stereoscopicStop(gradient: selectionGenerics, colorStr: string): Selection<BaseType, any, BaseType, any>;
export declare function requestGradient(defs: selectionGenerics): (baseColor: string, id: string) => string;
