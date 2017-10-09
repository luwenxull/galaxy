export function gaussianBlur(filter, input = 'SourceGraphic', output, deviation = 0) {
  filter
    .append('feGaussianBlur')
    .attr('in', input)
    .attr('result', output)
    .attr('stdDeviation', deviation);
  return filter;
}
export function colorMatrix(filter, input = 'SourceGraphic', output, values) {
  filter
    .append('feColorMatrix')
    .attr('in', input)
    .attr('result', output)
    .attr('type', 'matrix')
    .attr('values', values);
  return filter;
}
export function offset(filter, input = 'SourceGraphic', output, dx = 0, dy = 0) {
  filter
    .append('feOffset')
    .attr('in', input)
    .attr('result', output)
    .attr('dx', dx)
    .attr('dy', dy);
  return filter;
}
export function merge(filter, merges) {
  filter
    .append('feMerge')
    .selectAll('feMergeNode')
    .data(merges)
    .enter()
    .append('feMergeNode')
    .attr('in', datum => datum);
  return filter;
}
