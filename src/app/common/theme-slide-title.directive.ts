import {Directive, ElementRef, Input} from '@angular/core';
import {ThemeSlideConfig} from "../config/theme-slide-config";
import {ThemeSlides} from "../config/theme-slides";

@Directive({
  selector: '[themeSlideTitle]'
})
export class ThemeSlideTitleDirective {
  private config?: ThemeSlideConfig
  private slide = false

  constructor(
    private readonly el: ElementRef<HTMLDivElement>
  ) { }

  @Input('themeSlideTitle')
  set slideConfig(config: ThemeSlideConfig) {
    this.config = config
    this.update()
  }

  @Input('slide')
  set forSlide(slide: boolean) {
    this.slide = slide
    this.update()
  }

  private update() {
    if (this.config) {
      const div = this.el.nativeElement
      const theme = ThemeSlides.byName(this.config.name)

      if (this.slide) {
        div.classList.add('theme-slide-title')
        div.style.left = `${theme.title.x}px`
        div.style.top = `${theme.title.y}px`

        if (theme.title.size) {
          div.style.fontSize = `${theme.title.size}pt`
        } else {
          div.style.removeProperty('fontSize')
        }
      } else {
        div.style.removeProperty('left')
        div.style.removeProperty('top')
        div.style.removeProperty('fontSize')
      }

      if (theme.title.color) {
        div.style.color = theme.title.color
      } else {
        div.style.removeProperty('color')
      }
    }
  }
}
