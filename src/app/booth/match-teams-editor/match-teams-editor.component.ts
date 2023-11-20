import { Component } from '@angular/core';
import {Match} from "../../config/match";
import {Profiles} from "../../config/profiles";
import {TeamLogo} from "../../config/profile";

@Component({
  selector: 'app-match-teams-editor',
  templateUrl: './match-teams-editor.component.html',
  host: {
    class: 'd-flex-column gap-3'
  }
})
export class MatchTeamsEditorComponent {
  constructor(
    readonly match: Match,
    readonly profiles: Profiles
  ) {
  }

  get blueLogo(): string | undefined {
    return this.match.profile.teams.blueLogp
  }

  set blueLogo(value: string | undefined) {
    this.match.profile.teams.blueLogp = value as TeamLogo
  }

  get redLogo(): string | undefined {
    return this.match.profile.teams.redLogo
  }

  set redLogo(value: string | undefined) {
    this.match.profile.teams.redLogo = value as TeamLogo
  }
}
