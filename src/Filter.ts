import { BaseType, Selection } from 'd3-selection'
type selectionGenerics = Selection<BaseType, any, BaseType, any>
export function gaussianBlur(
  filter: selectionGenerics,
  input: string = 'SourceGraphic',
  output: string,
  deviation: number = 0,
): selectionGenerics {
  filter
    .append('feGaussianBlur')
    .attr('in', input)
    .attr('result', output)
    .attr('stdDeviation', deviation)
  return filter
}

export function colorMatrix(
  filter: selectionGenerics,
  input: string = 'SourceGraphic',
  output: string,
  values: string,
): selectionGenerics {
  filter
    .append('feColorMatrix')
    .attr('in', input)
    .attr('result', output)
    .attr('type', 'matrix')
    .attr('values', values)
  return filter
}

export function offset(
  filter: selectionGenerics,
  input: string = 'SourceGraphic',
  output: string,
  dx: number = 0,
  dy: number = 0,
): selectionGenerics {
  filter
    .append('feOffset')
    .attr('in', input)
    .attr('result', output)
    .attr('dx', dx)
    .attr('dy', dy)
  return filter
}

export function merge(filter: selectionGenerics, merges: string[]): selectionGenerics {
  filter
    .append('feMerge')
    .selectAll('feMergeNode')
    .data(merges)
    .enter()
    .append('feMergeNode')
    .attr('in', datum => datum)
  return filter
}
