import {Component, OnDestroy, OnInit} from '@angular/core';
import {Match, MatchView} from "../../config/match";
import {GuessingService} from "../../common/guessing.service";
import {Title} from "@angular/platform-browser";
import {interval, Subscription} from "rxjs";
import {HeartbeatService} from "../../common/heartbeat.service";

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
    private readonly guessing: GuessingService,
    private readonly title: Title,
    private readonly heartbeat: HeartbeatService
    ) {
  }

  ngOnInit() {
    this.title.setTitle('Booth - ComedySports Scoreboard')
    this.heartbeat.start()
    this.openLive()
  }

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup,noopener')
  }

  viewAvailable(view: MatchView) {
    switch (view) {
      case 'guesses': return this.guessing.enabled
      case 'themes': return this.match.themeSlides.enabled
    }
    return true
  }
}
