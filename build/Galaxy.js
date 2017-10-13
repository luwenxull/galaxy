import Quadtree from 'best-candidate';
import { randomUniform } from 'd3-random';
import { select } from 'd3-selection';
import { gaussianBlur, merge } from './filter';
import { requestGradient } from './gradient';
import { Star } from './star';
import { isNullOrUndefined } from './tool';
const randomStep = randomUniform(0.01, 0.02);
const defaultProp = {
  container: null,
  data: null,
  defs: null,
  filters: null,
  rootGroup: null,
  svg: null,
};
function dynamicDistributeOrbit(orbits, width, height) {
  const maxRadius = Math.min(width, height) / 2;
  // orbits = orbits.filter(orbit => !orbit.removed)
  const length = orbits.length;
  const radiusUnit = maxRadius / (length + 1);
  for (let i = 0; i < length; i++) {
    const orbit = orbits[i];
    const targetRadius = (i + 1) * radiusUnit;
    orbit.setTargetRadius(targetRadius);
  }
  return orbits;
}
function takeFromCachePlanets(newPlanets, cachePlanets) {
  const nl = newPlanets.length;
  const cl = cachePlanets.length;
  for (let i = 0; i < nl; i++) {
    if (!isNullOrUndefined(cachePlanets[i])) {
      Object.assign(newPlanets[i], cachePlanets[i].propertyToBeClone());
    }
  }
  if (nl < cl) {
    for (let j = nl; j < cl; j++) {
      cachePlanets[j].remove();
    }
  }
}
function takeFromCacheOrbits(newOrbits, cacheOrbits) {
  const nl = newOrbits.length;
  const cl = cacheOrbits.length;
  for (let i = 0; i < nl; i++) {
    if (!isNullOrUndefined(cacheOrbits[i])) {
      Object.assign(newOrbits[i], cacheOrbits[i].propertyToBeClone());
      cacheOrbits[i].remove();
      takeFromCachePlanets(newOrbits[i].planets, cacheOrbits[i].planets);
    }
  }
  if (nl < cl) {
    for (let j = nl; j < cl; j++) {
      cacheOrbits[j].remove(true);
    }
  }
}
export class Galaxy {
  constructor() {
    this.$stars = Object.assign({
      style: {
        height: '100%',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
      },
    }, defaultProp);
    this.$orbits = Object.assign({
      style: {
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      },
    }, defaultProp);
    this.instanceOrbits = null;
    this.$container = null;
    this._cacheOrbits = null;
  }
  render(container, orbits) {
    this.$container = container;
    this._cacheOrbits = orbits;
    container.textContent = '';
    const { width, height } = container.getBoundingClientRect();
    this.initStarsDom(container, width, height);
    this.initOrbitsDom(container, width, height);
    this.drawStars(width, height, 200);
    this.drawOrbits(dynamicDistributeOrbit(orbits, width, height));
  }
  update(orbits, callback) {
    const { width, height } = this.$container.getBoundingClientRect();
    takeFromCacheOrbits(orbits, this._cacheOrbits);
    this._cacheOrbits = orbits;
    this.drawOrbits(dynamicDistributeOrbit(orbits, width, height));
    callback && callback(this.instanceOrbits);
  }
  initStarsDom(container, width, height) {
    this.$stars.container = select(container)
      .append('div')
      .classed('galaxy-stars', true)
      .call((selection) => {
        for (const key of Object.keys(this.$stars.style)) {
          selection.style(key, this.$stars.style[key]);
        }
      });
    this.$stars.svg = this.$stars.container
      .append('svg').attr('width', '100%').attr('height', '100%');
    this.$stars.defs = this.$stars.svg.append('defs');
    this.$stars.rootGroup = this.$stars.svg.append('g');
    const filter = this.$stars.defs.append('filter').attr('id', 'star-gaussian-blur');
    merge(gaussianBlur(filter, undefined, 'blur', 3), ['blur', 'SourceGraphic']);
  }
  initOrbitsDom(container, width, height) {
    this.$orbits.container = select(container)
      .append('div')
      .classed('galaxy-planets', true)
      .call((selection) => {
        for (const key of Object.keys(this.$orbits.style)) {
          selection.style(key, this.$orbits.style[key]);
        }
      });
    this.$orbits.svg = this.$orbits.container.append('svg').attr('width', '100%').attr('height', '100%');
    this.$orbits.defs = this.$orbits.svg.append('defs');
    this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    const filter = this.$orbits.defs.append('filter').attr('id', 'planet-gaussian-blur');
    merge(gaussianBlur(filter, undefined, 'blur', 3), ['blur', 'SourceGraphic']);
  }
  drawStars(width, height, count = 500) {
    const r = Math.sqrt(width * width + height * height);
    const offsetX = width - r;
    const offsetY = height - r;
    this.$stars.rootGroup.attr('transform', `translate(${offsetX / 2}, ${offsetY / 2})`);
    const quadtree = new Quadtree(r, r, 10);
    quadtree.add(count, 1);
    const stars = quadtree.getCandidates().map((candidate) => new Star(candidate, 3));
    for (const star of stars) {
      star.twinkle(this.$stars.rootGroup.node(), 'gray', '#03A9F4', randomStep());
    }
  }
  resetOrbitsGroup(width, height) {
    for (const orbit of this.instanceOrbits) {
      orbit.remove();
    }
    this.$orbits.rootGroup.remove();
    this.$orbits.rootGroup = this.$orbits.svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
  }
  drawOrbits(orbits) {
    this.instanceOrbits = orbits;
    for (const orbit of orbits) {
      // orbit.reset()
      orbit.run(this.$orbits.rootGroup, {
        orbitColor: '#123456',
        planetFilter: 'url(#planet-gaussian-blur)',
        renderOrbit: true,
        requestGradient: requestGradient(this.$orbits.defs),
      });
    }
  }
}
