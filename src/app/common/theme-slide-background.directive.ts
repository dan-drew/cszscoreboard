import {Directive, ElementRef, Input} from '@angular/core';
import {ThemeSlideConfig} from "../config/theme-slide-config";
import {ThemeSlides} from "../config/theme-slides";

@Directive({
  selector: '[themeSlideBackground]'
})
export class ThemeSlideBackgroundDirective {
  constructor(
    private readonly el: ElementRef
  ) { }

  @Input('themeSlideBackground')
  set config(config: ThemeSlideConfig) {
    const theme = ThemeSlides.byName(config.name)

    if (this.el.nativeElement.nodeName === 'IMG') {
      this.el.nativeElement.src = `/assets/themes/${theme.background.image}`
      this.el.nativeElement.style.objectFit = theme.background.style
    } else {
      this.el.nativeElement.style.backgroundImage = `url("/assets/themes/${theme.background.image}")`
      this.el.nativeElement.style.backgroundSize = theme.background.style
    }
  }
}
