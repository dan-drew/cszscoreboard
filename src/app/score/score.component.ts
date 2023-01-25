import {Component} from '@angular/core';
import {match} from "../config/match";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  readonly match = match
}
