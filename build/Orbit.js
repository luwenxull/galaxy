"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_random_1 = require("d3-random");
const Animator_1 = require("./Animator");
const tool_1 = require("./tool");
function someNew(planets) {
    for (let i = 0; i < planets.length; i++) {
        if (tool_1.isNullOrUndefined(planets[i].getTargetAngle())) {
            return true;
        }
    }
    return false;
}
function dynamicDistributeAngle(planets, radius, lastLength) {
    let startAngle = null;
    const randomAngle = d3_random_1.randomUniform(0, 360);
    const len = planets.length;
    const angleUnit = 360 / len;
    const ifSomeNew = someNew(planets);
    if (lastLength !== len || someNew(planets)) {
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];
            if (i === 0) {
                if (!tool_1.isNullOrUndefined(planet.getAngle())) {
                    startAngle = planet.getTargetAngle();
                }
                else {
                    startAngle = randomAngle();
                }
            }
            const positionIndex = len === 1 ? i : (i + 1);
            planet.setTargetAngle(startAngle + angleUnit * positionIndex);
            if (!tool_1.isNullOrUndefined(planet.getAngle())) {
                planet.requesetAngleAnimation();
            }
        }
    }
}
class Orbit {
    constructor(speed, center = [0, 0]) {
        this.radius = null;
        this.center = center;
        this.speed = speed;
        this.angle = 0;
        this.planets = [];
        this.animationFrame = null;
        this.reservedAngle = [];
        this.$group = null;
        this.$orbitSelf = null;
        this._needInit = true;
        this._forceUpdate = false;
        this._targetRadius = null;
        this._removed = false;
        this._lastLength = null;
    }
    addPlanet(planet) {
        this.planets.push(planet);
    }
    run(place, { renderOrbit = false, orbitColor = '#fff', planetFilter = null, requestGradient = null, } = {}) {
        dynamicDistributeAngle(this.planets, this.radius, this._lastLength);
        this._lastLength = this.planets.length;
        if (this._needInit) {
            this.$group = place.append('g').attr('data-name', 'orbit-group');
            this._needInit = false;
        }
        this.drawOrbit(renderOrbit, orbitColor);
        for (const planet of this.planets) {
            planet.create(this.$group, planetFilter, requestGradient);
            // updatePositionOfPlanet(planet, this.getRadius(), this.center)
        }
        const run = () => {
            // this.update()
            for (const planet of this.planets) {
                planet.setTargetAngle(this.speed + planet.getTargetAngle());
                planet.updatePosition(this.radius, this.center);
            }
            this.animationFrame = requestAnimationFrame(run);
        };
        !tool_1.isNullOrUndefined(this.animationFrame) && cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(run);
    }
    reset() {
        this._needInit = true;
        this.$group = null;
        this.animationFrame !== null && cancelAnimationFrame(this.animationFrame);
    }
    remove() {
        if (!tool_1.isNullOrUndefined(this.$group)) {
            this.$group.remove();
        }
        if (!tool_1.isNullOrUndefined(this.animationFrame)) {
            cancelAnimationFrame(this.animationFrame);
        }
        this._removed = true;
    }
    removePlanet(planetNeedRemove) {
        for (let i = 0; i < this.planets.length; i += 1) {
            if (planetNeedRemove === this.planets[i]) {
                planetNeedRemove.remove();
                this.planets.splice(i, 1);
            }
        }
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
}
exports.Orbit = Orbit;
//# sourceMappingURL=Orbit.js.map