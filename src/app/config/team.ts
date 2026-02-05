import {Cacheable} from "./cacheable";
import {CacheOptions} from "./cache";
import {ProfileTeam, TeamLogo} from "./profile";

export type TeamType = 'left' | 'right' | 'optional'

interface TeamCache extends ProfileTeam {
  score: number
  enabled: boolean
}

interface TeamConstruct extends ProfileTeam {
  type: TeamType
}

export class Team extends Cacheable<TeamCache, TeamConstruct> {
  public readonly type: TeamType
  private _name!: string
  private _score!: number
  private _enabled!: boolean
  private _logo?: TeamLogo
  private _color!: string
  private _textColor!: string

  constructor(info: TeamConstruct, options?: CacheOptions) {
    super(`team-${info.type}`, options, info)
    this.type = info.type
  }

  get name() {
    return this._name
  }

  set name(val: string) {
    this._name = val
    this.cache()
  }

  get hasLogo() {
    return !!this._logo
  }

  get logo(): TeamLogo | string | undefined {
    return this._logo
  }

  set logo(value: TeamLogo | string | undefined) {
    this._logo = value as TeamLogo
    this.cache()
  }

  get logoPath() {
    return `assets/logos/${this._logo}`
  }

  get color() {
    return this._color
  }

  set color(val: string) {
    this._color = val
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

  toProfileTeam(): ProfileTeam {
    return {
      name: this._name,
      logo: this._logo,
      color: this._color,
      textColor: this._textColor
    }
  }

  protected override construct(_data?: TeamConstruct) {
    this._enabled = false
  }

  protected override init(data: TeamConstruct) {
    this._name = data.name
    this._logo = data.logo
    this._score = 0
    this._color = data.color
    this._textColor = data.textColor
  }

  protected override serialize(): TeamCache {
    return {
      ...this.toProfileTeam(),
      score: this._score,
      enabled: this._enabled
    }
  }

  protected override deserialize(data: TeamCache) {
    this._name = data.name
    this._score = data.score
    this._enabled = data.enabled
    this._logo = data.logo
    this._color = data.color
    this._textColor = data.textColor
  }
}
