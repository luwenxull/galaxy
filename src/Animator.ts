import { BaseType, Selection } from 'd3-selection'
import { transition } from 'd3-transition' // eslint-disable-line no-unused-vars
import { IOrbit } from './Orbit'
import { IPlanetCircle } from './PlanetCircle'

type selectionGenerics = Selection<BaseType, any, BaseType, any>

transition(null)

export let planetSizeAnimator = {
  execute(planet: IPlanetCircle, node: selectionGenerics, time: number) {
    node
      .transition('size')
      .duration(time)
      .attrTween('r', () => {
        const size = planet.getSize()
        const targetSize = planet.getTargetSize()
        return t => {
          const resultSize = (targetSize - size) * t + size
          planet.setSize(resultSize)
          return resultSize + ''
        }
      })
  },
}

export let planetAngleAnimator = {
  execute(planet: IPlanetCircle, node: selectionGenerics, time: number) {
    node
      .transition('angle')
      .duration(time)
      .attrTween('data-angle', () => {
        const angle = planet.getAngle()
        console.log(angle)
        return t => {
          const targetAngle = planet.getTargetAngle()
          console.log(targetAngle)
          const resultAngle = (targetAngle - angle) * t + angle
          planet.setAngle(resultAngle)
          return resultAngle + ''
        }
      })
      .on('end', () => {
        planet.cancelAngleAnimation()
      })
  },
}

export let orbitAnimator = {
  execute(orbitInstance: IOrbit, node: selectionGenerics, duration: number, endCallback) {
    node
      .transition('orbit-transition')
      .duration(duration)
      // .ease(easeLinear)
      .attrTween('r', () => {
        const radius = orbitInstance.getRadius()
        const targetRadius = orbitInstance.getTargetRadius()
        return (t) => {
          const resultRadius = (targetRadius - radius) * t + radius
          orbitInstance.setRadius(resultRadius)
          return resultRadius + ''
        }
      })
      .on('end', endCallback)
  },
}
