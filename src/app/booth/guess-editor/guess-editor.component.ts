import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Match} from "../../config/match";
import {guessingGames} from "../../config/guessing-games";
import {GuessAnswersFormComponent} from "../guess-answers-form/guess-answers-form.component";

@Component({
  selector: 'app-guess-editor',
  templateUrl: './guess-editor.component.html',
  styleUrls: ['./guess-editor.component.scss'],
  host: {
    class: 'w-100 p-3 d-flex-column gap-3 overflow-hidden'
  }
})
export class GuessEditorComponent implements OnInit, OnDestroy {
  public readonly games = guessingGames

  @ViewChild('blue') private blueAnswers?: GuessAnswersFormComponent
  @ViewChild('red') private redAnswers?: GuessAnswersFormComponent
  @ViewChild('answers') private answers?: GuessAnswersFormComponent

  constructor(
    readonly match: Match
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  get game() {
    return this.match.guesses.game
  }

  set game(val) {
    if (val !== this.game) {
      this.match.guesses.game = val
      this.blueAnswers?.initForm()
      this.redAnswers?.initForm()
      this.answers?.initForm()
    }
  }

  reset() {
    this.blueAnswers?.reset()
    this.redAnswers?.reset()
    this.answers?.reset()
    this.match.guesses.reset()
  }
}
