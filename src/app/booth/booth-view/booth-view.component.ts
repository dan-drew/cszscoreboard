import {Component, OnInit} from '@angular/core';
import {Match, MatchView} from "../../config/match";
import {GuessingService} from "../../guessing/guessing.service";

@Component({
  selector: 'app-booth-view',
  templateUrl: './booth-view.component.html',
  styleUrls: ['./booth-view.component.scss'],
  host: {
    class: 'position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden d-flex-row'
  }
})
export class BoothViewComponent implements OnInit {
  constructor(
    readonly match: Match,
    private readonly guessing: GuessingService
    ) {
  }

  ngOnInit() {
    this.openLive()
  }

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }

  viewAvailable(view: MatchView) {
    if (view === 'guesses') return this.guessing.enabled
    return true
  }
}
