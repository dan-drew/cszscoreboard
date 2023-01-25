import {config} from "./configuration";
import {Profile} from "./profile";
import {Team} from "./team";

export class Match {
  private currentProfile: Profile = config.profiles[0]
  logo: string = ''
  rounds: string[] = []
  currentRound: number = 0
  blueTeam?: Team
  redTeam?: Team
  optionalTeam?: Team
  optionalTeamEnabled: boolean = false
  activeView: 'scoreboard' | 'slate' = 'slate'

  constructor() {
    this.reset()
  }

  get profile() {
    return this.currentProfile
  }

  set profile(val: Profile) {
    this.currentProfile = val
    this.reset()
  }

  reset() {
    this.logo = this.currentProfile.logo
    this.rounds = Array.from(this.currentProfile.rounds)
    this.blueTeam = new Team(this.currentProfile.teams.blue, 'blue')
    this.redTeam = new Team(this.currentProfile.teams.red, 'red')
    this.optionalTeam = new Team(this.currentProfile.teams.optional, 'optional')
    this.optionalTeamEnabled = false
    this.currentRound = 0
  }
}

export const match: Match = window.opener?.cszMatch || new Match()

// This is used to share match data between the booth view and live view
// @ts-ignore
window.cszMatch = match
