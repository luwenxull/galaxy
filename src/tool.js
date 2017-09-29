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

export function getPlanetPosition(radius, radian, center) {
  let x = radius * Math.cos(radian)
  let y = radius * Math.sin(radian)
  return [center[0] + x, center[1] + y]
}
