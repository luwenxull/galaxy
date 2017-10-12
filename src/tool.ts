import { BaseType, Selection } from 'd3-selection'
export type selectionGenerics = Selection<BaseType, any, BaseType, any>
export interface IStringIndexed {
  [prop: string]: any
}
export interface IStringIndexedFn {
  [prop: string]: (...arg) => any
}

export function isNullOrUndefined(value): boolean {
  return typeof value === 'undefined' || value === null
}

export function angleToRadian(angle: number): number {
  return angle / 180 * Math.PI
}

export function radianToAngle(radian: number): number {
  return radian / Math.PI * 180
}

export function getAngle(r1: number, r2: number): number {
  return radianToAngle(Math.asin(r1 / 2 / r2) * 4)
}

export function getPlanetPosition(radius: number, radian: number, center: number[]) {
  const x = radius * Math.cos(radian)
  const y = radius * Math.sin(radian)
  return [center[0] + x, center[1] + y]
}

export function isArray<T>(val: T): boolean {
  return val instanceof Array
}

export function toArray(val: any): any[] {
  return [].concat(val)
}

export function iterateObj<T extends IStringIndexed>(
  obj: T, callback: (val: any, key: keyof T) => void,
): IStringIndexed {
  const keys = Object.keys(obj)
  for (const key of keys) {
    callback(obj[key], key)
  }
  return obj
}

export function bindEvents(
  selection: selectionGenerics, events: IStringIndexedFn, externalArgs: any[],
): void {
  iterateObj(events, (callback, key) => {
    selection.on(key, () => {
      callback(...externalArgs)
    })
  })
}
