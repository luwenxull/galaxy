import Planet from './Planet'
import { isNullOrUndefined } from './tool'
import { planetAnimator } from './Animator'
export default class PlanetCircle extends Planet {
  constructor({ color, gradient, size, animator }) {
    super()
    this.gradient = gradient
    this.color = color
    this.size = 0
    this._targetSize = size
    this.animator = animator
    this.angle = null
    this.$group = null
  }

  create(parent, filter, requestGradient) {
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
        }), 1000
      )
    }
  }

  updatePosition(angle, x, y) {
    this.setAngle(angle)
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.getSize())
  }

  remove() {
    this.$group && this.$group.remove()
  }

  getAngle() {
    return this.angle
  }

  setAngle(angle) {
    this.angle = angle
  }

  getSize() {
    return this.size
  }

  setSize(size) {
    this.size = size
  }

  getTargetSize() {
    return this._targetSize
  }

  setTargetSize(size) {
    this._targetSize = size
  }
}
