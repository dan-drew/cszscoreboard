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
    this.blue = new Team({name: profile.teams.blue, type: 'blue', logo: profile.teams.blueLogp}, options)
    this.red = new Team({name: profile.teams.red, type: 'red', logo: profile.teams.redLogo}, options)
    this.optional = new Team({name: profile.teams.optional, type: 'optional'}, options)
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
