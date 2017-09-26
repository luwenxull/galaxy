import galaxy from '../src/Galaxy'
galaxy.render(document.getElementById('container'))

if (module.hot) {
  module.hot.accept('../src/Galaxy', function() {
    galaxy.render(document.getElementById('container'))
  })
}
