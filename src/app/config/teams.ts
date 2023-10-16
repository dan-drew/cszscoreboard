import {Team} from "./team";
import {Profile} from "./profile";
import {CacheOptions} from "./cache";

interface TeamCache {
  optional: string
  optionalScore: number
  optionalEnabled: boolean
  blue: string
  blueScore: number
  red: string
  redScore: number
}

export class Teams {
  readonly red!: Team
  readonly blue!: Team
  readonly optional!: Team

  constructor(profile: Profile, options: CacheOptions) {
    this.blue = new Team(profile.teams.blue, 'blue', options)
    this.red = new Team(profile.teams.red, 'red', options)
    this.optional = new Team(profile.teams.optional, 'optional', options)
  }

  get optionalEnabled() {
    return this.optional.enabled
  }

  set optionalEnabled(val: boolean) {
    this.optional.enabled = val
  }

  destroy() {
    this.blue.destroy()
    this.red.destroy()
    this.optional.destroy()
  }
}
