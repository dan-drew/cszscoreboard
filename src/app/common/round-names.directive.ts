import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[roundNames]'
})
export class RoundNamesDirective {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
    this.renderer.addClass(this.el.nativeElement, 'd-flex-row')
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'margin-left 0.5s')
  }

  set offset(val: number) {
    this.renderer.setStyle(this.el.nativeElement, 'marginLeft', `-${val}px`)
  }

  get rect() {
    return this.el.nativeElement.getBoundingClientRect()
  }
}
