import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Match} from "../../config/match";
import {FlybyComponent} from "../../common/flyby/flyby.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-live-scoreboard',
  templateUrl: './live-scoreboard.component.html',
  styleUrls: ['./live-scoreboard.component.scss'],
  host: {
    class: 'fullscreen'
  }
})
export class LiveScoreboardComponent implements OnInit, OnDestroy {
  @ViewChild('roundFlyby') roundFlyby!: FlybyComponent

  private roundNameSubscription?: Subscription

  constructor(
    readonly match: Match
  ) {
  }

  ngOnInit() {
    this.roundNameSubscription = this.match.round.current.subscribe(() => this.onRoundChanged())
  }

  ngOnDestroy() {
    this.roundNameSubscription?.unsubscribe()
  }

  private onRoundChanged() {
    this.roundFlyby?.fly()
  }
}
