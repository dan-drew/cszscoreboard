import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  HostListener,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {Match} from "../../config/match";
import {FullScreenTargetDirective} from "../../full-screen-target.directive";
import {interval, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {FlybyComponent} from "../../common/flyby/flyby.component";
import {HeartbeatService} from "../../common/heartbeat.service";

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss'],
  hostDirectives: [FullScreenTargetDirective],
  host: {
    class: 'position-relative'
  }
})
export class LiveViewComponent implements OnInit, OnDestroy, DoCheck {
  private timer?: Subscription
  private showingScore = false

  @ViewChild('teamFlyby') teamFlyby?: FlybyComponent

  constructor(
    readonly match: Match,
    readonly fullScreen: FullScreenTargetDirective,
    private readonly title: Title,
    private readonly heartbeat: HeartbeatService
  ) {
  }

  ngOnInit() {
    this.title.setTitle('TV - ComedySports Scoreboard')

    // Close if booth heartbeat gets old, meaning it was closed
    this.timer = this.heartbeat.stale().subscribe(() => {
      window.close()
    })
  }

  ngOnDestroy() {
    this.timer?.unsubscribe()
  }

  ngDoCheck() {
    if (this.match.activeView === 'scoreboard') {
      if (!this.showingScore) {
        this.showingScore = true
        if (this.match.hasScore) this.teamFlyby?.fly()
      }
    } else if (this.showingScore) {
      this.showingScore = false
    }
  }

  @HostListener('dblclick')
  enterFullScreen() {
    this.fullScreen.enter().catch(err => {
      console.error('Failed to enter fullscreen', err)
    })
  }
}
