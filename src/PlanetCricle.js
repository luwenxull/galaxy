import {select} from 'd3-selection'
import {angleToRadian} from './tool'
import {Planet} from './Planet'

export class PlanetCircle extends Planet {
  constructor({orbit, angle, speed, color, size}) {
    super()
    this.orbit = orbit
    this.angle = angle
    this.speed = speed
    this.color = color
    this.size = size
    this.animationFrame = null
    this.$link = null
  }

  create(parent) {
    this.$link =
      select(parent)
        .append('g')

    this.$link
      .append('circle')
      .attr('fill', this.color)
      .attr('r', this.size)
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
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
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
