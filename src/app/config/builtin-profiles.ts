import {Profile, ProfileLogo, TeamLogo} from "./profile";
import {Rounds} from "./rounds";

const black = '#000000'
const white = '#ffffff'
const cszBlue = '#0b4d82'
const cszRed = '#9a1b20'
const defaultTextColor = white
const defaultOptionalColor = '#ffee00'
const defaultOptionalTextColor = black

function profile(
  id: string,
  name: string,
  logo: ProfileLogo,
  leftName: string,
  rightName: string,
  optionalName: string,
  {
    rounds = Rounds.default,
    leftColor = cszBlue,
    leftTextColor = defaultTextColor,
    leftLogo,
    rightColor = cszRed,
    rightTextColor = defaultTextColor,
    rightLogo,
    optionalColor = defaultOptionalColor,
    optionalTextColor = defaultOptionalTextColor,
    logoShadow
  }: {
    rounds?: string[] | null,
    leftLogo?: TeamLogo,
    rightLogo?: TeamLogo,
    leftColor?: string,
    rightColor?: string,
    leftTextColor?: string,
    rightTextColor?: string,
    optionalColor?: string,
    optionalTextColor?: string,
    logoShadow?: boolean
  } = {}
): Profile {
  return {
    id,
    name,
    logo,
    logoShadow,
    builtin: true,
    rounds: rounds,
    teams: {
      left: {
        name: leftName,
        logo: leftLogo,
        color: leftColor,
        textColor: leftTextColor,
      },
      right: {
        name: rightName,
        logo: rightLogo,
        color: rightColor,
        textColor: rightTextColor
      },
      optional: {
        name: optionalName,
        color: optionalColor,
        textColor: optionalTextColor
      }
    }
  }
}

export const builtinProfiles: Profile[] = [
  profile(
    'csz-main',
    'ComedySportz',
    ProfileLogo.ComedySportz,
    'Snarks',
    'Laughletics',
    'Alyssa'
  ),
  profile(
    'csz-minorleague',
    'Minor League',
    ProfileLogo.MinorLeague,
    'Mirthquakes',
    'Snortyniners',
    'George',
    {
      leftLogo: TeamLogo.Mirthquakes,
      rightLogo: TeamLogo.Snortyniners
    }
  ),
  profile(
    'csz-recleague',
    'Rec League',
    ProfileLogo.RecLeague,
    'Blue',
    'Red',
    'Name'
  ),
  profile(
    'wry-vs-dry',
    'Wry vs Dry',
    ProfileLogo.WryVsDry,
    'Funnypenny',
    'Octopunny',
    'Antonio',
    {
      leftColor: 'darkred',
      leftTextColor: white,
      rightColor: 'darkgoldenrod',
      rightTextColor: white,
      rounds: null, // Keep it simple for AOT tech
      logoShadow: false
    }
  )
]
