import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {asyncScheduler} from "rxjs";

interface Rects {
  parent: DOMRect
  content: DOMRect
}

@Directive({selector: '[fitContainer]'})
export class FitContainerDirective {
  constructor(
    public readonly el: ElementRef<HTMLElement>,
  ) {
  }

  get element() {
    return this.el.nativeElement;
  }
}

@Directive({
  selector: 'fitParent'
})
export class FitParentDirective implements OnInit, OnDestroy {
  static readonly RESIZE_DELAY = 250

  private resizeObserver?: ResizeObserver
  private currentScale = 1
  private resizing = false
  private fontSize!: number
  private fontUnits!: string

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly parent: FitContainerDirective,
  ) {
  }

  ngOnInit(): void {
    this.initElement(this.el.nativeElement, this.parent.element)
    this.resizeObserver = new ResizeObserver(entries => this.onResize())
    this.resizeObserver.observe(this.el.nativeElement)
    this.onResize()
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect()
  }

  private initElement(el: HTMLElement, parent: HTMLElement) {
    parent.style.overflowX = 'hidden'
    parent.style.overflowY = 'visible'
    parent.style.background = 'pink'
    el.style.position = 'relative'
    el.style.background = 'lavender'

    const style = window.getComputedStyle(el).fontSize
    const sizeInfo = /(\d+(?:\.\d+)?)([a-zA-Z]*)/.exec(style)!
    this.fontSize = Number(sizeInfo[1])
    this.fontUnits = sizeInfo[2]
  }

  private set scale(val: number) {
    /* if (val !== 1) */
    console.debug(`Setting scale to ${val}`)
    this.currentScale = val
    this.el.nativeElement.style.scale = val.toString()
    this.el.nativeElement.style.border = `1px solid ${val == 1 ? 'gray' : 'purple'} !important`
  }

  private onResize() {
    if (!this.resizing) {
      // Delay resize to allow for multiple changes before we adjust
      this.resizing = true
      asyncScheduler.schedule(() => this.recalcScale(), FitParentDirective.RESIZE_DELAY)
    }
  }

  private recalcScale() {
    this.resizing = false

    let rects = this.calcRects()
    if (rects.content.height > rects.parent.height) {
      this.shrink()
      rects = this.calcRects()
    }
    // const scaleX = rects.parent.width / rects.content.width
    // const scaleY = rects.parent.height / rects.content.height
    //
    // this.scale = Math.min(scaleX, scaleY) //, 1)
  }

  private shrink() {
    this.fontSize -= 0.5
    const newSize = `${this.fontSize}${this.fontUnits}`
    this.el.nativeElement.style.fontSize = newSize
    console.debug('Set font size to ', newSize)
  }

  private calcRects() {
    const rects: Rects = {
      parent: this.parent!.el.nativeElement.getBoundingClientRect(),
      content: this.el.nativeElement.getBoundingClientRect()
    }

    rects.content.width *= this.currentScale
    rects.content.height *= this.currentScale

    return rects
  }
}
