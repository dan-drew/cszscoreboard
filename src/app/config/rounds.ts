import {Profile} from "./profile";
import {EventEmitter} from "@angular/core";
import {BehaviorSubject, map, mapTo, zip} from "rxjs";
import {Cacheable} from "./cacheable";
import {CacheOptions} from "./cache";

interface RoundsCache {
  current: number
  names: string[]
}

export class Rounds extends Cacheable<RoundsCache> {
  static readonly default: string[] = [
    'Opening',
    'Choice',
    'Ref\'s Option',
    'Catch Up',
    'Half Time',
    'Head-to-Head',
    'Challenge',
    'Last Chance',
    'Finale'
  ]

  private _names!: string[]
  private _current!: BehaviorSubject<number>
  readonly namesChange = new EventEmitter<void>()
  readonly currentName = this.current.pipe(
    map(value => {
      return this._names[value]
    })
  )

  constructor(profile: Profile, options: CacheOptions) {
    super('rounds', options, profile)
  }

  get current() {
    return this._current.asObservable()
  }

  get currentValue() {
    return this._current.value
  }

  setCurrent(val: number, cache = true) {
    this._current.next(val)
    this.cache()
  }

  get names() {
    return this._names
  }

  set names(val) {
    this._names = val
    this.namesChange?.emit()
    this.cache()
  }

  get count() {
    return this.names.length
  }

  protected override construct() {
    this._current = new BehaviorSubject<number>(0)
    this._names = []
  }

  protected override init(data?: any) {
    const profile = data as Profile
    this._names = Array.from(profile.rounds)
  }

  protected override serialize(): RoundsCache {
    return {
      current: this.currentValue,
      names: this._names
    }
  }

  protected override deserialize(data: RoundsCache) {
    if (data.names.join() !== this._names.join()) {
      this.names = data.names
    }
    if (this.currentValue !== data.current) {
      this.setCurrent(data.current, false)
    }
  }
}
