import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Subscription} from "rxjs";

interface TimeInfo {
  clock?: Date
  timer?: number
}

@Component({
  selector: 'app-match-clock',
  templateUrl: './match-clock.component.html',
  styleUrls: ['./match-clock.component.scss'],
  host: {
    class: 'd-flex-row gap-3 text-nowrap'
  }
})
export class MatchClockComponent implements OnInit, OnDestroy {
  readonly timeInfo = new BehaviorSubject<TimeInfo>({clock: new Date()})

  private updateTimer?: Subscription

  ngOnInit() {
    this.startUpdates()
  }

  ngOnDestroy() {
    this.updateTimer?.unsubscribe()
  }

  private startUpdates() {
    this.updateTimer?.unsubscribe()
    this.updateTimer = interval(1000).subscribe(() => this.onUpdate())
  }

  private get timerValue() {
    return this.timeInfo.value.timer || 0
  }

  get timerClass() {
    if (this.timerValue > 20) {
      return []
    } else if (this.timerValue > 10) {
      return ['text-warning']
    } else {
      return ['text-danger']
    }
  }

  addTimer(value: number) {
    const newTimer = this.timerValue + value
    this.timeInfo.next({timer: newTimer})
    if (newTimer === value) this.startUpdates()
  }

  resetTimeInfo() {
    this.timeInfo.next({clock: new Date()})
  }

  div(num: number, div: number): number {
    return Math.floor(num / div)
  }

  private decrementTimer() {
    if (this.timerValue > 1) {
      this.timeInfo.next({timer: this.timerValue - 1})
      return true
    }
    return false
  }

  private onUpdate() {
    if (!this.decrementTimer()) {
      this.resetTimeInfo()
    }
  }
}
