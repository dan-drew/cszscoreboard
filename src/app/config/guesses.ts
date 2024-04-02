import {GuessingGame} from "./guessing-game";
import {GuessAnswers} from "./guess-answers";
import {CacheOptions} from "./cache";
import {guessingGames} from "./guessing-games";
import {Cacheable} from "./cacheable";
import {EventEmitter} from "@angular/core";

interface GuessesCache {
  gameId?: string
  selected: number
}

export class Guesses extends Cacheable<GuessesCache> {
  private _selected!: number
  private _game?: GuessingGame
  private gameChangedEvent!: EventEmitter<GuessingGame | undefined>

  answers?: GuessAnswers
  blue?: GuessAnswers
  red?: GuessAnswers

  constructor(options: CacheOptions = {}) {
    super('guesses', options)
  }

  get selected(): number {
    return this._selected;
  }

  set selected(value: number) {
    this._selected = value;
    this.cache()
  }

  get game() {
    return this._game
  }

  set game(val) {
    this.setGame(val)
  }

  get maxAnswers() {
    return this._game!.guesses.length
  }

  get guessesChanged() {
    return Math.max(
      this.answers?.guessesChanged || 0,
      this.blue?.guessesChanged || 0,
      this.red?.guessesChanged || 0
    )
  }

  get gameChanged() {
    return this.gameChangedEvent.asObservable()
  }

  reset() {
    this.game = undefined
  }

  protected override construct(_data?: any) {
    this._selected = 0
    this.gameChangedEvent = new EventEmitter<GuessingGame | undefined>()
  }

  protected override init(_data?: any) {
  }

  protected override serialize(): GuessesCache {
    this.answers?.save()
    this.blue?.save()
    this.red?.save()

    return {
      gameId: this._game?.id,
      selected: this._selected
    }
  }

  protected override deserialize(data: GuessesCache) {
    if (data.gameId) {
      const game = guessingGames.find(g => g.id === data.gameId)
      if (game) {
        this.setGame(game, { useCache: true })
        this._selected = data.selected
      }
    }
  }

  private setGame(val: GuessingGame | undefined, options: CacheOptions = {}) {
    if (val !== this._game) {
      this._game = val
      this._selected = 0

      this.blue?.destroy()
      this.red?.destroy()
      this.answers?.destroy()

      if (!val) {
        delete this.answers
        delete this.blue
        delete this.red
      } else if (val.vs === 'vs') {
        this.blue = new GuessAnswers('blue', val, options)
        this.red = new GuessAnswers('red', val, options)
      } else {
        this.answers = new GuessAnswers('all', val, options)
      }

      this.cache()
      this.gameChangedEvent.emit(val)
    }
  }
}
