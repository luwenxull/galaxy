export default class Planet {
  constructor() {
    if (new.target.name === 'Planet') {
      throw Error('Do not call new Planet() directly!')
    }
  }


  create() {
    throw Error('Must overwrite create method')
  }

  renderOrbit() {
    throw Error('Must overwrite renderOrbit method')
  }

  run(place) {
    if (!this.$link) {
      this.create(place)
    }
    let run = () => {
      this.update()
      this.animationFrame = requestAnimationFrame(run)
    }
    this.animationFrame = requestAnimationFrame(run)
  }

  update() {
    throw Error('Must overwrite update method')
  }

  stop() {
    cancelAnimationFrame(this.animationFrame)
  }
}
