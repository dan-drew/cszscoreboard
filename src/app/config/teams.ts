import {Team} from "./team";
import {Profile} from "./profile";
import {Cache, CacheOptions} from "./cache";

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
  red: Team
  blue: Team
  optional: Team
  optionalEnabled: boolean = false

  constructor(profile: Profile, {useCache = false}: CacheOptions) {
    if (useCache && Cache.has('teams')) {
      const data = Cache.get<TeamCache>('teams')!
      this.blue = new Team(data.blue, 'blue')
      this.blue.score = data.blueScore
      this.red = new Team(data.red, 'red')
      this.red.score = data.redScore
      this.optionalEnabled = data.optionalEnabled
      this.optional = new Team(data.optional, 'optional')
      this.optional.score = data.optionalScore
    } else {
      this.blue = new Team(profile.teams.blue, 'blue')
      this.red = new Team(profile.teams.red, 'red')
      this.optional = new Team(profile.teams.optional, 'optional')
    }
  }

  cache() {
    Cache.set<TeamCache>('teams', {
      optional: this.optional.name,
      optionalScore: this.optional.score,
      optionalEnabled: this.optionalEnabled,
      blue: this.blue.name,
      blueScore: this.blue.score,
      red: this.red.name,
      redScore: this.red.score
    })
  }
}
