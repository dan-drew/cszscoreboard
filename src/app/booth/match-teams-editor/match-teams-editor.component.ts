import {Component, inject} from '@angular/core';
import {Match} from "../../config/match";
import {Profiles} from "../../config/profiles";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconSelectorComponent} from '../../common/icon-selector/icon-selector.component';

@Component({
    selector: 'app-match-teams-editor',
    templateUrl: './match-teams-editor.component.html',
    host: {
        class: 'd-flex-column gap-3'
    },
    imports: [ReactiveFormsModule, FormsModule, IconSelectorComponent]
})
export class MatchTeamsEditorComponent {
  readonly match = inject(Match);
  readonly profiles = inject(Profiles);
}
