import {Injectable} from "@angular/core";
import {Profile, ProfileLogo, TeamLogo} from "./profile";
import {Rounds} from "./rounds";

@Injectable({providedIn: 'root'})
export class Profiles {
  profiles!: Profile[]

  readonly logos: ProfileLogo[] = [
    ProfileLogo.ComedySportz,
    ProfileLogo.MinorLeague,
    ProfileLogo.RecLeague
  ]

  readonly teamLogos: TeamLogo[] = [
    TeamLogo.Mirthquakes,
    TeamLogo.Snortyniners
  ]

  private readonly builtin: Profile[] = [
    {
      id: 'csz-main',
      name: 'ComedySportz',
      builtin: true,
      logo: ProfileLogo.ComedySportz,
      social: '(FB)(IG)(TW) @cszsanjose',
      rounds: Rounds.default,
      teams: {
        blue: 'Snarks',
        red: 'Laughletics',
        optional: 'Alyssa'
      }
    },
    {
      id: 'csz-minorleague',
      name: 'Minor League',
      builtin: true,
      logo: ProfileLogo.MinorLeague,
      social: '(FB)(IG) @cszminorleaguesj',
      rounds: Rounds.default,
      teams: {
        blue: 'Snortyniners',
        blueLogp: TeamLogo.Snortyniners,
        red: 'Mirthquakes',
        redLogo: TeamLogo.Mirthquakes,
        optional: 'George'
      }
    },
    {
      id: 'csz-recleague',
      name: 'Rec League',
      builtin: true,
      logo: ProfileLogo.RecLeague,
      // social: '(FB)(IG) @cszminorleaguesj',
      rounds: Rounds.default,
      teams: {
        blue: 'Blue',
        red: 'Red',
        optional: 'Name'
      }
    }
  ]

  constructor() {
    this.loadAll()
  }

  find(id: string) {
    return this.profiles.find(p => p.id === id)
  }

  update(profile: Profile): Profile {
    const index = this.profiles.findIndex(p => p.id === profile.id)
    if (index < 0) {
      this.profiles.push(profile)
    } else {
      profile = Object.assign(this.profiles[index], profile)
    }
    this.saveAll()
    return profile
  }

  delete(profile: Profile) {
    const index = this.profiles.findIndex(p => p.id === profile.id)
    if (index >= 0) {
      this.profiles.splice(index, 1)
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
    this.profiles = sources.map(s => {
      return (JSON.parse(s) as Profile[]).filter(p => {
        if (usedIds.has(p.id)) return false
        usedIds.add(p.id)
        return true
      })
    }).flat()
  }

  private saveAll() {
    this.storage.setItem('profiles', JSON.stringify(this.profiles.filter(p => !p.builtin)))
  }

  private get storage() {
    return window.localStorage
  }
}
