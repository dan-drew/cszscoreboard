import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-optional-team-editor',
  templateUrl: './optional-team-editor.component.html',
  host: {
    class: 'd-flex-column gap-3 p-3'
  }
})
export class OptionalTeamEditorComponent {
  constructor(
    readonly match: Match
  ) {
  }

  enable() {
    this.match.teams.optionalEnabled = true
  }

  disable() {
    this.match.teams.optionalEnabled = false
  }
}
