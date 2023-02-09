import {Component, HostBinding} from '@angular/core';
import {Match} from "../config/match";

@Component({
  selector: 'app-guess-selector',
  templateUrl: './guess-selector.component.html',
  styleUrls: ['./guess-selector.component.scss'],
  // host: {
  //   class: 'w-100 d-flex flex-nowrap align-items-center'
  // }
})
export class GuessSelectorComponent {
  constructor(
    public readonly match: Match
  ) {
  }

  get game() {
    return this.match.guesses.game
  }

  @HostBinding('class.invisible')
  get invisible() {
    return !this.game
  }
}
