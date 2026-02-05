import {Injectable, signal} from "@angular/core";
import {Profile, ProfileLogo, TeamLogo} from "./profile";
import {builtinProfiles} from "./builtin-profiles";

@Injectable({providedIn: 'root'})
export class Profiles {
  readonly profiles = signal<Profile[]>([])

  readonly logos: ProfileLogo[] = [
    ProfileLogo.ComedySportz,
    ProfileLogo.MinorLeague,
    ProfileLogo.RecLeague,
    ProfileLogo.WryVsDry,
  ]

  readonly teamLogos: TeamLogo[] = [
    TeamLogo.Mirthquakes,
    TeamLogo.Snortyniners
  ]

  private readonly builtin = builtinProfiles

  constructor() {
    this.loadAll()
  }

  find(id: string) {
    return this.profiles().find(p => p.id === id)
  }

  update(profile: Profile): Profile {
    const index = this.profiles().findIndex(p => p.id === profile.id)
    if (index < 0) {
      this.profiles.update(val => [...val, profile])
    } else {
      profile = Object.assign(this.profiles()[index], profile)
      this.profiles.update(val => [...val.slice(0, index), profile, ...val.slice(index + 1)])
    }
    this.saveAll()
    return profile
  }

  delete(profile: Profile) {
    const index = this.profiles().findIndex(p => p.id === profile.id)
    if (index >= 0) {
      this.profiles.update(val => val.splice(index, 1))
      this.saveAll()
    }
  }

  private loadAll() {
    const sources: string[] = [JSON.stringify(this.builtin)]
    let loaded = this.storage.getItem('profiles')

    if (loaded) {
      sources.push(loaded)
    }

    // Merge built-in profiles and custom profiles, trash any legacy saved profiles
    // that duplicate built-in profiles.
    const usedIds = new Set<string>()
    this.profiles.set(sources.map(s => {
      return (JSON.parse(s) as Profile[]).filter(p => {
        if (usedIds.has(p.id)) return false
        usedIds.add(p.id)
        return true
      })
    }).flat())
  }

  private saveAll() {
    this.storage.setItem('profiles', JSON.stringify(this.profiles().filter(p => !p.builtin)))
  }

  private get storage() {
    return window.localStorage
  }
}
