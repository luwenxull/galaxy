"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_transition_1 = require("d3-transition"); // eslint-disable-line no-unused-vars
d3_transition_1.transition(null);
exports.planetSizeAnimator = {
    execute(planet, node, time) {
        node
            .transition('size')
            .duration(time)
            .attrTween('r', () => {
            const size = planet.getSize();
            const targetSize = planet.getTargetSize();
            return t => {
                const resultSize = (targetSize - size) * t + size;
                planet.setSize(resultSize);
                return resultSize + '';
            };
        });
    },
};
exports.planetAngleAnimator = {
    execute(planet, node, time) {
        node
            .transition('angle')
            .duration(time)
            .attrTween('data-angle', () => {
            const angle = planet.getAngle();
            console.log(angle);
            return t => {
                const targetAngle = planet.getTargetAngle();
                console.log(targetAngle);
                const resultAngle = (targetAngle - angle) * t + angle;
                planet.setAngle(resultAngle);
                return resultAngle + '';
            };
        })
            .on('end', () => {
            planet.cancelAngleAnimation();
        });
    },
};
exports.orbitAnimator = {
    execute(orbitInstance, node, duration, endCallback) {
        node
            .transition('orbit-transition')
            .duration(duration)
            .attrTween('r', () => {
            const radius = orbitInstance.getRadius();
            const targetRadius = orbitInstance.getTargetRadius();
            return (t) => {
                const resultRadius = (targetRadius - radius) * t + radius;
                orbitInstance.setRadius(resultRadius);
                return resultRadius + '';
            };
        })
            .on('end', endCallback);
    },
};
//# sourceMappingURL=Animator.js.map