import { isNullOrUndefined } from './tool';
export class Planet {
  constructor() {
    if (new.target.name === 'Planet') {
      throw new Error('Do not call new Planet() directly!');
    }
    this.$group = null;
    this.angle = null;
    this._targetAngle = null;
    this._angleAnimation = false;
    this._angleAnimationEnd = true;
  }
  create(parent, filter, requestGradient) { }
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
}
