import { select } from 'd3-selection'
import { interpolateRgb } from 'd3-interpolate'
export default class Star {
  constructor(center, radius) {
    this.center = center
    this.radius = radius
    this.twinkleController = {
      progress: 0,
      current: 0,
      step: 0,
    }
    this.$link = null
  }

  create(place) {
    this.$link = select(place)
      .append('circle')
      .attr('cx', this.center[0])
      .attr('cy', this.center[1])
      .attr('r', this.radius)
      .attr('fill', this.colorInitial)
  }

  processTwinkle() {
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

  configColor(start, stop, step) {
    this.colorInitial = start
    this.colorBrighter = stop
    this.colorInterpolator =
      interpolateRgb(this.colorInitial, this.colorBrighter)
    this.twinkleController.step = step
  }

  twinkle(place, start, stop, step = 0.005) {
    this.configColor(start, stop, step)
    if (!this.$link) {
      this.create(place)
    }
    if (this.twinkleController.step) {
      let twinkle = () => {
        this.processTwinkle()
        this.$link
          .attr(
            'fill',
            this.colorInterpolator(this.twinkleController.current)
          )
          .attr('r', this.radius * this.twinkleController.current)
        requestAnimationFrame(twinkle)
      }
      requestAnimationFrame(twinkle)
    }
  }
}