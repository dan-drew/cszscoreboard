export enum ProfileLogo {
  ComedySportz = 'comedysportz.png',
  MinorLeague =  'minorleague.png',
  RecLeague = 'recleague.png'
}

export enum TeamLogo {
  Snortyniners = 'snortyniners.png',
  Mirthquakes = 'mirthquakes.png'
}

export interface Profile {
  id: string
  name: string
  builtin?: boolean
  logo: ProfileLogo
  social?: string
  rounds: string[]
  teams: {
    blue: string
    blueLogp?: TeamLogo
    red: string
    redLogo?: TeamLogo
    optional: string
  }
  disableRoundFlyby?: boolean
  disableTeamFlyby?: boolean
}
