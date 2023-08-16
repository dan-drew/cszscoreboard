import {Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../../config/match";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-theme-slide-selector',
  templateUrl: './theme-slide-selector.component.html',
  styleUrls: ['./theme-slide-selector.component.scss'],
  host: {
    class: 'py-2 mx-2'
  }
})
export class ThemeSlideSelectorComponent implements OnInit, OnDestroy {
  private static INPUT_NODE_NAMES = ['INPUT', 'SELECT', 'TEXTAREA']

  private eventSubscription?: Subscription

  constructor(
    readonly match: Match
  ) {
  }

  ngOnInit() {
    this.eventSubscription = fromEvent<KeyboardEvent>(window, 'keyup').subscribe($event => this.onKey($event))
  }

  ngOnDestroy() {
    this.eventSubscription?.unsubscribe()
  }

  get slides() {
    return this.match.themeSlides
  }

  private onKey($event: KeyboardEvent) {
    if (this.handleKeyEvent($event)) {
      switch($event.key) {
        case 'ArrowLeft':
          this.slides.previous()
          $event.stopImmediatePropagation()
          break

        case 'ArrowRight':
          this.slides.next()
          $event.stopImmediatePropagation()
          break
      }
    }
  }

  private handleKeyEvent($event: KeyboardEvent) {
    return this.match.activeView === 'themes'
      && ThemeSlideSelectorComponent.INPUT_NODE_NAMES.indexOf(($event.target as HTMLElement).nodeName) < 0
  }
}
