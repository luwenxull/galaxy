import { selectionGenerics } from './tool';
export declare function gaussianBlur(filter: selectionGenerics, input: string, output: string, deviation?: number): selectionGenerics;
export declare function colorMatrix(filter: selectionGenerics, input: string, output: string, values: string): selectionGenerics;
export declare function offset(filter: selectionGenerics, input: string, output: string, dx?: number, dy?: number): selectionGenerics;
export declare function merge(filter: selectionGenerics, merges: string[]): selectionGenerics;
