import {GuessingGame} from "./guessing-game";
import {GuessAnswers} from "./guess-answers";

export class Guesses {
  public selected: number = 0
  private _game?: GuessingGame
  private requiredAnswers: number = 0

  answers?: GuessAnswers
  blue?: GuessAnswers
  red?: GuessAnswers

  get game() {
    return this._game
  }

  set game(val) {
    if (val !== this._game) {
      this._game = val
      this.selected = 0

      if (!val) {
        delete this.answers
        delete this.blue
        delete this.red
        this.requiredAnswers = 0
      } else if (val.vs === 'vs') {
        this.blue = new GuessAnswers(val)
        this.red = new GuessAnswers(val)
        this.requiredAnswers = val.required
      } else {
        this.answers = new GuessAnswers(val)
        this.requiredAnswers = val.required
      }
    }
  }

  get maxAnswers() {
    return this._game!.guesses.length
  }

  get changed() {
    return Math.max(
      this.answers?.changed || 0,
      this.blue?.changed || 0,
      this.red?.changed || 0
    )
  }

  reset() {
    this.game = undefined
  }
}
