import {Team} from "./team";
import {Profile} from "./profile";

export class Teams {
  red: Team
  blue: Team
  optional: Team
  optionalEnabled: boolean = false

  constructor(profile: Profile) {
    this.blue = new Team(profile.teams.blue, 'blue')
    this.red = new Team(profile.teams.red, 'red')
    this.optional = new Team(profile.teams.optional, 'optional')
  }
}
