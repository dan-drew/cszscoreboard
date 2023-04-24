import {GuessingGame} from "./guessing-game";

export class GuessAnswers {
  private readonly answers: string[] = []
  private readonly required: number
  private _changed: number = Date.now()
  private _normalized: string[] = []
  private _used: number = 0

  constructor(private readonly game: GuessingGame) {
    this.required = this.game.required

    for (let i = 0; i < this.game.guesses.length; i++) {
      this.answers.push('')
    }

    this.normalize()
  }

  get changed() {
    return this._changed
  }

  get value() {
    return this._normalized
  }

  set(index: number, value: string) {
    this.answers[index] = value.trim()
    this.normalize()
    this._changed = Date.now()
  }

  setAll(values: string[]) {
    this.answers.splice(0, this.answers.length, ...values)
    this.normalize()
    this._changed = Date.now()
  }

  // Return the number of guesses based on minimum required
  // and what's been entered by the user
  get count() {
    return this._normalized.length
  }

  // Get the number of guesses based on what's been entered by the user.
  // This can be less than the minimum including 0.
  get used() {
    return this._used
  }

  at(index: number) {
    return this._normalized[index]
  }

  private normalize() {
    let used = 0
    this._normalized = this.answers.filter((val, index) => {
      if (val.length > 0) {
        used = index + 1
        return true
      }
      return index < this.required
    })
    this._used = used
  }
}
