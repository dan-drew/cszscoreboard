type GameVersus = 'vs' | 'shared'
type GameStyle = 'normal' | 'list' | 'labeled'
const IndexNames = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

interface GuessDef {
  label?: string
  placeholder?: string
  optional?: boolean
  multiline?: boolean
  lines?: number
}

export interface Guess extends GuessDef {
  id: string
}

interface GameOptions {
  style?: GameStyle,
  vs?: GameVersus,
  labelTemplate?: string,
  placeholderTemplate?: string,
  multiline?: boolean,
  listName?: string
}

export class GuessingGame {
  // Unique ID
  id: string
  // Display name for slides
  name: string
  // Display name for settings
  listName: string
  // Show label on each slide
  guesses!: Guess[]
  vs?: GameVersus
  style: GameStyle
  required: number

  constructor(
    name: string,
    guesses: GuessDef[],
    options: Pick<GameOptions, 'vs' | 'style' | 'listName'>
  )
  constructor(
    name: string,
    guesses: number | [number, number],
    options?: Pick<GameOptions, 'vs' | 'style' | 'labelTemplate' | 'placeholderTemplate' | 'multiline' | 'listName'>
  )
  constructor(
    source: GuessingGame,
    vs: GameVersus
  )
  constructor(
    name: string | GuessingGame,
    guesses: number | [number, number] | GuessDef[] | GameVersus,
    {vs, labelTemplate, placeholderTemplate, style = 'normal', multiline = false, listName}: GameOptions = {}
  ) {
    if (name instanceof GuessingGame) {
      this.id = name.id + '-vs'
      this.name = name.name
      this.listName = name.listName + ' (H2H)'
      this.guesses = name.guesses
      this.style = name.style
      this.vs = guesses as GameVersus
      this.required = name.required
    } else {
      this.name = name
      this.listName = listName || name
      this.id = name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^A-Za-z0-9-]+/g, '')
      this.vs = vs
      this.style = style

      if (typeof guesses === 'string') {
        // Not allowed
      } else if (typeof guesses === 'number') {
        this.guesses = this.createGuesses(guesses, guesses, labelTemplate!, placeholderTemplate, multiline)
      } else if (this.isGuessList(guesses)) {
        this.guesses = guesses.map(def => this.guessFromDef(def))
      } else {
        this.guesses = this.createGuesses(guesses[0], guesses[1], labelTemplate!, placeholderTemplate, multiline)
      }

      this.required = this.guesses.filter(a => a.optional !== true).length
    }
  }

  asVs(vs: GameVersus) {
    return new GuessingGame(this, vs)
  }

  // Create templatized guesses
  private createGuesses(
    min: number,
    max: number,
    labelTemplate?: string,
    placeholderTemplate?: string,
    multiline?: boolean
  ): Guess[] {
    const guesses: Guess[] = []

    for (let i = 0; i < max; i++) {
      guesses.push({
        id: this.nextGuessId(),
        label: labelTemplate?.replaceAll('{{}}', IndexNames[i]),
        placeholder: placeholderTemplate?.replaceAll('{{}}', IndexNames[i]),
        optional: i >= min,
        multiline
      })
    }

    return guesses
  }

  private isGuessList(val: [number, number] | GuessDef[]): val is GuessDef[] {
    return val.length > 0 && typeof val[0] !== 'number'
  }

  private nextGuessId() {
    return window.crypto.randomUUID()
  }

  private guessFromDef(def: GuessDef): Guess {
    return Object.assign({id: this.nextGuessId()}, def)
  }
}

