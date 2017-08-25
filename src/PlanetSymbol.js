import {select} from 'd3-selection'
import {angleToRadian} from './tool'
import {Planet} from './Planet'

export class PlanetSymbol extends Planet {
  constructor(orbit, angle, speed, color, size, useID) {
    super()
    this.orbit = orbit
    this.angle = angle
    this.speed = speed
    this.color = color
    this.useID = useID
    this.size = size
    this.positionRevise = null
    this.animationFrame = null
    this.$link = null
  }

  create(parent) {
    this.$link =
      select(parent)
        .append('g')

    let use = this.$link
      .append('use')
      .attr('xlink:href', this.useID)

    use
      .attr('width', this.size)
      .attr('height', this.size)
      .attr('x', 0)
      .attr('y', 0)
      .on('mousemove', () => {
        this.stop()
      })
      .on('mouseleave', () => {
        this.run()
      })

    let {width, height} = use.node().getBoundingClientRect()
    this.positionRevise = [width / 2, height / 2]
  }

  update() {
    this.angle += this.speed
    let [x, y] = this.orbit.getPlanetPosition(angleToRadian(this.angle))
    this.$link
      .attr('fill', this.color)
      .attr('transform',
        `translate(
          ${x - this.positionRevise[0]},
          ${y - this.positionRevise[1]})`
      )
  }

  renderOrbit(...arg) {
    this.orbit.render(...arg)
  }
}
