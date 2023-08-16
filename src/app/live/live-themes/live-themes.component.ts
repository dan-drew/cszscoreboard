import { Component } from '@angular/core';
import {Match} from "../../config/match";

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
}
