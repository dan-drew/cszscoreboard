import {Component, ViewEncapsulation} from '@angular/core';
import {Match} from "../../config/match";
import {Profiles} from "../../config/profiles";

type MatchTab = 'teams' | 'rounds' | 'profile'

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'p-3 d-flex-column'
  }
})
export class MatchEditorComponent {
  readonly tabs: MatchTab[] = ['teams', 'rounds', 'profile']
  activeTab: MatchTab = 'teams'

  constructor(
    public match: Match,
    public profiles: Profiles
  ) {
  }

}
