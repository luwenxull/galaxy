import {
  angleToRadian,
  dynamicDistributeAngle,
  isNullOrUndefined,
} from './tool'
export default class Orbit {
  constructor(speed, center = [0, 0]) {
    this.radius = null
    this.center = center
    this.speed = speed
    this.planets = []
    this.animationFrame = null
    this.$group = null
    this._needInit = true
    this.angle = 0
  }

  getPlanetPosition(radian) {
    let x = this.radius * Math.cos(radian)
    let y = this.radius * Math.sin(radian)
    return [this.center[0] + x, this.center[1] + y]
  }

  addPlanet(planet) {
    this.planets.push(planet)
  }

  run(place, { renderOrbit, orbitColor = '#fff', planetFilter, requestGradient }
    = {}) {
    dynamicDistributeAngle(this.planets, this.radius)
    if (this._needInit) {
      this.init(place)
    }
    if (renderOrbit) {
      this.renderSelf(orbitColor)
    }
    this.renderPlanets(planetFilter, requestGradient)
    let run = () => {
      this.update()
      this.animationFrame = requestAnimationFrame(run)
    }
    this.animationFrame = requestAnimationFrame(run)
  }

  renderSelf(orbitColor) {
    this.$group.append('circle')
      .attr('r', this.radius)
      .attr('fill', 'none')
      .attr('stroke', orbitColor)
      .attr('stroke-width', 1)
  }

  renderPlanets(planetFilter, requestGradient) {
    for (let planet of this.planets) {
      planet.create(this.$group, planetFilter, requestGradient)
      let angle = planet.getAngle()
      planet.update(angle, ...this.getPlanetPosition(angleToRadian(angle)))
    }
  }

  init(parent) {
    this.$group = parent.append('g').attr('data-name', 'orbit-group')
    this._needInit = false
  }

  update() {
    /* for (let planet of this.planets) {
      let angle = planet.getAngle() + this.speed
      let [x, y] = this.getPlanetPosition(angleToRadian(angle))
      planet.update(angle, x, y)
    } */
    this.angle += 0.1
    this.$group.style('transform', `rotate(${this.angle}deg)`)
  }

  reset() {
    this._needInit = true
    this.$group = null
    this.animationFrame !== null && cancelAnimationFrame(this.animationFrame)
  }

  setRadius(radius) {
    this.radius = radius
  }

  remove() {
    if (this.$group) {
      this.$group.remove()
    }
    if (!isNullOrUndefined(this.animationFrame)) {
      cancelAnimationFrame(this.animationFrame)
    }
  }
}