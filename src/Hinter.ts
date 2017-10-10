import { selectionGenerics, toArray } from './tool'
export interface IHinter {
  show(text: string | string[]): void
  close(): void
}

export class Hinter implements IHinter {
  private $group: selectionGenerics
  private $rect: selectionGenerics
  private $text: selectionGenerics
  constructor(parent: selectionGenerics) {
    this.$group = parent
    this.$rect = this.$group.append('rect')
    this.$text = this.$group.append('text')
  }

  public show(text: string | string[]) {
    this.$text
      .selectAll('tspan')
      .data(toArray(text))
      .enter()
      .append('tspan')
      .text(d => d)
  }

  public close() {

  }
}
