import { randomUniform } from 'd3-random'
import { orbitAnimator } from './Animator'
import { IPlanet } from './Planet'
import { IPlanetCircle, PlanetCircle } from './PlanetCircle'
import {
  getAngle,
  getPlanetPosition,
  isNullOrUndefined,
  selectionGenerics,
} from './tool'

function someNew(planets: IPlanet[]): boolean {
  for (let i = 0; i < planets.length; i++) {
    if (isNullOrUndefined(planets[i].getTargetAngle())) {
      return true
    }
  }
  return false
}

function dynamicDistributeAngle(
  planets: IPlanet[], radius: number, lastLength: number,
): void {
  let startAngle: number = null
  const randomAngle = randomUniform(0, 360)
  const len = planets.length
  const angleUnit = 360 / len
  if (lastLength !== len || someNew(planets)) {
    for (let i = 0; i < len; i++) {
      const planet = planets[i]
      if (i === 0) {
        if (!isNullOrUndefined(planet.getAngle())) {
          startAngle = planet.getTargetAngle()
        } else {
          startAngle = randomAngle()
        }
      }
      // const positionIndex = len === 1 ? i : (i + 1)
      planet.setTargetAngle(startAngle + angleUnit * i)
      if (!isNullOrUndefined(planet.getAngle())) {
        planet.requesetAngleAnimation()
      }
    }
  }
}

export interface IOrbit {
  radius: number
  center: number[]
  speed: number
  angle: number
  planets: IPlanet[]
  propertyToBeClone(): object
  addPlanet(planet: IPlanet): void
  run(place: selectionGenerics, config?: object): void
  remove(): void
  reset(): void
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
  private $group: selectionGenerics
  private $orbitSelf: selectionGenerics
  private _needInit: boolean
  private _targetRadius: number
  private _lastLength: number
  constructor(speed: number, center = [0, 0]) {
    this.radius = null
    this.center = center
    this.speed = speed
    this.angle = 0
    this.planets = []
    this.animationFrame = null
    this.$group = null
    this.$orbitSelf = null
    this._needInit = true
    this._targetRadius = null
    this._lastLength = null
  }

  public propertyToBeClone() {
    return {
      $group: this.$group,
      $orbitSelf: this.$orbitSelf,
      _needInit: this._needInit,
      radius: this.radius,
      speed: this.speed,
    }
  }

  public addPlanet(planet: IPlanet) {
    this.planets.push(planet)
  }

  public run(
    place,
    {
      renderOrbit = false,
      orbitColor = '#fff',
      planetFilter = null,
      requestGradient = null,
    } = {},
  ) {
    const max = Math.floor(360 / getAngle(20, this._targetRadius))
    this.planets = this.planets.slice(0, max)
    dynamicDistributeAngle(this.planets, this._targetRadius, this._lastLength)
    this._lastLength = this.planets.length
    if (this._needInit) {
      this.$group = place.append('g').attr('data-name', 'orbit-group')
      this._needInit = false
    }
    this.drawOrbit(renderOrbit, orbitColor)
    for (const planet of this.planets) {
      planet.create(this.$group, planetFilter, requestGradient)
    }
    const run = () => {
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
    this.$group = null
    !isNullOrUndefined(this.animationFrame) && cancelAnimationFrame(this.animationFrame)
  }

  public remove() {
    if (!isNullOrUndefined(this.$group)) {
      this.$group.remove()
    }
    if (!isNullOrUndefined(this.animationFrame)) {
      cancelAnimationFrame(this.animationFrame)
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
      orbitAnimator.execute(this, this.$orbitSelf, 1000, () => {
        // When the transition subsequently starts,
        // it interrupts the active transition of the same name on the same element
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
