"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNullOrUndefined(value) {
    return typeof value === 'undefined' || value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function angleToRadian(angle) {
    return angle / 180 * Math.PI;
}
exports.angleToRadian = angleToRadian;
function radianToAngle(radian) {
    return radian / Math.PI * 180;
}
exports.radianToAngle = radianToAngle;
function getAngle(r1, r2) {
    return radianToAngle(Math.asin(r1 / 2 / r2) * 4);
}
exports.getAngle = getAngle;
function getPlanetPosition(radius, radian, center) {
    let x = radius * Math.cos(radian);
    let y = radius * Math.sin(radian);
    return [center[0] + x, center[1] + y];
}
exports.getPlanetPosition = getPlanetPosition;
//# sourceMappingURL=tool.js.map