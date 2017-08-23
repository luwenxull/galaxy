import {select} from 'd3-selection'
export class Orbit {
  constructor(radius, center = [0, 0]) {
    this.center = center
    this.radius = radius
    this.$link = null
  }

  getPlanetPosition(radian) {
    let x = this.radius * Math.cos(radian)
    let y = this.radius * Math.sin(radian)
    return [this.center[0] + x, this.center[1] + y]
  }

  render(place) {
    this.$link = select(place)
      .append('circle')
      .attr('fill', 'none')
      .attr('stroke', '#ddd')
      .attr('r', this.radius)
  }
}