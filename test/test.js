import { randomUniform } from 'd3-random'
import PlanetCircle from '../src/PlanetCircle'
import Orbit from '../src/Orbit'
import galaxy from '../src/Galaxy'

let radiusR = randomUniform(-10, 10)
let sizeR = randomUniform(20, 50)
let positionR = randomUniform(0, 360)
let speedR = randomUniform(0.1, 0.2)
let orbitNum = 5
let orbits = []
for (let i = 0; i < orbitNum; i++) {
  let orbit = new Orbit(80 * (i + 1) + radiusR(), speedR())
  orbit.addPlanet(
    new PlanetCircle({
      orbit,
      angle: positionR(),
      color: 'red',
      size: sizeR(),
    })
  )
  orbits.push(orbit)
}

let container = document.getElementById('container')
galaxy.render(container, orbits)
setTimeout(() => {
  galaxy.render(container, orbits)
}, 2000)
if (module.hot) {
  module.hot.accept('../src/Galaxy', function() {
    galaxy.render(container, orbits)
  })
  module.hot.accept('../src/Orbit', function() {
    galaxy.render(container, orbits)
  })
}
