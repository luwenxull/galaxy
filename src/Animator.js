import { transition } from 'd3-transition'

export let largerAnimator = {
  execute(node, time) {
    node
      .style('transform-origin', '50%')
      .transition('smaller')
      .duration(time)
      .attr('transform', 'scale(0.2)')
      .transition('bigger')
      .duration(time)
      .attr('transform', 'scale(1.5)')
  },
}