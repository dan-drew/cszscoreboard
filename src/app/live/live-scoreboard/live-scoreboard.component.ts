import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-live-scoreboard',
  templateUrl: './live-scoreboard.component.html',
  styleUrls: ['./live-scoreboard.component.scss'],
  host: {
    class: 'fullscreen'
  }
})
export class LiveScoreboardComponent {
  constructor(
    readonly match: Match
  ) {
  }
}
