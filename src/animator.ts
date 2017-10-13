import { BaseType, Selection } from 'd3-selection'
import { transition } from 'd3-transition'
import { IOrbit } from './orbit'
import { IPlanetCircle } from './planetCircle'
import { selectionGenerics } from './tool'
transition(null)

export const planetSizeAnimator = {
  execute(planet: IPlanetCircle, node: selectionGenerics, time: number, endCallback?) {
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
      .on('end', () => {
        endCallback && endCallback()
      })
  },
}

export const planetAngleAnimator = {
  execute(planet: IPlanetCircle, node: selectionGenerics, time: number) {
    node
      .transition('angle')
      .duration(time)
      .attrTween('data-angle', () => {
        const angle = planet.getAngle()
        return t => {
          const targetAngle = planet.getTargetAngle()
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

export const orbitAnimator = {
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
