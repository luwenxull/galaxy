export function angleToRadian(angle) {
  return angle / 180 * Math.PI
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