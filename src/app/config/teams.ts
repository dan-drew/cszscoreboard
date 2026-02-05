import {Team} from "./team";
import {Profile} from "./profile";
import {CacheOptions} from "./cache";

export class Teams {
  readonly right!: Team
  readonly left!: Team
  readonly optional!: Team

  constructor(profile: Profile, options: CacheOptions) {
    this.left = new Team({...profile.teams.left, type: 'left'}, options)
    this.right = new Team({...profile.teams.right, type: 'right'}, options)
    this.optional = new Team({...profile.teams.optional, type: 'optional'}, options)
  }

  get optionalEnabled() {
    return this.optional.enabled
  }

  set optionalEnabled(val: boolean) {
    this.optional.enabled = val
  }

  destroy() {
    this.left.destroy()
    this.right.destroy()
    this.optional.destroy()
  }
}
