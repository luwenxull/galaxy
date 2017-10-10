import { randomUniform } from 'd3-random'
import { Galaxy, IGalaxy} from '../src/Galaxy'
import { IOrbit, Orbit } from '../src/Orbit'
import { IPlanetCircle, PlanetCircle } from '../src/PlanetCircle'
// let radiusR = randomUniform(-10, 10)
const galaxy: IGalaxy = new Galaxy()
const sizeR = randomUniform(10, 20)
const positionR = randomUniform(0, 360)
const speedR = randomUniform(0.1, 0.5)
const numR = randomUniform(3, 8)
const pNumR = randomUniform(1, 4)
const colors = ['red', 'green', 'orange']
const colorR = randomUniform(0, 3)
function generateOrbits() {
  const orbits: IOrbit[] = []
  for (let i = 0; i < numR(); i++) {
    const orbit = new Orbit(speedR())
    for (let j = 0; j < pNumR(); j++) {
      const color = Math.floor(colorR())
      orbit.addPlanet(
        new PlanetCircle({
          color: colors[color],
          gradient: colors[color],
          size: sizeR(),
        }),
      )
    }
    orbits.push(orbit)
  }
  return orbits
}

const container = document.getElementById('container')
function doRender() {
  galaxy.render(container, generateOrbits())
}
function doUpdate() {
  galaxy.update(generateOrbits())
}
doRender()
/* if (module.hot) {
  module.hot.accept('../src/Galaxy', function() {
    doRender()
  })
  module.hot.accept('../src/Orbit', function() {
    doRender()
  })
}*/

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    _galaxy
    _render()
    _update()
  }
}

window._galaxy = galaxy
window._render = doRender
window._update = doUpdate
