import {Profile} from "./profile";

export class Configuration {
  profiles: Profile[] = []
}

const STANDARD_ROUNDS: string[] = [
  'Opening',
  'Choice',
  'Ref\'s Option',
  'Catch Up'
]

export const config: Configuration = {
  profiles: [
    {
      name: 'ComedySportz',
      logo: 'comedysportz.png',
      rounds: STANDARD_ROUNDS,
      teams: {
        blue: 'Laughletics',
        red: 'San Jose Snarks',
        optional: 'Alyssa'
      }
    },
    {
      name: 'Minor League',
      logo: 'minorleague.png',
      rounds: STANDARD_ROUNDS,
      teams: {
        blue: 'ML Blue',
        red: 'ML Red',
        optional: 'Alyssa'
      }
    }
  ]
}
