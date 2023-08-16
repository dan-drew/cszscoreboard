import { Component } from '@angular/core';
import {ThemeSlides} from "../../config/theme-slides";
import {ThemeSlide} from "../../config/theme-slide";
import {Match} from "../../config/match";
import {ThemeSlideConfig} from "../../config/theme-slide-config";

@Component({
  selector: 'app-theme-slide-editor',
  templateUrl: './theme-slide-editor.component.html',
  styleUrls: ['./theme-slide-editor.component.scss'],
  host: {
    class: 'p-3 d-flex-column'
  }
})
export class ThemeSlideEditorComponent {
  constructor(
    readonly match: Match
  ) {
  }

  get themes() {
    return ThemeSlides.Themes
  }

  addSlide(theme: ThemeSlide) {
    this.match.themeSlides.add(theme)
  }

  deleteSlide(slide: ThemeSlideConfig) {
    this.match.themeSlides.remove(slide)
  }
}
