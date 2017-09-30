"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { easeLinear } from 'd3-ease'
exports.planetAnimator = {
    execute(planet, node, time) {
        node
            .transition('smaller')
            .duration(time)
            .attrTween('r', () => {
            let size = planet.getSize();
            let targetSize = planet.getTargetSize();
            return t => {
                let resultSize = (targetSize - size) * t + size;
                planet.setSize(resultSize);
                return resultSize;
            };
        });
    },
};
exports.orbitAnimator = {
    execute(orbitInstance, node, duration, endCallback) {
        node
            .transition('orbit-transition')
            .duration(duration)
            .attrTween('r', () => {
            let radius = orbitInstance.getRadius();
            let targetRadius = orbitInstance.getTargetRadius();
            return (t) => {
                let resultRadius = (targetRadius - radius) * t + radius;
                orbitInstance.setRadius(resultRadius);
                return resultRadius;
            };
        })
            .on('end', endCallback);
    },
};
//# sourceMappingURL=Animator.js.map