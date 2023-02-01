import {Profile} from "./profile";

export class Rounds {
  names: string[]
  current: number = 0

  constructor(profile: Profile) {
    this.names = Array.from(profile.rounds)
  }

  get count() {
    return this.names.length
  }
}
