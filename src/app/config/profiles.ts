import {Injectable} from "@angular/core";
import {Profile} from "./profile";
import {Rounds} from "./rounds";

@Injectable({providedIn: 'root'})
export class Profiles {
  profiles!: Profile[]

  readonly logos: string[] = [
    'comedysportz.png',
    'minorleague.png'
  ]

  private readonly default: Profile[] = [
    {
      id: window.crypto.randomUUID(),
      name: 'ComedySportz',
      logo: 'comedysportz.png',
      rounds: Rounds.default,
      teams: {
        blue: 'Laughletics',
        red: 'San Jose Snarks',
        optional: 'Alyssa'
      }
    },
    {
      id: window.crypto.randomUUID(),
      name: 'Minor League',
      logo: 'minorleague.png',
      rounds: Rounds.default,
      teams: {
        blue: 'ML Blue',
        red: 'ML Red',
        optional: 'Alyssa'
      }
    }

  ]

  constructor() {
    this.loadAll()
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
    let loaded = this.storage.getItem('profiles')
    if (!loaded) {
      // Make a copy via JSON
      loaded = JSON.stringify(this.default)
    }
    this.profiles = JSON.parse(loaded)
  }

  private saveAll() {
    this.storage.setItem('profiles', JSON.stringify(this.profiles))
  }

  private get storage() {
    return window.localStorage
  }
}
