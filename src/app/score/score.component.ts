import {Component, Input} from '@angular/core';
import {Match} from "../config/match";
import {Team} from "../config/team";

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

  editScore(team: Team) {
    const newScore = window.prompt(`Please enter ${team.name} score`, team.score.toString())

    if (newScore !== null && /^-?\d{1,3}$/.test(newScore)) {
      team.score = Number(newScore)
    }
  }
}
