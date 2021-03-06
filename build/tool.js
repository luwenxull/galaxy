export function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null;
}
export function angleToRadian(angle) {
  return angle / 180 * Math.PI;
}
export function radianToAngle(radian) {
  return radian / Math.PI * 180;
}
export function getAngle(r1, r2) {
  return radianToAngle(Math.asin(r1 / 2 / r2) * 4);
}
export function getPlanetPosition(radius, radian, center) {
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  return [center[0] + x, center[1] + y];
}
export function isArray(val) {
  return val instanceof Array;
}
export function toArray(val) {
  return [].concat(val);
}
export function iterateObj(obj, callback) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    callback(obj[key], key);
  }
  return obj;
}
export function bindEvents(selection, events, externalArgs, type = 'USER-DEFINE') {
  iterateObj(events, (cb, key) => {
    selection.on(key + '.' + type, () => {
      cb(...externalArgs);
    });
  });
}
