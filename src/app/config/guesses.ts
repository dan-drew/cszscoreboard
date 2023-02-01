export class Guesses {
  static readonly maxGuesses = 5
  public selected: number = 0
  private readonly _values: string[] = new Array<string>(Guesses.maxGuesses)

  get editValues() {
    return this._values
  }

  get values(): string[] {
    return this._values.filter(val => val.length !== 0)
  }

  set(index: number, value: string) {
    this._values[index] = value.trim()
  }

  get count() {
    return this.values.length
  }

  move(from: number, to: number) {
    this._values.splice(to, 0, this._values[from])
    this._values.splice(from > to ? from + 1 : from, 1)
  }

  reset() {
    this._values.fill('')
  }
}
