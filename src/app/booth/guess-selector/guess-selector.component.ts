import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../../config/match";
import {GuessAnswers} from "../../config/guess-answers";
import {GuessingService} from "../../guessing/guessing.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-guess-selector',
  templateUrl: './guess-selector.component.html',
  styleUrls: ['./guess-selector.component.scss'],
  host: {
    class: 'pt-2 mx-2'
  }
})
export class GuessSelectorComponent implements OnInit, OnDestroy {
  private static INPUT_NODE_NAMES = ['INPUT', 'SELECT', 'TEXTAREA']

  private eventSubscription?: Subscription

  constructor(
    readonly match: Match,
    readonly guessing: GuessingService
  ) {
  }

  @HostBinding('class.invisible')
  get invisible() {
    return !this.guessing.enabled
  }

  ngOnInit() {
    this.eventSubscription = fromEvent<KeyboardEvent>(window, 'keyup').subscribe($event => this.onKey($event))
  }

  ngOnDestroy() {
    this.eventSubscription?.unsubscribe()
  }

  private onKey($event: KeyboardEvent) {
    if (this.handleKeyEvent($event)) {
      switch($event.key) {
        case 'ArrowLeft':
          this.guessing.previous()
          $event.stopImmediatePropagation()
          break

        case 'ArrowRight':
          this.guessing.next()
          $event.stopImmediatePropagation()
          break
      }
    }
  }

  private handleKeyEvent($event: KeyboardEvent) {
    return this.match.activeView === 'guesses'
      && GuessSelectorComponent.INPUT_NODE_NAMES.indexOf(($event.target as HTMLElement).nodeName) < 0
  }
}
