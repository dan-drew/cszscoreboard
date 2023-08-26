import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-match-teams-editor',
  templateUrl: './match-teams-editor.component.html',
  host: {
    class: 'd-flex-column gap-3'
  }
})
export class MatchTeamsEditorComponent {
  constructor(
    readonly match: Match
  ) {
  }
}
