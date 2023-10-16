import {Cacheable} from "./cacheable";
import {CacheOptions} from "./cache";

export type TeamType = 'blue' | 'red' | 'optional'

interface TeamCache {
  name: string
  score: number
  enabled: boolean
}

export class Team extends Cacheable<TeamCache, string> {
  private _name!: string
  private _score!: number
  private _enabled!: boolean

  constructor(name: string, public readonly type: TeamType, options?: CacheOptions) {
    super(`team-${type}`, options, name)
  }

  get name() {
    return this._name
  }

  set name(val: string) {
    this._name = val
    this.cache()
  }

  get score() {
    return this._score
  }

  set score(val: number) {
    this._score = val
    this.cache()
  }

  get enabled() {
    return this.type !== 'optional' || this._enabled
  }

  set enabled(val: boolean) {
    if (this.type === 'optional' && val !== this._enabled) {
      this._enabled = val
      this.cache()
    }
  }

  protected override construct(_data?: string) {
    this._enabled = false
  }

  protected override init(data: string) {
    this._name = data
    this._score = 0
  }

  protected override serialize(): TeamCache {
    return {
      name: this._name,
      score: this._score,
      enabled: this._enabled
    }
  }

  protected override deserialize(data: TeamCache) {
    this._name = data.name
    this._score = data.score
    this._enabled = data.enabled
  }
}
