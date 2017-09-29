import { transition } from 'd3-transition' // eslint-disable-line no-unused-vars
// import { easeLinear } from 'd3-ease'

export let planetAnimator = {
  execute(planet, node, time) {
    node
      .transition('smaller')
      .duration(time)
      .attrTween('r', () => {
        let size = planet.getSize()
        let targetSize = planet.getTargetSize()
        return t => {
          let resultSize = (targetSize - size) * t + size
          planet.setSize(resultSize)
          return resultSize
        }
      })
  },
}

export let orbitAnimator = {
  execute(orbitInstance, node, duration, endCallback) {
    node
      .transition('orbit-transition')
      .duration(duration)
      // .ease(easeLinear)
      .attrTween('r', () => {
        let radius = orbitInstance.getRadius()
        let targetRadius = orbitInstance.getTargetRadius()
        return (t) => {
          let resultRadius = (targetRadius - radius) * t + radius
          orbitInstance.setRadius(resultRadius)
          return resultRadius
        }
      })
      .on('end', endCallback)
  },
}