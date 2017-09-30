"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const d3_interpolate_1 = require("d3-interpolate");
class Star {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
        this.twinkleController = {
            progress: 0,
            current: 0,
            step: 0,
        };
        this.$group = null;
    }
    create(place, filterID) {
        this.$group = d3_selection_1.select(place)
            .append('circle')
            .attr('cx', this.center[0])
            .attr('cy', this.center[1])
            .attr('r', this.radius)
            .attr('fill', this.colorInitial);
        filterID && this.$group.attr('filter', `url(#${filterID})`);
    }
    processTwinkle() {
        switch (this.twinkleController.progress) {
            case 0: {
                this.twinkleController.current += this.twinkleController.step;
                if (this.twinkleController.current > 1) {
                    this.twinkleController.current = 1;
                    this.twinkleController.progress = 1;
                }
                break;
            }
            case 1: {
                this.twinkleController.current -= this.twinkleController.step;
                if (this.twinkleController.current < 0) {
                    this.twinkleController.current = 0;
                    this.twinkleController.progress = 0;
                }
                break;
            }
            default:
                break;
        }
    }
    configColor(start, stop, step) {
        this.colorInitial = start;
        this.colorBrighter = stop;
        this.colorInterpolator =
            d3_interpolate_1.interpolateRgb(this.colorInitial, this.colorBrighter);
        this.twinkleController.step = step;
    }
    twinkle(place, start, stop, step = 0.005, filterID = '') {
        this.configColor(start, stop, step);
        if (!this.$group) {
            this.create(place, filterID);
        }
        if (this.twinkleController.step) {
            let twinkle = () => {
                this.processTwinkle();
                this.$group
                    .attr('fill', this.colorInterpolator(this.twinkleController.current))
                    .attr('r', this.radius * this.twinkleController.current);
                requestAnimationFrame(twinkle);
            };
            requestAnimationFrame(twinkle);
        }
    }
}
exports.default = Star;
//# sourceMappingURL=Star.js.map