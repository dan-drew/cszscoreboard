import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {Match} from "../config/match";
import {Subscription} from "rxjs";
import {guessingGames} from "../config/guessing-game";

@Component({
  selector: 'app-guess-editor',
  templateUrl: './guess-editor.component.html',
  styleUrls: ['./guess-editor.component.scss'],
  host: {
    class: 'w-100 p-3 d-flex flex-column flex-nowrap'
  }
})
export class GuessEditorComponent implements OnInit, OnDestroy {
  public readonly games = guessingGames
  public readonly guesses = new FormArray<FormControl<string | null>>([])
  changeSubscription?: Subscription

  constructor(
    readonly match: Match
  ) {
    this.initForm()
  }

  ngOnInit() {
    this.changeSubscription = this.guesses.valueChanges.subscribe({
      next: value => this.onValueChange(value)
    })
  }

  ngOnDestroy() {
    if (this.changeSubscription) this.changeSubscription.unsubscribe()
  }

  get game() {
    return this.match.guesses.game
  }

  set game(val) {
    if (val !== this.game) {
      this.match.guesses.game = val
      this.initForm()
    }
  }

  addGuess(value: string = '') {
    if (this.guesses.length < this.match.guesses.maxAnswers) {
      this.guesses.push(new FormControl<string>(value))
    }
  }

  initForm() {
    this.guesses.clear({emitEvent: false})
    if (this.game) {
      this.match.guesses.answers.forEach(value => this.addGuess(value))
      this.addGuess()
    }
  }

  reset() {
    this.guesses.clear()
    this.match.guesses.reset()
  }

  onValueChange(values: (string | null)[]) {
    values.forEach((val, index) => {
      this.match.guesses.set(index, val || '')
    })
    while (this.match.guesses.count >= this.guesses.length && this.guesses.length < this.match.guesses.maxAnswers) {
      this.addGuess()
    }
  }
}
