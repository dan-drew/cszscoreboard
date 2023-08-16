import {GuessingGame} from "./guessing-game";
import {GuessAnswers} from "./guess-answers";
import {CacheOptions} from "./cache";
import {guessingGames} from "./guessing-games";
import {Cacheable} from "./cacheable";

interface GuessesCache {
  gameId?: string
  answers?: string[]
  blueAnswers?: string[]
  redAnswers?: string[]
  selected: number
}

export class Guesses extends Cacheable<GuessesCache> {
  public selected: number = 0
  private _game?: GuessingGame
  private requiredAnswers: number = 0

  answers?: GuessAnswers
  blue?: GuessAnswers
  red?: GuessAnswers

  constructor(options: CacheOptions = {}) {
    super('guesses', options)
  }

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

  protected override init(data?: any) {
  }

  protected override serialize(): GuessesCache {
    return {
      gameId: this._game?.id,
      answers: this.answers?.value,
      blueAnswers: this.blue?.value,
      redAnswers: this.red?.value,
      selected: this.selected
    }
  }

  protected override deserialize(data: GuessesCache) {
    if (data.gameId) {
      const game = guessingGames.find(g => g.id === data.gameId)
      if (game) {
        this.game = game
        this.selected = data.selected
        if (this.answers && data.answers) this.answers.setAll(data.answers)
        if (this.blue && data.blueAnswers) this.blue.setAll(data.blueAnswers)
        if (this.red && data.redAnswers) this.red.setAll(data.redAnswers)
      }
    }
  }
}
