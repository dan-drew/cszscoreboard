export interface Profile {
  id: string
  name: string
  logo: string
  rounds: string[];
  teams: {
    blue: string
    red: string
    optional: string
  }
}
