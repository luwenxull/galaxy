import { planetAnimator } from './Animator'
import { IPlanet, Planet } from './Planet'
import { isNullOrUndefined } from './tool'

export interface IPlanetCircle extends IPlanet {
  getSize(): number
  setSize(size: number): void
  getTargetSize(): number
  setTargetSize(size: number): void
}

export class PlanetCircle extends Planet implements IPlanetCircle {
  private color: string
  private size: number
  private gradient?: string
  private _targetSize: number
  constructor({ color = '#fff', size = 0, gradient = null} = {}) {
    super()
    this.color = color
    this.gradient = gradient
    this.size = 0
    this._targetSize = size
  }

  public create(parent, filter, requestGradient) {
    if (isNullOrUndefined(this.$group)) {
      this.$group = parent.append('g').attr('data-name', 'planet-group')
      if (filter) {
        this.$group.attr('filter', filter)
      }
      planetAnimator.execute(this, this.$group
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

  public updatePosition(angle, x, y) {
    super.updatePosition(angle, x, y)
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.getSize())
  }

  public getSize() {
    return this.size
  }

  public setSize(size) {
    this.size = size
  }

  public getTargetSize() {
    return this._targetSize
  }

  public setTargetSize(size) {
    this._targetSize = size
  }
}
