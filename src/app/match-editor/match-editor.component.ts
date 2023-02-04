import {Component} from '@angular/core';
import {Match} from "../config/match";
import {Profiles} from "../config/profiles";

type MatchTab = 'teams' | 'rounds' | 'profile'

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss'],
  host: {
    class: 'p-3 d-flex flex-column flex-nowrap'
  }
})
export class MatchEditorComponent {
  readonly tabs: MatchTab[] = ['teams', 'rounds', 'profile']
  activeTab: MatchTab = 'teams'
  private _rounds: string

  constructor(
    public match: Match,
    public profiles: Profiles
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

  save() {
    if (window.confirm('This will overwrite profile defaults. Are you sure?')) {
      this.match.save()
    }
  }

  saveAs() {
    const newName = window.prompt('Please enter the new profile name', '')
    if (newName) {
      this.match.saveAs(newName)
    }
  }

  delete() {
    if (window.prompt('This action cannot be undone! Please type DELETE to confirm.', '') === 'DELETE') {
      this.match.delete()
    }
  }
}
