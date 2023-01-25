export type TeamType = 'blue' | 'red' | 'optional'

export class Team {
  score: number = 0

  constructor(public name: string, public readonly type: TeamType) {
  }
}
