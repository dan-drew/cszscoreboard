import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Guess} from "../../config/guessing-game";
import {GuessAnswers} from "../../config/guess-answers";
import {FormArray, FormControl} from "@angular/forms";
import {GuessingService} from "../../guessing/guessing.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-guess-answers-form',
  templateUrl: './guess-answers-form.component.html'
})
export class GuessAnswersFormComponent implements OnInit, OnDestroy {
  @Input() guesses!: Guess[]
  @Input() answers!: GuessAnswers

  readonly form = new FormArray<FormControl<string | null>>([])
  private changeSubscription?: Subscription

  constructor(
    private readonly guessing: GuessingService
  ) {
  }

  ngOnInit() {
    this.initForm()
  }

  ngOnDestroy() {
    this.changeSubscription?.unsubscribe()
  }

  initForm() {
    this.changeSubscription?.unsubscribe()
    delete this.changeSubscription

    this.form.clear({emitEvent: false})
    this.answers.value.forEach(value => this.addGuess(value))
    this.setGuessCount(this.answers.used + 1)

    this.changeSubscription = this.form.valueChanges.subscribe(values => this.onValueChange(values))
  }

  reset() {
    this.form.reset()
    this.guessing.guesses.reset()
  }

  private addGuess(value: string = ''): boolean {
    if (this.form.length < this.guessing.guesses.maxAnswers) {
      this.form.push(new FormControl<string>(value))
      return true
    }

    return false
  }

  private onValueChange(values: (string | null)[]) {
    values.forEach((val, index) => {
      this.answers.set(index, val || '')
    })

    this.setGuessCount(this.answers.count + 1)
  }

  private setGuessCount(count: number) {
    count = Math.max(count, this.guessing.game.required)
    while (this.form.length < count && this.addGuess()) {}
  }
}
