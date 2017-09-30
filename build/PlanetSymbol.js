"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const tool_1 = require("./tool");
const Planet_1 = require("./Planet");
class PlanetSymbol extends Planet_1.default {
    constructor({ orbit, angle, speed, color, size, useID }) {
        super();
        this.orbit = orbit;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
        this.useID = useID;
        this.size = size;
        this.positionRevise = null;
        this.animationFrame = null;
        this.$group = null;
    }
    create(parent) {
        this.$group =
            d3_selection_1.select(parent)
                .append('g');
        let use = this.$group
            .append('use')
            .attr('xlink:href', this.useID);
        use
            .attr('width', this.size)
            .attr('height', this.size)
            .attr('x', 0)
            .attr('y', 0)
            .on('mousemove', () => {
            this.stop();
        })
            .on('mouseleave', () => {
            this.run();
        });
        let { width, height } = use.node().getBoundingClientRect();
        this.positionRevise = [width / 2, height / 2];
    }
    update() {
        this.angle += this.speed;
        let [x, y] = this.orbit.getPlanetPosition(tool_1.angleToRadian(this.angle));
        this.$group
            .attr('fill', this.color)
            .attr('transform', `translate(
          ${x - this.positionRevise[0]},
          ${y - this.positionRevise[1]})`);
    }
    renderOrbit(...arg) {
        this.orbit.render(...arg);
    }
}
exports.default = PlanetSymbol;
//# sourceMappingURL=PlanetSymbol.js.map