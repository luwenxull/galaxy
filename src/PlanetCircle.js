import { select } from 'd3-selection'
import { angleToRadian } from './tool'
import Planet from './Planet'

export default class PlanetCircle extends Planet {
  constructor({ angle, color, size }) {
    super()
    this.angle = angle
    this.color = color
    this.size = size
    this.$group = null
  }

  create(parent) {
    this.$group = parent.append('g').attr('data-name', 'planet-group')

    this.$group
      .append('circle')
      .attr('fill', this.color)
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
