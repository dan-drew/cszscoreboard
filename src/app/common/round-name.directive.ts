import {Directive, ElementRef, Renderer2} from '@angular/core';

interface RoundNameElementData {
  element: Element
  offset: number
  width: number
}

export interface RoundNameData {
  selected: RoundNameElementData
  unselected: RoundNameElementData
}

@Directive({
  selector: '[roundName]'
})
export class RoundNameDirective {

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
    this.renderer.addClass(this.el.nativeElement, 'csz-bold-text')
    this.renderer.addClass(this.el.nativeElement, 'clickable')
  }

  set selected(val: boolean) {
    if (val) {
      this.renderer.addClass(this.el.nativeElement, 'selected')
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'selected')
    }
  }

  getData(containerLeft: number = 0): RoundNameData {
    const selected = this.getItem('selected')
    const unselected = this.getItem('unselected')
    const selectedRect = selected.getBoundingClientRect()
    const unselectedRect = unselected.getBoundingClientRect()

    return {
      selected: {
        element: selected,
        offset: selectedRect.left - containerLeft,
        width: selectedRect.width
      },
      unselected: {
        element: unselected,
        offset: unselectedRect.left - containerLeft,
        width: unselectedRect.width
      }
    }
  }

  private getItem(name: string) {
    return this.el.nativeElement.getElementsByClassName(name).item(0)!
  }

}
