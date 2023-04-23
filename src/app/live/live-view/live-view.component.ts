import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../../config/match";
import {FullScreenTargetDirective} from "../../full-screen-target.directive";
import {interval, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

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
export class LiveViewComponent implements OnInit, OnDestroy {
  private timer?: Subscription

  constructor(
    readonly match: Match,
    readonly fullScreen: FullScreenTargetDirective,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly title: Title
  ) {
  }

  ngOnInit() {
    this.title.setTitle('TV - ComedySports Scoreboard')
    this.timer = interval(1000).subscribe(() => this.poll())
  }

  ngOnDestroy() {
    this.timer?.unsubscribe()
  }

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
