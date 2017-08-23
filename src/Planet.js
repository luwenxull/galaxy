import {select} from 'd3-selection'
import {angleToRadian} from './tool'
export class Planet {
  constructor(orbit, size, angle, speed, color) {
    this.orbit = orbit
    this.size = size
    this.angle = angle
    this.speed = speed
    this.color = color
    this.animationFrame = null
    this.$link = null
  }

  create(parent) {
    this.$link =
      select(parent)
        .append('circle')
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
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.size)
      .attr('fill', this.color)
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
