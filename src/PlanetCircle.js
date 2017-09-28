import Planet from './Planet'
export default class PlanetCircle extends Planet {
  constructor({ color, gradient, size }) {
    super()
    this.gradient = gradient
    this.color = color
    this.size = size
    this.angle = null
    this.$group = null
  }

  create(parent, filter, requestGradient) {
    this.$group = parent.append('g').attr('data-name', 'planet-group')
    if (filter) {
      this.$group.attr('filter', filter)
    }
    this.$group
      .append('circle')
      .attr('fill', () => {
        return requestGradient ? requestGradient(this.color, this.gradient) : this.color
      })
      .attr('r', this.size)
      .on('mousemove', () => {
        // this.stop()
      })
      .on('mouseleave', () => {
        // this.run()
      })
  }

  update(angle, x, y) {
    this.setAngle(angle)
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
  }

  getAngle() {
    return this.angle
  }

  setAngle(angle) {
    this.angle = angle
  }
}
