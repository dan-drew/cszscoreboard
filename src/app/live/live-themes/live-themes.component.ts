import {Component} from '@angular/core';
import {Match} from "../../config/match";
import {ThemeSlides} from "../../config/theme-slides";
import {ThemeSlideType} from "../../config/theme-slide";

@Component({
  selector: 'app-live-themes',
  templateUrl: './live-themes.component.html',
  styleUrls: ['./live-themes.component.scss']
})
export class LiveThemesComponent {
  constructor(
    readonly match: Match
  ) {
  }

  get themeConfig() {
    return this.match.themeSlides.activeConfig
  }

  get theme() {
    return ThemeSlides.byName(this.themeConfig.name)
  }

  get movie() {
    return this.theme.type === ThemeSlideType.Movie
  }

  get movieStyle() {
    const theme = this.theme
    return {
      color: theme.title.color
    }
  }
}
