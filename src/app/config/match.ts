import {config} from "./configuration";
import {Profile} from "./profile";
import {Teams} from "./teams";
import {Rounds} from "./rounds";
import {Guesses} from "./guesses";

export type MatchView = 'scoreboard' | 'slate' | 'guesses'

export class Match {
  private currentProfile!: Profile
  logo!: string
  round!: Rounds
  teams!: Teams
  guesses!: Guesses
  activeView: MatchView = 'scoreboard'

  constructor() {
    this.profile = config.profiles[0]
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
    this.round = new Rounds(this.currentProfile)
    this.teams = new Teams(this.currentProfile)
    this.guesses = new Guesses()
  }
}

export const match: Match = window.opener?.cszMatch || new Match()

// This is used to share match data between the booth view and live view
// @ts-ignore
window.cszMatch = match
