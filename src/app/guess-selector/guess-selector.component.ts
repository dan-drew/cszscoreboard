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

  @HostBinding('class.invisible')
  get invisible() {
    return this.match.guesses.count === 0
  }
}
