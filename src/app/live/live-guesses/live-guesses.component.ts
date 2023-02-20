import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-live-guesses',
  templateUrl: './live-guesses.component.html',
  styleUrls: ['./live-guesses.component.scss'],
  host: {
    class: 'fullscreen d-flex-column align-items-stretch'
  }
})
export class LiveGuessesComponent {
  constructor(
    readonly match: Match
  ) {
  }

  get game() {
    return this.match.guesses.game!
  }
}
