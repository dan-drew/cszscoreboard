import { Component, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import {Match} from "../../config/match";
import {FlybyComponent} from "../../common/flyby/flyby.component";
import {Subscription} from "rxjs";
import { OptionalScoreComponent } from '../optional-score/optional-score.component';
import { ScoreComponent } from '../../common/score/score.component';
import { RoundNamesComponent } from '../../common/round-names/round-names.component';
import { AsyncPipe, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-live-scoreboard',
    templateUrl: './live-scoreboard.component.html',
    styleUrls: ['./live-scoreboard.component.scss'],
    host: {
        class: 'fullscreen'
    },
    imports: [FlybyComponent, OptionalScoreComponent, ScoreComponent, RoundNamesComponent, AsyncPipe, UpperCasePipe]
})
export class LiveScoreboardComponent implements OnInit, OnDestroy {
  readonly match = inject(Match);

  readonly roundFlyby = viewChild<FlybyComponent>('roundFlyby');

  private roundNameSubscription?: Subscription

  ngOnInit() {
    this.roundNameSubscription = this.match.round.current.subscribe(() => this.onRoundChanged())
  }

  ngOnDestroy() {
    this.roundNameSubscription?.unsubscribe()
  }

  private onRoundChanged() {
    this.roundFlyby()?.fly()
  }
}
