import { Selection } from '../node_modules/@types/d3-selection/index'
import { isNullOrUndefined } from './tool'
type selectionGenerics = Selection<SVGElement, any, SVGElement, any>

export interface IPlanet {
  create(parent: selectionGenerics, filter: string, requestGradient: (id: string) => string): void
  updatePosition(angle: number, x: number, y: number): void
  remove(): void
  getAngle(): number
  setAngle(angle: number): void
}

export class Planet implements IPlanet {
  protected $group: selectionGenerics
  protected angle: number
  constructor() {
    if (new.target.name === 'Planet') {
      throw new Error('Do not call new Planet() directly!')
    }
    this.$group = null
  }

  public create(parent: selectionGenerics, filter: string, requestGradient: (id: string) => string) {}

  public updatePosition(angle: number, x: number, y: number) {
    this.setAngle(angle)
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
