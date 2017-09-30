"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_candidate_1 = require("best-candidate");
const d3_selection_1 = require("d3-selection");
const d3_random_1 = require("d3-random");
const Filter_1 = require("./Filter");
const Gradient_1 = require("./Gradient");
const Star_1 = require("./Star");
const randomStep = d3_random_1.randomUniform(0.01, 0.02);
const defaultProp = {
    container: null,
    svg: null,
    defs: null,
    root: null,
    filters: null,
    data: null,
};
const gradientMap = new Map();
function dynamicDistributeOrbit(orbits, width, height) {
    let maxRadius = Math.min(width, height) / 2;
    // orbits = orbits.filter(orbit => !orbit.removed)
    let length = orbits.length;
    let radiusUnit = maxRadius / (length + 1);
    for (let i = 0; i < length; i++) {
        let orbit = orbits[i];
        let targetRadius = (i + 1) * radiusUnit;
        orbit.setTargetRadius(targetRadius);
    }
    return orbits;
}
class Galaxy {
    constructor() {
        this.$stars = Object.assign({
            style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            },
        }, defaultProp);
        this.$orbits = Object.assign({
            style: {
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            },
        }, defaultProp);
        this.instanceOrbits = null;
        this.$container = null;
        this.requestGradient = this.requestGradient.bind(this);
    }
    render(container, orbits) {
        this.$container = container;
        container.textContent = '';
        let { width, height } = container.getBoundingClientRect();
        this.initStarsDom(container, width, height);
        this.initOrbitsDom(container, width, height);
        this.drawStars(width, height, 200);
        this.drawOrbits(dynamicDistributeOrbit(orbits, width, height));
    }
    update(orbits, callback) {
        let { width, height } = this.$container.getBoundingClientRect();
        this.drawOrbits(dynamicDistributeOrbit(orbits, width, height));
        callback && callback(this.instanceOrbits);
    }
    initStarsDom(container, width, height) {
        this.$stars.container = d3_selection_1.select(container)
            .append('div')
            .classed('galaxy-stars', true)
            .call(selection => {
            for (let key of Object.keys(this.$stars.style)) {
                selection.style(key, this.$stars.style[key]);
            }
        });
        this.$stars.svg = this.$stars.container
            .append('svg').attr('width', '100%').attr('height', '100%');
        this.$stars.defs = this.$stars.svg.append('defs');
        this.$stars.rootGroup = this.$stars.svg.append('g');
        Filter_1.merge(Filter_1.gaussianBlur(this.$stars.defs.append('filter'), void 0, 'blur', 3).attr('id', 'star-gaussian-blur'), ['blur', 'SourceGraphic']);
    }
    initOrbitsDom(container, width, height) {
        this.$orbits.container = d3_selection_1.select(container)
            .append('div')
            .classed('galaxy-planets', true)
            .call(selection => {
            for (let key of Object.keys(this.$orbits.style)) {
                selection.style(key, this.$orbits.style[key]);
            }
        });
        this.$orbits.svg = this.$orbits.container.append('svg').attr('width', '100%').attr('height', '100%');
        this.$orbits.defs = this.$orbits.svg.append('defs');
        this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
        Filter_1.merge(Filter_1.gaussianBlur(this.$orbits.defs.append('filter'), void 0, 'blur', 3).attr('id', 'planet-gaussian-blur'), ['blur', 'SourceGraphic']);
    }
    drawStars(width, height, count) {
        let r = Math.sqrt(width * width + height * height);
        let offsetX = width - r;
        let offsetY = height - r;
        this.$stars.rootGroup.attr('transform', `translate(${offsetX / 2}, ${offsetY / 2})`);
        let quadtree = new best_candidate_1.default(r, r, 10);
        quadtree.add(500, 1);
        let stars = quadtree.getCandidates().map(candidate => new Star_1.default(candidate, 3));
        for (let star of stars) {
            star.twinkle(this.$stars.rootGroup.node(), 'gray', '#03A9F4', randomStep());
        }
    }
    resetOrbitsGroup(width, height) {
        for (let orbit of this.instanceOrbits) {
            orbit.remove();
        }
        this.$orbits.rootGroup.remove();
        this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    }
    requestGradient(baseColor, id) {
        if (gradientMap.has(id)) {
            return 'url(#' + id + ')';
        }
        else {
            Gradient_1.stereoscopicStop(this.$orbits.defs.append('radialGradient'), baseColor).attr('id', id);
            gradientMap.set(id, true);
            return 'url(#' + id + ')';
        }
    }
    drawOrbits(orbits) {
        this.instanceOrbits = orbits;
        for (let orbit of orbits) {
            // orbit.reset()
            orbit.run(this.$orbits.rootGroup, {
                renderOrbit: true,
                orbitColor: '#123456',
                planetFilter: 'url(#planet-gaussian-blur)',
                requestGradient: this.requestGradient,
            });
        }
    }
}
exports.default = new Galaxy();
//# sourceMappingURL=Galaxy.js.map