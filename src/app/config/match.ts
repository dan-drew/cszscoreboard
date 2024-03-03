import {Profile, ProfileLogo} from "./profile";
import {Teams} from "./teams";
import {Rounds} from "./rounds";
import {Guesses} from "./guesses";
import {Provider} from "@angular/core";
import {Profiles} from "./profiles";
import {CacheOptions} from "./cache";
import {ThemeSlides} from "./theme-slides";
import {Cacheable} from "./cacheable";
import {Subscription} from "rxjs";
import {GuessingGame} from "./guessing-game";

export type MatchView = 'scoreboard' | 'slate' | 'guesses' | 'themes'

interface MatchCache {
  profileId: string
  activeView: MatchView
}

export class Match extends Cacheable<MatchCache, Profiles> {
  private _profiles!: Profiles
  private currentProfile!: Profile
  logo!: ProfileLogo
  social!: string
  round!: Rounds
  teams!: Teams
  guesses!: Guesses
  themeSlides!: ThemeSlides
  private _activeView: MatchView = 'slate'
  private guessesSubscription?: Subscription

  static get provider(): Provider {
    return {
      provide: Match,
      useFactory: (profiles: Profiles) => new Match(profiles, {useCache: true}),
      deps: [Profiles]
    }
  }

  constructor(profiles: Profiles, options?: CacheOptions) {
    super('match', options, profiles)
  }

  get profiles() {
    return this._profiles
  }

  get profile() {
    return this.currentProfile
  }

  set profile(val: Profile) {
    this.currentProfile = val
    this.reset()
  }

  get activeView() {
    return this._activeView
  }

  set activeView(value: MatchView) {
    if (value !== this._activeView) {
      this._activeView = value
      this.cache()
    }
  }

  get logoUrl() {
    return `/assets/logos/${this.logo}`
  }

  get winningTeam() {
    const result = this.teams.red.score - this.teams.blue.score

    if (result > 0) {
      return this.teams.red
    } else if (result < 0) {
      return this.teams.blue
    } else {
      return null
    }
  }

  get hasScore(): boolean {
    return this.teams.red.score > 0 || this.teams.blue.score > 0
  }

  // private get cached(): MatchCache {
  //   return Cache.get<MatchCache>('match', {})
  // }

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
    this.social = this.currentProfile.social || ''
    this.round?.destroy()
    this.round = new Rounds(this.currentProfile, options)
    this.teams?.destroy()
    this.teams = new Teams(this.currentProfile, options)
    this.guessesSubscription?.unsubscribe()
    this.guesses?.destroy()
    this.guesses = new Guesses(options)
    this.guessesSubscription = this.guesses.gameChanged.subscribe(game => this.onGuessesGameChanged(game))
    this.themeSlides?.destroy()
    this.themeSlides = new ThemeSlides(options)

    if (!options.useCache) {
      this.activeView = 'slate'
    }
  }

  toProfile({from, name}: { from?: Profile, name?: string }): Profile {
    return {
      id: from?.id || window.crypto.randomUUID(),
      name: name || from!.name,
      logo: this.logo,
      social: this.social,
      rounds: Array.from(this.round.names),
      teams: {
        blue: this.teams.blue.name,
        red: this.teams.red.name,
        optional: this.teams.optional.name
      }
    }
  }

  protected override construct(profiles: Profiles) {
    this._profiles = profiles
  }

  protected override init() {
    this.setProfile(this.profiles.profiles[0], {useCache: false})
  }

  protected override serialize(): MatchCache {
    return {
      profileId: this.profile.id,
      activeView: this.activeView
    }
  }

  protected override deserialize(data: MatchCache) {
    if (data.profileId !== this.profile?.id) {
      const profile = data.profileId ? this.profiles.find(data.profileId) : null
      this.setProfile(profile || this.profiles.profiles[0], {useCache: true})
    }

    this.activeView = data.activeView
  }

  private onGuessesGameChanged(game: GuessingGame | undefined) {
    if (!game && this.activeView === 'guesses') {
      this.activeView = 'slate'
    }
  }
}
