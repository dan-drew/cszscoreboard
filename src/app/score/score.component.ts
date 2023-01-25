import {Component, Input} from '@angular/core';
import {Match} from "../config/match";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  host: {
    class: 'd-flex justify-content-evently'
  }
})
export class ScoreComponent {
  @Input() editable: boolean = false

  constructor(
    public match: Match
  ) {
  }
}
