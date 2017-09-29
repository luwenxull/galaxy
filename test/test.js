import { randomUniform } from 'd3-random'
import PlanetCircle from '../src/PlanetCircle'
import Orbit from '../src/Orbit'
import galaxy from '../src/Galaxy'
import { planetAnimator } from '../src/Animator'
// let radiusR = randomUniform(-10, 10)
let sizeR = randomUniform(10, 20)
let positionR = randomUniform(0, 360)
let speedR = randomUniform(0.1, 0.2)
let orbitNum = 1
let orbits = []
for (let i = 0; i < orbitNum; i++) {
  let orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      color: 'red',
      gradient: 'red',
      size: sizeR(),
    })
  )
  orbits.push(orbit)
}
function newPlanet() {
  let randomIndex = Math.floor(randomUniform(0, orbits.length)())
  let orbit = orbits[randomIndex]
  orbit.addPlanet(
    new PlanetCircle({
      color: 'orange',
      gradient: 'orange',
      size: sizeR(),
      animator: planetAnimator,
    })
  )
}
function newOrbit() {
  let orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      angle: positionR(),
      color: 'yellow',
      gradient: 'yellow',
      size: sizeR(),
    })
  )
  orbits.push(orbit)
}
function removeOrbit() {
  let randomIndex = Math.floor(randomUniform(0, orbits.length)())
  orbits[randomIndex].remove()
  orbits.splice(randomIndex, 1)
}

let container = document.getElementById('container')
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