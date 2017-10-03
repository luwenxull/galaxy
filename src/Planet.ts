import { BaseType, Selection } from 'd3-selection'
import { isNullOrUndefined } from './tool'
type selectionGenerics = Selection<BaseType, any, BaseType, any>

export interface IPlanet {
  create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string): void
  updatePosition(radius: number, center: number[]): void
  remove(): void
  getAngle(): number
  setAngle(angle: number): void
  getTargetAngle(): number
  setTargetAngle(angle: number): void
  requesetAngleAnimation(): void
  cancelAngleAnimation(): void
}

export class Planet implements IPlanet {
  protected $group: selectionGenerics
  protected angle: number
  protected _targetAngle: number
  protected _angleAnimation: boolean
  protected _angleAnimationEnd: boolean
  constructor() {
    if (new.target.name === 'Planet') {
      throw new Error('Do not call new Planet() directly!')
    }
    this.$group = null
    this.angle = null
    this._targetAngle = null
    this._angleAnimation = false
    this._angleAnimationEnd = true
  }

  public create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string) {}

  public updatePosition(r: number, center: number[]) {}

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

  public getTargetAngle() {
    return this._targetAngle
  }

  public setTargetAngle(angle: number) {
    this._targetAngle = angle
  }

  public requesetAngleAnimation() {
    this._angleAnimation = true
  }

  public cancelAngleAnimation() {
    this._angleAnimationEnd = true
  }
}
