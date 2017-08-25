import {select} from 'd3-selection'
import {angleToRadian} from './tool'
import {Planet} from './Planet'

export class PlanetCircle {
  constructor(orbit, scale, angle, speed, color) {
    this.orbit = orbit
    this.scale = scale
    this.size = scale / initialSize.scale * initialSize.size
    this.angle = angle
    this.speed = speed
    this.color = color
    this.animationFrame = null
    this.$link = null
  }

  create(parent) {
    this.$link =
      select(parent)
        .append('g')

    this.$link
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .on('mousemove', () => {
        this.stop()
      })
      .on('mouseleave', () => {
        this.run()
      })
  }

  update() {
    this.angle += this.speed
    let [x, y] = this.orbit.getPlanetPosition(angleToRadian(this.angle))
    this.$link
      .attr('fill', this.color)
      .attr('transform', `translate(${x - }, ${y})`)
      /* .attr('transform',
        `translate(
          ${x - 93.38 * this.size / 0.1 / 2},
          ${y - 53.02 * this.size / 0.1 / 2})`
      ) */
  }

  renderOrbit(...arg) {
    this.orbit.render(...arg)
  }

  run(place) {
    let run = () => {
      this.update()
      this.animationFrame = requestAnimationFrame(run)
    }
    if (!this.$link) {
      this.create(place)
    }
    this.animationFrame = requestAnimationFrame(run)
  }

  stop() {
    cancelAnimationFrame(this.animationFrame)
  }
}
