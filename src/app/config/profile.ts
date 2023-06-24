export interface Profile {
  id: string
  name: string
  logo: string
  social?: string
  rounds: string[]
  teams: {
    blue: string
    red: string
    optional: string
  }
}
