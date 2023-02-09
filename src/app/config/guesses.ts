import {GuessingGame} from "./guessing-game";

export class Guesses {
  public selected: number = 0
  private _game?: GuessingGame
  private _answers: string[] = []
  private requiredAnswers: number = 0

  get game() {
    return this._game
  }

  set game(val) {
    if (val !== this._game) {
      this._game = val
      this.selected = 0
      if (val) {
        this._answers = new Array<string>(val.answers.length)
        this.requiredAnswers = this._game!.answers.filter(a => a.optional !== true).length
      } else {
        this._answers = []
        this.requiredAnswers = 0
      }
    }
  }

  get maxAnswers() {
    return this._game!.answers.length
  }

  get answers(): string[] {
    return this._answers.filter((val, index) => {
      return (index < this.requiredAnswers) || (val.length > 0)
    })
  }

  set(index: number, value: string) {
    this._answers[index] = value.trim()
  }

  get count() {
    return this.answers.length
  }

  move(from: number, to: number) {
    this._answers.splice(to, 0, this._answers[from])
    this._answers.splice(from > to ? from + 1 : from, 1)
  }

  reset() {
    this.game = undefined
  }
}
