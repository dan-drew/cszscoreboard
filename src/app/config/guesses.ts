import {GuessingGame} from "./guessing-game";
import {GuessAnswers} from "./guess-answers";
import {Cache, CacheOptions} from "./cache";
import {guessingGames} from "./guessing-games";

interface GuessesCache {
  gameId?: string
  answers?: string[]
  blueAnswers?: string[]
  redAnswers?: string[]
  selected: number
}

export class Guesses {
  public selected: number = 0
  private _game?: GuessingGame
  private requiredAnswers: number = 0

  answers?: GuessAnswers
  blue?: GuessAnswers
  red?: GuessAnswers

  constructor({useCache = false}: CacheOptions = {}) {
    if (useCache && this.cached) this.fromCache()
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

  cache() {
    Cache.set<GuessesCache>('guesses', {
      gameId: this._game?.id,
      answers: this.answers?.value,
      blueAnswers: this.blue?.value,
      redAnswers: this.red?.value,
      selected: this.selected
    })
  }

  private fromCache() {
    if (this.cached.gameId) {
      const game = guessingGames.find(g => g.id === this.cached.gameId)
      if (game) {
        this.game = game
        this.selected = this.cached.selected
        if (this.answers && this.cached.answers) this.answers.setAll(this.cached.answers)
        if (this.blue && this.cached.blueAnswers) this.blue.setAll(this.cached.blueAnswers)
        if (this.red && this.cached.redAnswers) this.red.setAll(this.cached.redAnswers)
      }
    }
  }

  private get cached(): GuessesCache {
    return Cache.get<GuessesCache>('guesses', {selected: 0})
  }
}
