import {Team} from "./team";
import {Profile} from "./profile";
import {Cache, CacheOptions} from "./cache";
import {Cacheable} from "./cacheable";
import {Profiles} from "./profiles";

interface TeamCache {
  optional: string
  optionalScore: number
  optionalEnabled: boolean
  blue: string
  blueScore: number
  red: string
  redScore: number
}

export class Teams extends Cacheable<TeamCache, Profile> {
  red!: Team
  blue!: Team
  optional!: Team
  optionalEnabled: boolean = false

  constructor(profile: Profile, options: CacheOptions) {
    super('teams', options, profile)
  }

  protected override init(data: any) {
    const profile = data as Profile
    this.blue = new Team(profile.teams.blue, 'blue')
    this.red = new Team(profile.teams.red, 'red')
    this.optional = new Team(profile.teams.optional, 'optional')
  }

  protected override serialize(): TeamCache {
    return {
      optional: this.optional.name,
      optionalScore: this.optional.score,
      optionalEnabled: this.optionalEnabled,
      blue: this.blue.name,
      blueScore: this.blue.score,
      red: this.red.name,
      redScore: this.red.score
    }
  }

  protected override deserialize(data: TeamCache) {
    this.blue = new Team(data.blue, 'blue')
    this.blue.score = data.blueScore
    this.red = new Team(data.red, 'red')
    this.red.score = data.redScore
    this.optionalEnabled = data.optionalEnabled
    this.optional = new Team(data.optional, 'optional')
    this.optional.score = data.optionalScore
  }
}
