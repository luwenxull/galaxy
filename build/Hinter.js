import { toArray } from './tool';
export class Hinter {
  constructor(parent) {
    this.$group = parent;
    this.$rect = this.$group.append('rect');
    this.$text = this.$group.append('text');
  }
  show(text, center) {
    this.$group.attr('transform', `translate(${center[0]},${center[1]})`);
    this.$rect
      .attr('');
    this.$text
      .selectAll('tspan')
      .data(toArray(text))
      .enter()
      .append('tspan')
      .text(d => d);
  }
  close() {
  }
}
