import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../config/match";

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'position-relative'
  }
})
export class LiveViewComponent implements OnInit, OnDestroy {
  private timer?: any

  constructor(
    public match: Match,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.timer = setInterval(() => this.changeDetector.detectChanges(), 1000)
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer)
  }
}
