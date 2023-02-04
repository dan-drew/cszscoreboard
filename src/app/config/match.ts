import {Profile} from "./profile";
import {Teams} from "./teams";
import {Rounds} from "./rounds";
import {Guesses} from "./guesses";
import {Provider} from "@angular/core";
import {Profiles} from "./profiles";

export type MatchView = 'scoreboard' | 'slate' | 'guesses'

export class Match {
  static _current?: Match

  private currentProfile!: Profile
  logo!: string
  round!: Rounds
  teams!: Teams
  guesses!: Guesses
  activeView: MatchView = 'scoreboard'

  static get provider(): Provider {
    return {
      provide: Match,
      useFactory: (profiles: Profiles) => Match.current(profiles),
      deps: [Profiles]
    }
  }

  static current(profiles: Profiles): Match {
    if (!this._current) {
      this._current = window.opener?.cszMatch || new Match(profiles)

      // This is used to share match data between the booth view and live view
      // @ts-ignore
      window.cszMatch = this._current
    }

    return this._current!
  }

  constructor(readonly profiles: Profiles) {
    this.profile = profiles.profiles[0]
  }

  get profile() {
    return this.currentProfile
  }

  set profile(val: Profile) {
    this.currentProfile = val
    this.reset()
  }

  get logoUrl() {
    return `/assets/logos/${this.logo}`
  }

  // Save match settings to profile
  save() {
    this.profiles.update(this.toProfile({from: this.currentProfile}))
  }

  saveAs(name: string) {
    // Bypass setter so we don't reset
    this.currentProfile = this.profiles.update(this.toProfile({name}))
  }

  delete() {
    this.profiles.delete(this.currentProfile)
    this.profile = this.profiles.profiles[0]
  }

  reset() {
    this.logo = this.currentProfile.logo
    this.round = new Rounds(this.currentProfile)
    this.teams = new Teams(this.currentProfile)
    this.guesses = new Guesses()
    this.activeView = 'scoreboard'
  }

  toProfile({from, name}: { from?: Profile, name?: string }): Profile {
    return {
      id: from?.id || window.crypto.randomUUID(),
      name: name || from!.name,
      logo: this.logo,
      rounds: Array.from(this.round.names),
      teams: {
        blue: this.teams.blue.name,
        red: this.teams.red.name,
        optional: this.teams.optional.name
      }
    }
  }
}
