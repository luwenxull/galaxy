function throwError(msg) {
  throw Error(msg)
}
export default class Planet {
  constructor() {
    if (new.target.name === 'Planet') {
      throwError('Do not call new Planet() directly!')
    }
  }


  create() {
    throwError('Must overwrite create method')
  }

  renderOrbit() {
    throwError('Must overwrite renderOrbit method')
  }

  run(place) {
    throwError('Must overwrite run method')
  }

  updatePosition() {
    throwError('Must overwrite updatePosition method')
  }

  stop() {
    throwError('Must overwrite stop method')
  }
}
