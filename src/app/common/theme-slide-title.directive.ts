import {Directive, ElementRef, Input} from '@angular/core';
import {ThemeSlideConfig} from "../config/theme-slide-config";
import {ThemeSlides} from "../config/theme-slides";

@Directive({
  selector: '[themeSlideTitle]'
})
export class ThemeSlideTitleDirective {
  constructor(
    private readonly el: ElementRef<HTMLDivElement>
  ) { }

  @Input('themeSlideTitle')
  set config(config: ThemeSlideConfig) {
    const div = this.el.nativeElement
    const theme = ThemeSlides.byName(config.name)

    div.classList.add('theme-slide-title')
    div.style.left = `${theme.title.x}px`
    div.style.top = `${theme.title.y}px`

    if (theme.title.size) {
      div.style.fontSize = `${theme.title.size}pt`
    } else {
      div.style.removeProperty('fontSize')
    }

    if (theme.title.color) {
      div.style.color = theme.title.color
    } else {
      div.style.removeProperty('color')
    }
  }
}
