import { color } from 'd3-color'
export function stop(gradient, stops) {
  gradient
    .selectAll('stop')
    .data(stops)
    .enter()
    .append('stop')
    .attr('offset', datum => datum.offset)
    .attr('stop-color', datum => datum.color)
  return gradient
}

export function stereoscopicStop(gradient, baseColor) {
  baseColor = color(baseColor)
  return stop(gradient, [
    { offset: '0', color: '#fff' },
    { offset: '0.3', color: baseColor.brighter() },
    { offset: '0.7', color: baseColor.darker() },
    { offset: '1', color: '#000' },
  ]).attr('cx', '.3').attr('cy', '.3').attr('r', '.7')
}
