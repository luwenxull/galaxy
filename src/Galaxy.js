import Quadtree from 'best-candidate'
import { select } from 'd3-selection'
import { randomUniform } from 'd3-random'
const randomStep = randomUniform(0.01, 0.02)
import Star from './Star'
class Galaxy {
  constructor() {
    this.$stars = {
      dom: null,
      group: null,
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
    this.$planets = {
      dom: null,
      data: null,
    }
  }

  render(container, data) {
    container.textContent = ''
    this.initContainer(container)
  }

  initContainer(container) {
    let { width, height } = container.getBoundingClientRect()
    this.initStarsContainer(container, width, height)
    // this.initPlanetsContainer(container, width, height)
    this.drawStars(width, height, 200)
  }

  update() {

  }

  initStarsContainer(container, width, height) {
    this.$stars.dom = select(container)
      .append('div')
      .classed('galaxy-starts', true)
      .call(selection => {
        for (let key of Object.keys(this.$stars.style)) {
          selection.style(key, this.$stars.style[key])
        }
      })
    this.$stars.group =
      this.$stars.dom
        .append('svg').attr('width', '100%').attr('height', '100%').append('g')
  }

  initPlanetsContainer(container, width, height) {
    this.$planets.dom = select(container)
      .append('div')
      .classed('galaxy-planets', true)
    this.$planets.dom.append('svg').attr('width', width).attr('height', height)
  }

  drawStars(width, height, count) {
    let r = Math.sqrt(width * width + height * height)
    let offsetX = width - r
    let offsetY = height - r
    this.$stars.group.attr('transform', `translate(${offsetX / 2}, ${offsetY / 2})`)
    let quadtree = new Quadtree(r, r, 10)
    quadtree.add(200, 1)
    let stars = quadtree.getCandidates().map(candidate => new Star(candidate, 5))
    for (let star of stars) {
      star.twinkle(this.$stars.group.node(), 'gray', 'red', randomStep())
    }
  }
}

export default new Galaxy()