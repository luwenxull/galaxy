import {randomUniform} from 'd3-random'
import {select} from 'd3-selection'
import Quadtree from 'best-candidate'
import {PlanetSymbol, Orbit, Star} from '../index'


let randomColor = (function() {
  let goldenRatioConjugate = 0.618033988749895;
  let h = Math.random();

  let hslToRgb = function(h, s, l) {
    let r
    let g
    let b

    if (s === 0) {
      r = l; // achromatic
      g = l;
      b = l;
    } else {
      let hue2rgb = function(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
          return q
        }
        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return '#'
      + Math.round(r * 255).toString(16)
      + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
  };

  return function() {
    h += goldenRatioConjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})()
let radiusR = randomUniform(-10, 10)
let sizeR = randomUniform(20, 80)
let positionR = randomUniform(0, 360)
let speedR = randomUniform(1, 2)
let stepR = randomUniform(0.01, 0.02)
let n = 5
let all = []
for (let i = 0; i < n; i++) {
  let orbit = new Orbit(80 * (i + 1) + radiusR())
  all.push(
    new PlanetSymbol(
      orbit, positionR(), speedR() / (i + 1), randomColor(), sizeR(), '#planet'
    )
  )
}

let width = 1000;
let height = 800
let quadtree = new Quadtree(width, height, 10)
quadtree.add(50, 10)
select('#stars')
  .attr('width', width)
  .attr('height', height)
  .style('position', 'absolute')

select('#galaxy')
  .attr('width', width)
  .attr('height', height)
  .style('position', 'relative')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)
  .selectAll('g')
  .data(['planets', 'orbits'])
  .enter()
  .append('g')
  .attr('id', d => d)

let stars =
  quadtree._candidates.map(candidate => new Star(candidate, 5))


for (let star of stars) {
  star.twinkle('#stars', 'gray', '#66bb6a', stepR())
}

all.forEach(planet => {
  // planet.renderOrbit('#orbits')
  planet.run('#planets')
})
