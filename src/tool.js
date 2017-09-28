import { randomUniform } from 'd3-random'
export function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null
}

export function angleToRadian(angle) {
  return angle / 180 * Math.PI
}

export function radianToAngle(radian) {
  return radian / Math.PI * 180
}

export function getAngle(r1, r2) {
  return radianToAngle(Math.asin(r1 / 2 / r2) * 4)
}

export function dynamicDistributeOrbit(orbits, width, height) {
  let maxRadius = Math.min(width, height) / 2
  let length = orbits.length
  let radiusUnit = maxRadius / (length + 1)
  for (let i = 0; i < length; i++) {
    let orbit = orbits[i]
    orbit.setRadius((i + 1) * radiusUnit)
  }
  return orbits
}

export function dynamicDistributeAngle(planets, radius) {
  let lastPlanet = null
  let randomAngle = randomUniform(0, 360)
  for (let planet of planets) {
    if (isNullOrUndefined(planet.angle)) {
      if (isNullOrUndefined(lastPlanet)) {
        planet.setAngle(randomAngle())
      } else {
        let increase = getAngle(planet.size, radius)
        let startAngle = lastPlanet.getAngle()
        planet.setAngle(increase + startAngle + 10)
      }
    }
    lastPlanet = planet
  }
}