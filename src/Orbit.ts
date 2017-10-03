import { randomUniform } from 'd3-random'
import { BaseType, Selection } from 'd3-selection'
import { orbitAnimator } from './Animator'
import { IPlanet } from './Planet'
import { IPlanetCircle, PlanetCircle } from './PlanetCircle'
import {
  getAngle,
  getPlanetPosition,
  isNullOrUndefined,
} from './tool'

type selectionGenerics = Selection<BaseType, any, BaseType, any>

function someNew(planets: IPlanet[]): boolean {
  for (let i = 0; i < planets.length; i++) {
    if (isNullOrUndefined(planets[i].getTargetAngle())) {
      return true
    }
  }
  return false
}

function dynamicDistributeAngle(planets: IPlanet[], radius: number, lastLength: number): void {
  let startAngle: number = null
  const randomAngle = randomUniform(0, 360)
  const len = planets.length
  const angleUnit = 360 / len
  const ifSomeNew = someNew(planets)
  if (lastLength !== len || someNew(planets)) {
    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i]
      if (i === 0) {
        if (!isNullOrUndefined(planet.getAngle())) {
          startAngle = planet.getTargetAngle()
        } else {
          startAngle = randomAngle()
        }
      }
      const positionIndex = len === 1 ? i : (i + 1)
      planet.setTargetAngle(startAngle + angleUnit * positionIndex)
      if (!isNullOrUndefined(planet.getAngle())) {
        planet.requesetAngleAnimation()
      }
    }
  }
}

/* function updatePositionOfPlanet(planet: IPlanet, radius: number, center: number[]) {
  const angle = planet.getAngle()
  planet.setAngle(angle + Orbit)
  const [x, y] = getPlanetPosition(radius, angleToRadian(angle), center)
  planet.updatePosition(angle, x, y)
} */

export interface IOrbit {
  radius: number
  center: number[]
  speed: number
  angle: number
  planets: IPlanet[]
  addPlanet(planet: IPlanet): void
  run(place: selectionGenerics, config?: object): void
  remove(): void
  removePlanet(planet: IPlanet): void
  getRadius(): number
  setRadius(radius: number): void
  getTargetRadius(): number
  setTargetRadius(radius: number): void
}

export class Orbit implements IOrbit {
  public radius: number
  public center: number[]
  public speed: number
  public angle: number
  public planets: IPlanet[]
  private animationFrame: any
  private reservedAngle: number[]
  private $group: selectionGenerics
  private $orbitSelf: selectionGenerics
  private _needInit: boolean
  private _forceUpdate: boolean
  private _targetRadius: number
  private _removed: boolean
  private _lastLength: number
  constructor(speed: number, center = [0, 0]) {
    this.radius = null
    this.center = center
    this.speed = speed
    this.angle = 0
    this.planets = []
    this.animationFrame = null
    this.reservedAngle = []
    this.$group = null
    this.$orbitSelf = null
    this._needInit = true
    this._forceUpdate = false
    this._targetRadius = null
    this._removed = false
    this._lastLength = null
  }

  public addPlanet(planet: IPlanet) {
    this.planets.push(planet)
  }

  public run(place, {
    renderOrbit = false,
    orbitColor = '#fff',
    planetFilter = null,
    requestGradient = null,
  }
    = {}) {
    dynamicDistributeAngle(this.planets, this.radius, this._lastLength)
    this._lastLength = this.planets.length
    if (this._needInit) {
      this.$group = place.append('g').attr('data-name', 'orbit-group')
      this._needInit = false
    }
    this.drawOrbit(renderOrbit, orbitColor)
    for (const planet of this.planets) {
      planet.create(this.$group, planetFilter, requestGradient)
      // updatePositionOfPlanet(planet, this.getRadius(), this.center)
    }
    const run = () => {
      // this.update()
      for (const planet of this.planets) {
        planet.setTargetAngle(this.speed + planet.getTargetAngle())
        planet.updatePosition(this.radius, this.center)
      }
      this.animationFrame = requestAnimationFrame(run)
    }
    !isNullOrUndefined(this.animationFrame) && cancelAnimationFrame(this.animationFrame)
    this.animationFrame = requestAnimationFrame(run)
  }

  public reset() {
    this._needInit = true
    this.$group = null
    this.animationFrame !== null && cancelAnimationFrame(this.animationFrame)
  }

  public remove() {
    if (!isNullOrUndefined(this.$group)) {
      this.$group.remove()
    }
    if (!isNullOrUndefined(this.animationFrame)) {
      cancelAnimationFrame(this.animationFrame)
    }
    this._removed = true
  }

  public removePlanet(planetNeedRemove: IPlanet) {
    for (let i = 0; i < this.planets.length; i += 1) {
      if (planetNeedRemove === this.planets[i]) {
        planetNeedRemove.remove()
        this.planets.splice(i, 1)
      }
    }
  }

  public setRadius(radius: number): void {
    this.radius = radius
  }

  public getRadius(): number {
    if (isNullOrUndefined(this.radius)) {
      this.radius = this._targetRadius
    }
    return this.radius
  }

  public setTargetRadius(lastRadius: number): void {
    this._targetRadius = lastRadius
  }

  public getTargetRadius(): number {
    return this._targetRadius
  }

  private drawOrbit(renderOrbit: boolean, orbitColor: string) {
    if (!isNullOrUndefined(this.$orbitSelf)) {
      this._forceUpdate = true
      orbitAnimator.execute(this, this.$orbitSelf, 1000, () => {
        // When the transition subsequently starts,
        // it interrupts the active transition of the same name on the same element
        this._forceUpdate = false
      })
    } else {
      this.$orbitSelf = this.$group.append('circle')
        .attr('r', this.getRadius())
        .attr('fill', 'none')
        .attr('stroke', orbitColor)
        .attr('stroke-width', 1)
        .style('display', () => {
          return renderOrbit ? 'initial' : 'none'
        })
    }
  }
}
