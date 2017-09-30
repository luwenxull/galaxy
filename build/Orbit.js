"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_random_1 = require("d3-random");
const tool_1 = require("./tool");
const Animator_1 = require("./Animator");
function dynamicDistributeAngle(planets, radius) {
    let lastPlanet = null;
    let randomAngle = d3_random_1.randomUniform(0, 360);
    for (let planet of planets) {
        if (tool_1.isNullOrUndefined(planet.angle)) {
            if (tool_1.isNullOrUndefined(lastPlanet)) {
                planet.setAngle(randomAngle());
            }
            else {
                let increase = tool_1.getAngle(planet.getTargetSize(), radius);
                let startAngle = lastPlanet.getAngle();
                console.log(increase);
                planet.setAngle(increase + startAngle + 10);
            }
        }
        lastPlanet = planet;
    }
}
function updatePositionOfPlanet(planet, radius, center) {
    let angle = planet.getAngle();
    let [x, y] = tool_1.getPlanetPosition(radius, tool_1.angleToRadian(angle), center);
    planet.updatePosition(angle, x, y);
}
class Orbit {
    constructor(speed, center = [0, 0]) {
        this.radius = null;
        this.center = center;
        this.speed = speed;
        this.planets = [];
        this.animationFrame = null;
        this.$group = null;
        this.$orbitSelf = null;
        this._needInit = true;
        this._forceUpdate = false;
        this._targetRadius = null;
        this.removed = false;
        this.angle = 0;
    }
    addPlanet(planet) {
        this.planets.push(planet);
    }
    run(place, { renderOrbit, orbitColor = '#fff', planetFilter, requestGradient } = {}) {
        dynamicDistributeAngle(this.planets, this.radius);
        if (this._needInit) {
            this.$group = place.append('g').attr('data-name', 'orbit-group');
            this._needInit = false;
        }
        this.drawOrbit(renderOrbit, orbitColor);
        for (let planet of this.planets) {
            planet.create(this.$group, planetFilter, requestGradient);
            updatePositionOfPlanet(planet, this.getRadius(), this.center);
        }
        let run = () => {
            this.update();
            this.animationFrame = requestAnimationFrame(run);
        };
        !tool_1.isNullOrUndefined(this.animationFrame) && cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(run);
    }
    drawOrbit(renderOrbit, orbitColor) {
        if (!tool_1.isNullOrUndefined(this.$orbitSelf)) {
            this._forceUpdate = true;
            Animator_1.orbitAnimator.execute(this, this.$orbitSelf, 1000, () => {
                // When the transition subsequently starts,
                // it interrupts the active transition of the same name on the same element
                this._forceUpdate = false;
            });
        }
        else {
            this.$orbitSelf = this.$group.append('circle')
                .attr('r', this.getRadius())
                .attr('fill', 'none')
                .attr('stroke', orbitColor)
                .attr('stroke-width', 1)
                .style('display', () => {
                return renderOrbit ? 'initial' : 'none';
            });
        }
    }
    update() {
        if (this._forceUpdate) {
            for (let planet of this.planets) {
                updatePositionOfPlanet(planet, this.getRadius(), this.center);
            }
        }
        this.angle += this.speed;
        this.$group.style('transform', `rotate(${this.angle}deg)`);
    }
    reset() {
        this._needInit = true;
        this.$group = null;
        this.animationFrame !== null && cancelAnimationFrame(this.animationFrame);
    }
    remove() {
        if (this.$group) {
            this.$group.remove();
        }
        if (!tool_1.isNullOrUndefined(this.animationFrame)) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.removed = true;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    getRadius() {
        if (tool_1.isNullOrUndefined(this.radius)) {
            this.radius = this._targetRadius;
        }
        return this.radius;
    }
    setTargetRadius(lastRadius) {
        this._targetRadius = lastRadius;
    }
    getTargetRadius() {
        return this._targetRadius;
    }
}
exports.default = Orbit;
//# sourceMappingURL=Orbit.js.map