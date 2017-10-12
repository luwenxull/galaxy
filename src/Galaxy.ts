import Quadtree from 'best-candidate'
import { randomUniform } from 'd3-random'
import { select } from 'd3-selection'
import { gaussianBlur, merge } from './Filter'
import { requestGradient } from './Gradient'
import { IOrbit } from './Orbit'
import { IPlanet } from './Planet'
import { IStar, Star } from './Star'
import { isNullOrUndefined, selectionGenerics } from './tool'

interface IDefaultProp {
  container: selectionGenerics
  data: any
  defs: selectionGenerics
  filters: selectionGenerics
  rootGroup: selectionGenerics
  svg: selectionGenerics
}

const randomStep = randomUniform(0.01, 0.02)
const defaultProp: IDefaultProp = {
  container: null,
  data: null,
  defs: null,
  filters: null,
  rootGroup: null,
  svg: null,
}
function dynamicDistributeOrbit(orbits: IOrbit[], width: number, height: number) {
  const maxRadius = Math.min(width, height) / 2
  // orbits = orbits.filter(orbit => !orbit.removed)
  const length = orbits.length
  const radiusUnit = maxRadius / (length + 1)
  for (let i = 0; i < length; i++) {
    const orbit = orbits[i]
    const targetRadius = (i + 1) * radiusUnit
    orbit.setTargetRadius(targetRadius)
  }
  return orbits
}

function takeFromCachePlanets(newPlanets: IPlanet[], cachePlanets: IPlanet[]) {
  const nl = newPlanets.length
  const cl = cachePlanets.length
  for (let i = 0; i < nl; i++) {
    if (!isNullOrUndefined(cachePlanets[i])) {
      Object.assign(newPlanets[i], cachePlanets[i].propertyToBeClone())
    }
  }
  if (nl < cl) {
    for (let j = nl; j < cl; j++) {
      cachePlanets[j].remove()
    }
  }
}

function takeFromCacheOrbits(newOrbits: IOrbit[], cacheOrbits: IOrbit[]) {
  const nl = newOrbits.length
  const cl = cacheOrbits.length
  for (let i = 0; i < nl; i++) {
    if (!isNullOrUndefined(cacheOrbits[i])) {
      Object.assign(newOrbits[i], cacheOrbits[i].propertyToBeClone())
      cacheOrbits[i].reset()
      takeFromCachePlanets(newOrbits[i].planets, cacheOrbits[i].planets)
    }
  }
  if (nl < cl) {
    for (let j = nl; j < cl; j++) {
      cacheOrbits[j].remove()
      cacheOrbits[j].reset()
    }
  }
}

export interface IGalaxy {
  $container: HTMLElement
  instanceOrbits: IOrbit[]
  render(container: HTMLElement, orbits: IOrbit[]): void
  update(orbits: IOrbit[], callback?: (orbits: IOrbit[]) => void): void
}

export class Galaxy implements IGalaxy {
  public $container: HTMLElement
  public instanceOrbits: IOrbit[]
  private $stars: IDefaultProp & {
    style: object,
  }
  private $orbits: IDefaultProp & {
    style: object,
  }
  private _cacheOrbits: IOrbit[]
  constructor() {
    this.$stars = Object.assign({
      style: {
        height: '100%',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
      },
    }, defaultProp)
    this.$orbits = Object.assign({
      style: {
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      },
    }, defaultProp)
    this.instanceOrbits = null
    this.$container = null
    this._cacheOrbits = null
  }

  public render(container: HTMLElement, orbits: IOrbit[]) {
    this.$container = container
    this._cacheOrbits = orbits
    container.textContent = ''
    const { width, height } = container.getBoundingClientRect()
    this.initStarsDom(container, width, height)
    this.initOrbitsDom(container, width, height)
    this.drawStars(width, height, 200)
    this.drawOrbits(dynamicDistributeOrbit(orbits, width, height))
  }

  public update(orbits: IOrbit[], callback?: (orbits: IOrbit[]) => void) {
    const { width, height } = this.$container.getBoundingClientRect()
    takeFromCacheOrbits(orbits, this._cacheOrbits)
    this._cacheOrbits = orbits
    this.drawOrbits(dynamicDistributeOrbit(orbits, width, height))
    callback && callback(this.instanceOrbits)
  }

  private initStarsDom(container: HTMLElement, width: number, height: number): void {
    this.$stars.container = select(container)
      .append('div')
      .classed('galaxy-stars', true)
      .call((selection) => {
        for (const key of Object.keys(this.$stars.style)) {
          selection.style(key, this.$stars.style[key])
        }
      })
    this.$stars.svg = this.$stars.container
      .append('svg').attr('width', '100%').attr('height', '100%')
    this.$stars.defs = this.$stars.svg.append('defs')
    this.$stars.rootGroup = this.$stars.svg.append('g')
    const filter = this.$stars.defs.append('filter').attr('id', 'star-gaussian-blur')
    merge(gaussianBlur(filter, undefined, 'blur', 3), ['blur', 'SourceGraphic'])
  }

  private initOrbitsDom(container: HTMLElement, width: number, height: number) {
    this.$orbits.container = select(container)
      .append('div')
      .classed('galaxy-planets', true)
      .call((selection) => {
        for (const key of Object.keys(this.$orbits.style)) {
          selection.style(key, this.$orbits.style[key])
        }
      })
    this.$orbits.svg = this.$orbits.container.append('svg').attr('width', '100%').attr('height', '100%')
    this.$orbits.defs = this.$orbits.svg.append('defs')
    this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
    const filter = this.$orbits.defs.append('filter').attr('id', 'planet-gaussian-blur')
    merge(gaussianBlur(filter, undefined, 'blur', 3), ['blur', 'SourceGraphic'])
  }

  private drawStars(width: number, height: number, count: number = 500) {
    const r = Math.sqrt(width * width + height * height)
    const offsetX = width - r
    const offsetY = height - r
    this.$stars.rootGroup.attr('transform', `translate(${offsetX / 2}, ${offsetY / 2})`)
    const quadtree = new Quadtree(r, r, 10)
    quadtree.add(count, 1)
    const stars: IStar[] = quadtree.getCandidates().map((candidate) => new Star(candidate, 3))
    for (const star of stars) {
      star.twinkle(this.$stars.rootGroup.node(), 'gray', '#03A9F4', randomStep())
    }
  }

  private resetOrbitsGroup(width: number, height: number) {
    for (const orbit of this.instanceOrbits) {
      orbit.remove()
    }
    this.$orbits.rootGroup.remove()
    this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
  }

  private drawOrbits(orbits: IOrbit[]) {
    this.instanceOrbits = orbits
    for (const orbit of orbits) {
      // orbit.reset()
      orbit.run(this.$orbits.rootGroup, {
        orbitColor: '#123456',
        planetFilter: 'url(#planet-gaussian-blur)',
        renderOrbit: true,
        requestGradient: requestGradient(this.$orbits.defs),
      })
    }
  }
}
