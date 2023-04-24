import {Profile} from "./profile";
import {Teams} from "./teams";
import {Rounds} from "./rounds";
import {Guesses} from "./guesses";
import {Provider} from "@angular/core";
import {Profiles} from "./profiles";
import {Cache, CacheOptions} from "./cache";

export type MatchView = 'scoreboard' | 'slate' | 'guesses'

interface MatchCache {
  profileId?: string
  activeView?: MatchView
}

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
      // If there's a shared match then we're the TV instance. Otherwise
      // we're the Booth instance and should create the match and shared it.
      if (!(this._current = this.shared)) {
        this._current = new Match(profiles)
        this.shared = this._current
      }
    }

    return this._current!
  }

  // Get match shared by the Booth instance
  static get shared(): Match | undefined {
    return window.opener?.cszMatch
  }

  // Set match to be shared to the TV instance
  static set shared(match: Match | undefined) {
    // @ts-ignore
    window.cszMatch = match
  }

  constructor(readonly profiles: Profiles) {
    const profile = this.cached.profileId ? profiles.profiles.find(p => p.id === this.cached.profileId) : null
    this.setProfile(profile || profiles.profiles[0], {useCache: true})
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

  private get cached(): MatchCache {
    return Cache.get<MatchCache>('match', {})
  }

  setProfile(val: Profile, options: CacheOptions = {}) {
    this.currentProfile = val
    this.reset(options)
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

  reset(options: CacheOptions = {}) {
    this.logo = this.currentProfile.logo
    this.round = new Rounds(this.currentProfile)
    this.teams = new Teams(this.currentProfile, options)
    this.guesses = new Guesses(options)
    this.activeView = options.useCache && this.cached.activeView ||  'slate'
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

  cache() {
    Cache.set<MatchCache>('match', {
      profileId: this.profile.id,
      activeView: this.activeView
    })
    this.teams.cache()
    this.guesses.cache()
  }
}
