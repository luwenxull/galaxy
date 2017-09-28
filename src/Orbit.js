import { angleToRadian } from './tool'
export default class Orbit {
  constructor(speed, center = [0, 0]) {
    this.radius = null
    this.center = center
    this.speed = speed
    this.planets = []
    this.animationFrame = null
    this.$group = null
    this._needInit = true
  }

  getPlanetPosition(radian) {
    let x = this.radius * Math.cos(radian)
    let y = this.radius * Math.sin(radian)
    return [this.center[0] + x, this.center[1] + y]
  }

  addPlanet(planet) {
    this.planets.push(planet)
  }

  run(place, renderSelf = false) {
    if (this._needInit) {
      this.init(place)
    }
    if (renderSelf) {
      this.renderSelf(place)
    }
    let run = () => {
      this.update()
      this.animationFrame = requestAnimationFrame(run)
    }
    this.animationFrame = requestAnimationFrame(run)
  }

  renderSelf() {
    this.$group.append('circle')
      .attr('r', this.radius)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1)
  }

  init(parent) {
    this.$group = parent.append('g').attr('data-name', 'orbit- group')
    for (let planet of this.planets) {
      planet.create(this.$group)
    }
    this._needInit = false
  }

  update() {
    for (let planet of this.planets) {
      let angle = planet.getAngle() + this.speed
      let [x, y] = this.getPlanetPosition(angleToRadian(angle))
      planet.update(angle, x, y)
    }
  }

  reset() {
    this._needInit = true
    this.$group = null
    this.animationFrame !== null && cancelAnimationFrame(this.animationFrame)
  }

  setRadius(radius) {
    this.radius = radius
  }
}