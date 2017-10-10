import { randomUniform } from 'd3-random'
import { Galaxy, IGalaxy} from '../src/Galaxy'
import { IOrbit, Orbit } from '../src/Orbit'
import { IPlanetCircle, PlanetCircle } from '../src/PlanetCircle'
// let radiusR = randomUniform(-10, 10)
const galaxy: IGalaxy = new Galaxy()
const sizeR = randomUniform(10, 20)
const positionR = randomUniform(0, 360)
const speedR = randomUniform(0.1, 0.5)
const orbitNum = 1
const orbits: IOrbit[] = []
for (let i = 0; i < orbitNum; i++) {
  const orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      color: 'red',
      gradient: 'red',
      size: sizeR(),
    }),
  )
  orbits.push(orbit)
}
function newPlanet(num: number = 1) {
  const randomIndex = Math.floor(randomUniform(0, orbits.length)())
  const orbit = orbits[randomIndex]
  while (num > 0) {
    orbit.addPlanet(
      new PlanetCircle({
        color: 'orange',
        gradient: 'orange',
        size: sizeR(),
      }),
    )
    num -= 1
  }
}

function removePlanet(): void {
  const randomIndex: number = Math.floor(randomUniform(0, orbits.length)())
  const randomPlanetIndex: number = Math.floor(randomUniform(0, orbits[randomIndex].planets.length)())
  orbits[randomIndex].removePlanet(orbits[randomIndex].planets[randomPlanetIndex])
}

function newOrbit() {
  const orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      color: 'yellow',
      gradient: 'yellow',
      size: sizeR(),
    }),
  )
  orbits.push(orbit)
}
function removeOrbit() {
  const randomIndex = Math.floor(randomUniform(0, orbits.length)())
  orbits[randomIndex].remove()
  orbits.splice(randomIndex, 1)
}

const container = document.getElementById('container')
function doRender() {
  galaxy.render(container, orbits)
}
function doUpdate() {
  galaxy.update(orbits)
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
    _render()
    _update()
    _renderWithNewOrbit()
    _renderWithNewPlanet()
    _removeOrbit()
    _removePlanet()
  }
}

window._render = doRender
window._update = doUpdate
window._renderWithNewOrbit = function() {
  newOrbit()
  doUpdate()
}
window._renderWithNewPlanet = function() {
  newPlanet()
  doUpdate()
}
window._removeOrbit = function() {
  removeOrbit()
  doUpdate()
}
window._removePlanet = function() {
  removePlanet()
  newPlanet()
  doUpdate()
}
