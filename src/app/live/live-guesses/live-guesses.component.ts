import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {GuessingService} from "../../guessing/guessing.service";

@Component({
  selector: 'app-live-guesses',
  templateUrl: './live-guesses.component.html',
  styleUrls: ['./live-guesses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'd-flex-column align-items-stretch'
  }
})
export class LiveGuessesComponent {
  @Input() index?: number
  @HostBinding('class.fullscreen') @Input() fullscreen: boolean = true

  constructor(
    readonly guessing: GuessingService
  ) {
  }

  get slide() {
    return this.index === undefined ?  this.guessing.selected : this.guessing.slides[this.index]
  }
}
