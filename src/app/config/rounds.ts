import {Profile} from "./profile";

export class Rounds {
  static readonly default: string[] = [
    'Opening',
    'Choice',
    'Ref\'s Option',
    'Catch Up',
    'Half Time',
    'Head-to-Head',
    'Challenge',
    'Last Chance',
    'Finale'
  ]

  names: string[]
  current: number = 0

  constructor(profile: Profile) {
    this.names = Array.from(profile.rounds)
  }

  get count() {
    return this.names.length
  }
}
