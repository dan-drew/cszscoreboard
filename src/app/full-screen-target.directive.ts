import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[fullScreenTarget]',
  standalone: true
})
export class FullScreenTargetDirective {
  constructor(readonly element: ElementRef) {
  }

  get allowed() {
    return document.fullscreenEnabled
  }

  get enabled() {
    return !!document.fullscreenElement || this.isBrowserFullScreen()
  }

  get canEnter() {
    return this.allowed && !this.enabled
  }

  async enter() {
    if (this.canEnter) {
      await this.element.nativeElement.requestFullscreen({
        navigationUI: "hide"
      })
    }
  }

  get canExit() {
    return this.enabled
  }

  async exit() {
    if (this.canExit) {
      await document.exitFullscreen()
    }
  }

  private isBrowserFullScreen() {
    return window.screenLeft === 0 &&
      window.screenTop === 0 &&
      window.innerWidth === window.screen.width &&
      window.innerHeight === window.screen.height
  }
}
