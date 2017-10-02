import { BaseType, Selection } from 'd3-selection'
import { isNullOrUndefined } from './tool'
type selectionGenerics = Selection<BaseType, any, BaseType, any>

export interface IPlanet {
  create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string): void
  updatePosition(angle: number, x: number, y: number): void
  remove(): void
  getAngle(): number
  setAngle(angle: number): void
}

export class Planet implements IPlanet {
  protected $group: selectionGenerics
  protected angle: number
  protected x: number
  protected y: number
  constructor() {
    if (new.target.name === 'Planet') {
      throw new Error('Do not call new Planet() directly!')
    }
    this.$group = null
    this.angle = null
    this.x = null
    this.y = null
  }

  public create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string) {}

  public updatePosition(angle: number, x: number, y: number) {
    this.angle = angle
    this.x = x
    this.y = y
  }

  public remove() {
    if (!isNullOrUndefined(this.$group)) {
      this.$group.remove()
    }
  }

  public getAngle() {
    return this.angle
  }

  public setAngle(angle) {
    this.angle = angle
  }
}
