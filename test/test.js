import {Planet, Orbit} from '../index'
import {randomUniform} from 'd3-random'

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
})();
let radiusR = randomUniform(-10, 10)
let sizeR = randomUniform(5, 15)
let positionR = randomUniform(0, 360)
let speedR = randomUniform(1, 5)
let n = 7
let all = []
for (let i = 0; i < n; i++) {
  let orbit = new Orbit(50 * (i + 1) + radiusR())
  all.push(
    new Planet(
      orbit, sizeR(), positionR(), speedR() / (i + 1), randomColor()
    )
  )
}

all.forEach(planet => {
  planet.renderOrbit('#root-group')
  planet.run('#root-group')
})