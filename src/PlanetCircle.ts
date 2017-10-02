import { BaseType, Selection } from 'd3-selection'
import { planetAnimator } from './Animator'
import { IPlanet, Planet } from './Planet'
import { isNullOrUndefined } from './tool'

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
  private gradient?: string
  private _targetSize: number
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

  public updatePosition(angle: number, x: number, y: number): void {
    super.updatePosition(angle, x, y)
    this.$group
      .select('circle')
      .attr('cx', this.x)
      .attr('cy', this.y)
      .attr('r', this.size)
  }

  public remove() {
    this._targetSize = 0
    planetAnimator.execute(this, this.$group.select('circle'), 1000)
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
