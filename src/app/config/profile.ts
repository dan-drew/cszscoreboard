export interface Profile {
  readonly name: string
  readonly logo: string
  readonly rounds: string[];
  readonly teams: {
    blue: string
    red: string
    optional: string
  }
}
