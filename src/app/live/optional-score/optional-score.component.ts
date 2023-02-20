import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-optional-score',
  templateUrl: './optional-score.component.html',
  styleUrls: ['./optional-score.component.scss'],
  host: {
    class: 'd-flex-column align-items-center justify-content-center'
  }
})
export class OptionalScoreComponent {
  constructor(
    readonly match: Match
  ) {
  }
}
