import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-match-rounds-editor',
  templateUrl: './match-rounds-editor.component.html',
  host: {
    class: 'd-flex-column gap-3'
  }
})
export class MatchRoundsEditorComponent {
  private _rounds: string

  constructor(
    readonly match: Match
  ) {
    this._rounds = match.round.names.join("\n")
  }

  get rounds() {
    return this._rounds
  }

  set rounds(val: string) {
    this._rounds = val
    this.match.round.names = val.split("\n").map(s => s.trim()).filter(s => s.length > 0)
  }
}
