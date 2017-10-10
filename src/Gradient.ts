import { color } from 'd3-color'
import { selectionGenerics } from './tool'
interface IStop {
  offset: string
  color: string
}
const gradientMap: Map<string, boolean> = new Map()
export function stop(gradient: selectionGenerics, stops: IStop[]) {
  gradient
    .selectAll('stop')
    .data(stops)
    .enter()
    .append('stop')
    .attr('offset', datum => datum.offset)
    .attr('stop-color', datum => datum.color)
  return gradient
}

export function stereoscopicStop(gradient: selectionGenerics, colorStr: string) {
  const baseColor = color(colorStr)
  return stop(gradient, [
    { offset: '0', color: '#fff' },
    { offset: '0.3', color: baseColor.brighter().toString() },
    { offset: '0.7', color: baseColor.darker().toString() },
    { offset: '1', color: '#000' },
  ]).attr('cx', '.3').attr('cy', '.3').attr('r', '.7')
}

export function requestGradient(defs: selectionGenerics): (baseColor: string, id: string) => string {
  const defsDom: selectionGenerics = defs
  return (baseColor: string, id: string) => {
    if (gradientMap.has(id)) {
      return 'url(#' + id + ')'
    } else {
      stereoscopicStop(defsDom.append('radialGradient'), baseColor).attr('id', id)
      gradientMap.set(id, true)
      return 'url(#' + id + ')'
    }
  }
}
