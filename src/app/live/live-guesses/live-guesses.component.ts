import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {GuessingService, GuessSlidePart} from "../../common/guessing.service";

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
  private static LONG_LIST = 6
  private static LONGER_LIST = 9
  private static LONGEST_LIST = 17

  @Input() index?: number
  @HostBinding('class.fullscreen') @Input() fullscreen: boolean = true

  constructor(
    readonly guessing: GuessingService
  ) {
  }

  get slide() {
    return this.index === undefined ?  this.guessing.selected : this.guessing.slides[this.index]
  }

  partClasses(part: GuessSlidePart) {
    const classes: any = {
      part: true,
      long: part.answers.length >= LiveGuessesComponent.LONG_LIST,
      longer: part.answers.length >= LiveGuessesComponent.LONGER_LIST,
      longest: part.answers.length >= LiveGuessesComponent.LONGEST_LIST
    }
    classes[`guess-style-${part.style}`] = true
    return classes
  }
}
