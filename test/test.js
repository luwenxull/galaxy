import { randomUniform } from 'd3-random'
import PlanetCircle from '../src/PlanetCircle'
import Orbit from '../src/Orbit'
import galaxy from '../src/Galaxy'

// let radiusR = randomUniform(-10, 10)
let sizeR = randomUniform(10, 20)
let positionR = randomUniform(0, 360)
let speedR = randomUniform(0.1, 0.2)
let orbitNum = 5
let orbits = []
for (let i = 0; i < orbitNum; i++) {
  let orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      angle: positionR(),
      color: 'red',
      size: sizeR(),
    })
  )
  orbits.push(orbit)
}

function newOrbit() {
  let orbit = new Orbit(speedR())
  orbit.addPlanet(
    new PlanetCircle({
      angle: positionR(),
      color: 'yellow',
      size: sizeR(),
    })
  )
  orbits.push(orbit)
}

let container = document.getElementById('container')
function doRender() {
  galaxy.render(container, orbits)
}
doRender()
if (module.hot) {
  module.hot.accept('../src/Galaxy', function() {
    doRender()
  })
  module.hot.accept('../src/Orbit', function() {
    doRender()
  })
}

window._render = doRender
window._renderWithNewOrbit = function() {
  newOrbit()
  doRender()
}