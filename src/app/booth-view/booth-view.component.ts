import {Component} from '@angular/core';
import {Match, MatchView} from "../config/match";
import {Configuration} from "../config/configuration";

interface ViewOption {
  view: MatchView
  icon: string
}

@Component({
  selector: 'app-booth-view',
  templateUrl: './booth-view.component.html',
  styleUrls: ['./booth-view.component.scss']
})
export class BoothViewComponent {
  readonly viewOptions: ViewOption[] = [
    { view: 'slate', icon: 'image-fill' },
    { view: 'scoreboard', icon: 'joystick' }
  ]

  constructor(
    public match: Match,
    public config: Configuration
    ) {
  }

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }
}
