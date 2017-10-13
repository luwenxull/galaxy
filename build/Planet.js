import { isNullOrUndefined } from './tool';
export class Planet {
  constructor(data = {}, events = {}) {
    /* if (new.target.name === 'Planet') {
          throw new Error('Do not call new Planet() directly!')
        } */
    this.$group = null;
    this.angle = null;
    this.x = null;
    this.y = null;
    this._targetAngle = null;
    this._angleAnimation = false;
    this._angleAnimationEnd = true;
    this._externalData = data;
    this._events = events;
  }
  propertyToBeClone() {
    return {
      $group: this.$group,
      _targetAngle: this._targetAngle,
      angle: this.angle,
    };
  }
  create(parent, filter, requestGradient, orbit) { }
  updatePosition(r, center) { }
  remove() {
    if (!isNullOrUndefined(this.$group)) {
      this.$group.remove();
    }
  }
  getAngle() {
    return this.angle;
  }
  setAngle(angle) {
    this.angle = angle;
  }
  getTargetAngle() {
    return this._targetAngle;
  }
  setTargetAngle(angle) {
    this._targetAngle = angle;
  }
  requesetAngleAnimation() {
    this._angleAnimation = true;
  }
  cancelAngleAnimation() {
    this._angleAnimationEnd = true;
  }
  getExternalData() {
    return this._externalData;
  }
}
