import {Injectable} from '@angular/core';
import {Match} from "../config/match";
import {GuessAnswers} from "../config/guess-answers";

export interface GuessSlidePart {
  style?: 'red' | 'blue' | 'vs'
  answers: string[]
}

interface GuessSlide {
  title: string
  parts: GuessSlidePart[]
}

interface GuessPreview {
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class GuessingService {
  private readonly MAX_PREVIEW_LENGTH = 100
  private readonly NEW_LINE_PATTERN = /[\r\n]+/
  private readonly COMMA_SEPARATOR = ', '

  private generated: number = 0
  private _slides: GuessSlide[] = []
  private _previews: GuessPreview[] = []

  constructor(
    private readonly match: Match
  ) {
  }

  get enabled() {
    return (this.match.guesses.game?.guesses?.length || 0) > 0
  }

  get guesses() {
    return this.match.guesses
  }

  get game() {
    return this.guesses.game!
  }

  get selected() {
    return this.slides[this.guesses.selected]
  }

  get slides() {
    this.generate()
    return this._slides
  }

  get previews() {
    this.generate()
    return this._previews
  }

  next() {
    this.guesses.selected = Math.min(
      this.maxSlideIndex,
      this.match.guesses.selected + 1
    )
  }

  previous() {
    this.match.guesses.selected = Math.max(0, this.match.guesses.selected - 1)
  }

  private get maxSlideIndex() {
    return Math.max(0, Math.min(
      this.guesses.answers?.used || 100,
      this.guesses.red?.used || 100,
      this.guesses.blue?.used || 100
    ))
  }

  private generate() {
    if (this.generated < this.guesses.changed) {
      this._slides = this.generateSlides()
      this._previews = this.generatePreviews()
      this.generated = this.guesses.changed
    }
  }

  private generateSlides(): GuessSlide[] {
    switch (this.game.style) {
      case 'list':
        return this.listSlides()
      case 'labeled':
        return this.labeledSlides()
      default:
        return this.guessSlides()
    }
  }

  private generatePreviews(): GuessPreview[] {
    switch (this.game.style) {
      case 'list':
        return this.listPreviews()
      case 'labeled':
        return this.labeledPreviews()
      default:
        return this.guessPreviews()
    }
  }

  private listSlides(): GuessSlide[] {
    switch (this.game.vs) {
      case 'vs':
        return [{
          title: this.game.name,
          parts: [
            {style: 'blue', answers: this.listText(this.guesses.blue!)},
            {style: 'red', answers: this.listText(this.guesses.red!)}
          ]
        }]
      case 'shared':
        return [{
          title: this.game.name,
          parts: [{style: 'vs', answers: this.listText(this.guesses.answers!)}]
        }]
      default:
        const answers = this.listText(this.guesses.answers!)
        return [{
          title: this.game.name,
          parts: [{answers}]
        }]
    }
  }

  private labeledSlides(): GuessSlide[] {
    const answers = this.game.guesses.map((guess, index) => {
      return `<em>${guess.label}:</em> ${this.guesses.answers!.value[index]}`
    })

    return [{
      title: this.game.name,
      parts: [{answers}]
    }]
  }

  private guessSlides(): GuessSlide[] {
    return this.guesses.answers!.value.map<GuessSlide>(answer => {
      return {
        title: this.game.name,
        parts: [{answers: this.splitLines(answer)}]
      }
    })
  }

  private listPreviews(): GuessPreview[] {
    let text: string

    if (this.game.vs === 'vs') {
      text = this.previewText(
        this.listText(this.guesses.blue!).join(this.COMMA_SEPARATOR),
        ' / ',
        this.listText(this.guesses.red!).join(this.COMMA_SEPARATOR)
      )
    } else {
      text = this.previewText(this.listText(this.guesses.answers!).join(this.COMMA_SEPARATOR))
    }

    return [{text}]
  }

  private labeledPreviews(): GuessPreview[] {
    const text = this.previewText(this.game.guesses.map((guess, index) => {
      return `${guess.label}: ${this.guesses.answers!.value[index]}`
    }).join('\n'))

    return [{text}]
  }

  private guessPreviews(): GuessPreview[] {
    return this.guesses.answers!.value.map<GuessPreview>(text => {
      return {text}
    })
  }

  private listText(answers: GuessAnswers): string[] {
    if (this.game.guesses.length === 1 && this.game.guesses[0].multiline) {
      return this.splitLines(answers.at(0))
    } else {
      return answers.value
    }
  }

  private previewText(...text: string[]): string {
    const val = text.length === 1 ? text[0] : text.join('')

    if (val.length > this.MAX_PREVIEW_LENGTH) {
      return val.trimEnd().substring(0, this.MAX_PREVIEW_LENGTH - 3) + '...'
    } else {
      return val
    }
  }

  private splitLines(text: string): string[] {
    return text.split(this.NEW_LINE_PATTERN).filter(t => t.length > 0)
  }
}
