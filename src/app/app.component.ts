import {Component, inject} from '@angular/core';
import {InputModalComponent} from './common/input-modal/input-modal.component';
import {RouterOutlet} from '@angular/router';
import {DebugInfoComponent} from './common/debug-info/debug-info.component';
import {Match} from "./config/match";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [InputModalComponent, RouterOutlet, DebugInfoComponent],
  host: {
    '[style.--left-team-bg-color]': 'match.profile.teams.left.color',
    '[style.--left-team-text-color]': 'match.profile.teams.left.textColor',
    '[style.--right-team-bg-color]': 'match.profile.teams.right.color',
    '[style.--right-team-text-color]': 'match.profile.teams.right.textColor',
    '[style.--optional-team-bg-color]': 'match.profile.teams.optional.color',
    '[style.--optional-team-text-color]': 'match.profile.teams.optional.textColor',
  }
})
export class AppComponent {
  protected readonly match = inject(Match);
}
