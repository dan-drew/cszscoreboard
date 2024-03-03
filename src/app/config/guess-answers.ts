import {GuessingGame} from "./guessing-game";
import {Cacheable} from "./cacheable";
import {CacheOptions} from "./cache";

type GuessAnswerType = 'blue' | 'red' | 'all'

interface GuessAnswerCache {
  answers: string[]
}

export class GuessAnswers extends Cacheable<GuessAnswerCache, GuessingGame>{
  private answers!: string[]
  private required!: number
  private game!: GuessingGame
  private _changed: number = Date.now()
  private _normalized!: string[]
  private _used!: number

  constructor(name: GuessAnswerType, game: GuessingGame, options?: CacheOptions) {
    super(`guess-${name}`, options, game)
  }

  get guessesChanged() {
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
    this.cache()
  }

  protected override construct(game: GuessingGame) {
    this.game = game
    this.required = this.game.required
    this.answers = []

    for (let i = 0; i < this.game.guesses.length; i++) {
      this.answers.push('')
    }
  }

  protected override init(data?: GuessingGame) {
    this.normalize()
  }

  protected override serialize(): GuessAnswerCache {
    return {
      answers: this._normalized
    }
  }

  protected override deserialize(data: GuessAnswerCache) {
    this.setAll(data.answers)
  }
}
