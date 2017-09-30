"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animator_1 = require("./Animator");
const Planet_1 = require("./Planet");
const tool_1 = require("./tool");
class PlanetCircle extends Planet_1.Planet {
    constructor({ color = '#fff', size = 0, gradient = null } = {}) {
        super();
        this.color = color;
        this.gradient = gradient;
        this.size = 0;
        this._targetSize = size;
    }
    create(parent, filter, requestGradient) {
        if (tool_1.isNullOrUndefined(this.$group)) {
            this.$group = parent.append('g').attr('data-name', 'planet-group');
            if (filter) {
                this.$group.attr('filter', filter);
            }
            Animator_1.planetAnimator.execute(this, this.$group
                .append('circle')
                .attr('fill', () => {
                return requestGradient ? requestGradient(this.color, this.gradient) : this.color;
            })
                .on('mousemove', () => {
                // this.stop()
            })
                .on('mouseleave', () => {
                // this.run()
            }), 1000);
        }
    }
    updatePosition(angle, x, y) {
        super.updatePosition(angle, x, y);
        this.$group
            .select('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', this.getSize());
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
exports.PlanetCircle = PlanetCircle;
//# sourceMappingURL=PlanetCircle.js.map