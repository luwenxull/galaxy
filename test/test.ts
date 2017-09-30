import { randomUniform } from 'd3-random'
import { planetAnimator } from '../src/Animator'
import galaxy from '../src/Galaxy'
import Orbit from '../src/Orbit'
import { PlanetCircle } from '../src/PlanetCircle'
// let radiusR = randomUniform(-10, 10)
const sizeR = randomUniform(10, 20)
const positionR = randomUniform(0, 360)
const speedR = randomUniform(0.1, 0.2)
const orbitNum = 5
const orbits = []
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
function newPlanet() {
  const randomIndex = Math.floor(randomUniform(0, orbits.length)())
  const orbit = orbits[randomIndex]
  orbit.addPlanet(
    new PlanetCircle({
      color: 'orange',
      gradient: 'orange',

      size: sizeR(),
    }),
  )
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
