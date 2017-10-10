import {
  planetAngleAnimator,
  planetSizeAnimator,
} from './Animator'
import { IPlanet, Planet } from './Planet'
import {
  angleToRadian,
  getPlanetPosition,
  isNullOrUndefined,
  selectionGenerics,
} from './tool'

export interface IPlanetCircle extends IPlanet {
  getSize(): number
  setSize(size: number): void
  getTargetSize(): number
  setTargetSize(size: number): void
}

export class PlanetCircle extends Planet implements IPlanetCircle {
  private color: string
  private _targetColor: string
  private size: number
  private _targetSize: number
  private gradient?: string
  private $circle: selectionGenerics
  private requestGradient: (baseColor: string, id: string) => string
  private _sizeAnimationEnd: boolean
  private _sizeAnimationCallback: () => void
  constructor({ color = '#fff', size = 0, gradient = null} = {}) {
    super()
    this.color = color
    this.gradient = gradient
    this.size = 0
    this._targetSize = size
    this._sizeAnimationEnd = true
    this._sizeAnimationCallback = null
  }

  public create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string,
  ) {
    this.requestGradient = requestGradient
    if (isNullOrUndefined(this.$group)) {
      this.$group = parent.append('g').attr('data-name', 'planet-group')
      if (filter) {
        this.$group.attr('filter', filter)
      }
      this.$circle = this.$group
        .append('circle')
        .on('mousemove', () => {
          // this.stop()
        })
        .on('mouseleave', () => {
          // this.run()
        })
    }
  }

  public updatePosition(r: number, center: number[]): void {
    if (this._angleAnimation) {
      planetAngleAnimator.execute(this, this.$group, 1000)
      this._angleAnimation = false
      this._angleAnimationEnd = false
    } else if (this._angleAnimationEnd) {
      this.angle = this._targetAngle
    }
    if (this.size !== this._targetSize && this._sizeAnimationEnd) {
      this._sizeAnimationEnd = false
      planetSizeAnimator.execute(this, this.$circle, 1000, () => {
        this._sizeAnimationEnd = true
        this._sizeAnimationCallback && this._sizeAnimationCallback()
      })
    }
    const [x, y] = getPlanetPosition(r, angleToRadian(this.angle), center)
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.size)
      .attr('fill', () => {
        return this.requestGradient ? this.requestGradient(this.color, this.gradient) : this.color
      })
  }

  public getSize(): number {
    return this.size
  }

  public setSize(size: number) {
    this.size = size
  }

  public getTargetSize(): number {
    return this._targetSize
  }

  public setTargetSize(size: number) {
    this._targetSize = size
  }
}
