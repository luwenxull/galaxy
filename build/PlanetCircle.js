import { RectNode } from 'color-text';
import { planetAngleAnimator, planetSizeAnimator } from './animator';
import { Planet } from './planet';
import { angleToRadian, bindEvents, getPlanetPosition, isNullOrUndefined } from './tool';
export class PlanetCircle extends Planet {
  constructor({ color = '#fff', size = 0, gradient = null } = {}, externalData = {}, events = {}) {
    super(externalData, events);
    this.color = color;
    this.gradient = gradient;
    this.size = 0;
    this._targetSize = size;
    this._sizeAnimationEnd = true;
    this._sizeAnimationCallback = null;
    this.hinter = null;
  }
  propertyToBeClone() {
    return Object.assign({
      $circle: this.$circle,
      hinter: this.hinter,
      size: this.size,
    }, super.propertyToBeClone());
  }
  create(parent, filter, requestGradient, orbit) {
    this.requestGradient = requestGradient;
    if (isNullOrUndefined(this.$group)) {
      this.$group = parent.append('g').attr('data-name', 'planet-group');
      if (filter) {
        this.$group.attr('filter', filter);
      }
      this.$circle = this.$group
        .append('circle');
      bindEvents(this.$circle, this._events, [this, orbit]);
      this.hinter = new RectNode();
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
    this.x = x;
    this.y = y;
    this.$group
      .select('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', this.size)
      .attr('fill', () => {
        return this.requestGradient ? this.requestGradient(this.color, this.gradient) : this.color;
      });
    if (this.hinter) {
      this.hinter.show(this.$group.node(), {
        corner: [x, y],
        text: this._externalData,
      }, {
        bg: {
          fill: '#eee',
          rx: 5,
          ry: 5,
        },
      });
      // console.log(receNode)
      const rect = this.hinter.getPaintRect();
      this.hinter.move(0, -rect.height);
    }
  }
  remove() {
    this.hinter && this.hinter.close();
    super.remove();
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
  putOnCap() {
    // this.hinter.show('good', [this.x, this.y])
  }
  takeOffCap() {
    this.hinter.close();
  }
}
