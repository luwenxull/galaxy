import { BaseType, Selection } from 'd3-selection'
import {
  planetAngleAnimator,
  planetSizeAnimator,
} from './Animator'
import { IPlanet, Planet } from './Planet'
import {
  angleToRadian,
  getPlanetPosition,
  isNullOrUndefined,
} from './tool'

type selectionGenerics = Selection<BaseType, any, BaseType, any>

export interface IPlanetCircle extends IPlanet {
  getSize(): number
  setSize(size: number): void
  getTargetSize(): number
  setTargetSize(size: number): void
}

export class PlanetCircle extends Planet implements IPlanetCircle {
  private color: string
  private size: number
  private _targetSize: number
  private gradient?: string
  constructor({ color = '#fff', size = 0, gradient = null} = {}) {
    super()
    this.color = color
    this.gradient = gradient
    this.size = 0
    this._targetSize = size
  }

  public create(
    parent: selectionGenerics,
    filter: string,
    requestGradient: (baseColor: string, id: string) => string) {
    if (isNullOrUndefined(this.$group)) {
      this.$group = parent.append('g').attr('data-name', 'planet-group')
      if (filter) {
        this.$group.attr('filter', filter)
      }
      planetSizeAnimator.execute(this, this.$group
        .append('circle')
        .attr('fill', () => {
          return requestGradient ? requestGradient(this.color, this.gradient) : this.color
        })
        .on('mousemove', () => {
          // this.stop()
        })
        .on('mouseleave', () => {
          // this.run()
        }), 1000)
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
    const [x, y] = getPlanetPosition(r, angleToRadian(this.angle), center)
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.size)
  }

  public remove() {
    this._targetSize = 0
    planetSizeAnimator.execute(this, this.$group.select('circle'), 1000)
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
