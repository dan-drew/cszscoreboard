import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../config/match";
import {FullScreenTargetDirective} from "../full-screen-target.directive";

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
  private timer?: any

  constructor(
    public match: Match,
    public readonly fullScreen: FullScreenTargetDirective,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.timer = setInterval(() => this.changeDetector.detectChanges(), 1000)
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer)
  }

  enterFullScreen() {
    this.fullScreen.enter().catch(err => {
      console.error('Failed to enter fullscreen', err)
    })
  }
}
