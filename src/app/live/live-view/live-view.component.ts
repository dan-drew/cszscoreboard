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

const POLL_INTERVAL = 250

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private readonly changeDetector: ChangeDetectorRef,
    private readonly title: Title
  ) {
  }

  ngOnInit() {
    this.title.setTitle('TV - ComedySports Scoreboard')
    this.timer = interval(POLL_INTERVAL).subscribe(() => this.poll())
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

  private poll() {
    if (this.boothClosed) {
      window.close()
    } else {
      this.changeDetector.detectChanges()
    }
  }

  private get boothClosed() {
    return !window.opener || (window.opener as Window).closed
  }
}
