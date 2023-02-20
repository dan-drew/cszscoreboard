import {Component, OnInit} from '@angular/core';
import {Match, MatchView} from "../../config/match";

interface ViewOption {
  view: MatchView
  icon: string
}

@Component({
  selector: 'app-booth-view',
  templateUrl: './booth-view.component.html',
  styleUrls: ['./booth-view.component.scss'],
  host: {
    class: 'position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden d-flex-row'
  }
})
export class BoothViewComponent implements OnInit {
  readonly viewOptions: ViewOption[] = [
    { view: 'slate', icon: 'image-fill' },
    { view: 'scoreboard', icon: 'joystick' },
    { view: 'guesses', icon: 'question-circle' }
  ]

  constructor(
    public match: Match
    ) {
  }

  ngOnInit() {
    this.openLive()
  }

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }

  viewAvailable(view: MatchView) {
    if (view === 'guesses') return this.match.guesses.count > 0
    return true
  }
}
