import { interpolateRgb } from 'd3-interpolate'
import { select } from 'd3-selection'
import { BaseType, Selection } from 'd3-selection'
import { isNullOrUndefined } from './tool'
type selectionGenerics = Selection<BaseType, any, BaseType, any>
export interface IStar {
  center: number[]
  radius: number
  twinkle(place: BaseType, start: string, stop: string, step?: number, filterID?: string): void
}

interface ITwinkleController {
  progress: number
  current: number
  step: number
}

export class Star implements IStar {
  public center: number[]
  public radius: number
  protected $group: selectionGenerics
  private twinkleController: ITwinkleController
  private colorInitial: string
  private colorBrighter: string
  private colorInterpolator: (t: number) => string
  constructor(center: number[], radius: number) {
    this.center = center
    this.radius = radius
    this.twinkleController = {
      current: 0,
      progress: 0,
      step: 0,
    }
    this.$group = null
  }

  public twinkle(
    place: BaseType,
    start: string,
    stop: string,
    step: number = 0.005,
    filterID: string = null,
  ): void {
    this.colorInitial = start
    this.colorBrighter = stop
    this.colorInterpolator =
      interpolateRgb(this.colorInitial, this.colorBrighter)
    this.twinkleController.step = step
    if (isNullOrUndefined(this.$group)) {
      this.create(place, filterID)
    }
    if (this.twinkleController.step) {
      const twinkle = () => {
        this.processTwinkle()
        this.$group
          .attr(
            'fill',
            this.colorInterpolator(this.twinkleController.current),
          )
          .attr('r', this.radius * this.twinkleController.current)
        requestAnimationFrame(twinkle)
      }
      requestAnimationFrame(twinkle)
    }
  }

  private create(place: BaseType, filterID: string): void {
    this.$group = select(place)
      .append('circle')
      .attr('cx', this.center[0])
      .attr('cy', this.center[1])
      .attr('r', this.radius)
      .attr('fill', this.colorInitial)
    filterID && this.$group.attr('filter', `url(#${filterID})`)
  }

  private processTwinkle(): void {
    switch (this.twinkleController.progress) {
    case 0: {
      this.twinkleController.current += this.twinkleController.step
      if (this.twinkleController.current > 1) {
        this.twinkleController.current = 1
        this.twinkleController.progress = 1
      }
      break
    }
    case 1: {
      this.twinkleController.current -= this.twinkleController.step
      if (this.twinkleController.current < 0) {
        this.twinkleController.current = 0
        this.twinkleController.progress = 0
      }
      break
    }
    default:
      break
    }
  }
}
