import Quadtree from 'best-candidate'
import { select } from 'd3-selection'
import { randomUniform } from 'd3-random'
import { gaussianBlur } from './Filter'
import Star from './Star'
const randomStep = randomUniform(0.01, 0.02)
class Galaxy {
  constructor() {
    this.$stars = {
      container: null,
      svg: null,
      rootGroup: null,
      filter: null,
      data: null,
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
    }
    this.$orbits = {
      container: null,
      group: null,
      data: null,
      style: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
    }
  }

  render(container, orbits) {
    container.textContent = ''
    this.$orbits.data = orbits
    let { width, height } = container.getBoundingClientRect()
    this.initStarsContainer(container, width, height)
    this.initOrbitsContainer(container, width, height)
    this.drawStars(width, height, 200)
    this.drawOrbits()
  }

  update() {

  }

  initStarsContainer(container, width, height) {
    this.$stars.container = select(container)
      .append('div')
      .classed('galaxy-starts', true)
      .call(selection => {
        for (let key of Object.keys(this.$stars.style)) {
          selection.style(key, this.$stars.style[key])
        }
      })
    this.$stars.svg = this.$stars.container
      .append('svg').attr('width', '100%').attr('height', '100%')

    this.$stars.filter = this.$stars.svg.append('defs').append('filter').attr('id', 'gaussian-blur')
    this.$stars.rootGroup = this.$stars.svg.append('g')
    gaussianBlur(this.$stars.filter, void 0, 'blur', 1)
  }

  initOrbitsContainer(container, width, height) {
    this.$orbits.container = select(container)
      .append('div')
      .classed('galaxy-planets', true)
      .call(selection => {
        for (let key of Object.keys(this.$orbits.style)) {
          selection.style(key, this.$orbits.style[key])
        }
      })
    this.$orbits.svg = this.$orbits.container.append('svg').attr('width', '100%').attr('height', '100%')
    this.$orbits.rootGroup =
      this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
  }

  drawStars(width, height, count) {
    let r = Math.sqrt(width * width + height * height)
    let offsetX = width - r
    let offsetY = height - r
    this.$stars.rootGroup.attr('transform', `translate(${offsetX / 2}, ${offsetY / 2})`)
    let quadtree = new Quadtree(r, r, 10)
    quadtree.add(200, 1)
    let stars = quadtree.getCandidates().map(candidate => new Star(candidate, 3))
    for (let star of stars) {
      star.twinkle(this.$stars.rootGroup.node(), 'gray', '#03A9F4', randomStep())
    }
  }

  drawOrbits() {
    for (let orbit of this.$orbits.data) {
      orbit.reset()
      orbit.run(this.$orbits.rootGroup, false)
    }
  }
}

export default new Galaxy()