import { planetAngleAnimator, planetSizeAnimator } from './Animator';
import { Planet } from './Planet';
import { angleToRadian, getPlanetPosition, isNullOrUndefined } from './tool';
export class PlanetCircle extends Planet {
  constructor({ color = '#fff', size = 0, gradient = null } = {}) {
    super();
    this.color = color;
    this.gradient = gradient;
    this.size = 0;
    this._targetSize = size;
    this._sizeAnimationEnd = true;
    this._sizeAnimationCallback = null;
  }
  propertyToBeClone() {
    return Object.assign({
      $circle: this.$circle,
      size: this.size,
    }, super.propertyToBeClone());
  }
  create(parent, filter, requestGradient) {
    this.requestGradient = requestGradient;
    if (isNullOrUndefined(this.$group)) {
      this.$group = parent.append('g').attr('data-name', 'planet-group');
      if (filter) {
        this.$group.attr('filter', filter);
      }
      this.$circle = this.$group
        .append('circle')
        .on('mousemove', () => {
          // this.stop()
        })
        .on('mouseleave', () => {
          // this.run()
        });
    }
  }
  updatePosition(r, center) {
    if (this._angleAnimation) {
      planetAngleAnimator.execute(this, this.$group, 1000);
      this._angleAnimation = false;
      this._angleAnimationEnd = false;
    } else if (this._angleAnimationEnd) {
      this.angle = this._targetAngle;
    }
    if (this.size !== this._targetSize && this._sizeAnimationEnd) {
      this._sizeAnimationEnd = false;
      planetSizeAnimator.execute(this, this.$circle, 1000, () => {
        this._sizeAnimationEnd = true;
        this._sizeAnimationCallback && this._sizeAnimationCallback();
      });
    }
    const [x, y] = getPlanetPosition(r, angleToRadian(this.angle), center);
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.size)
      .attr('fill', () => {
        return this.requestGradient ? this.requestGradient(this.color, this.gradient) : this.color;
      });
  }
  getSize() {
    return this.size;
  }
  setSize(size) {
    this.size = size;
  }
  getTargetSize() {
    return this._targetSize;
  }
  setTargetSize(size) {
    this._targetSize = size;
  }
}
