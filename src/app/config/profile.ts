export enum ProfileLogo {
  ComedySportz = 'comedysportz.png',
  MinorLeague =  'minorleague.png',
  RecLeague = 'recleague.png',
  WryVsDry = 'wry-vs-dry.png'
}

export enum TeamLogo {
  Snortyniners = 'snortyniners.png',
  Mirthquakes = 'mirthquakes.png'
}

export interface ProfileTeam {
  name: string
  logo?: TeamLogo
  color: string
  textColor: string
}

export interface Profile {
  id: string
  name: string
  builtin?: boolean
  logo: ProfileLogo,
  logoShadow?: boolean,
  social?: string
  rounds: string[] | null
  teams: {
    left: ProfileTeam
    right: ProfileTeam
    optional: ProfileTeam
  }
  disableRoundFlyby?: boolean
  disableTeamFlyby?: boolean
}
