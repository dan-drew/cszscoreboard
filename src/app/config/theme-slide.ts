interface ThemeSlideBackground {
  image: string
  style?: 'cover' | 'fill'
}

const DefaultSlideBackground: Partial<ThemeSlideBackground> = Object.freeze({
  style: 'fill'
})

interface ThemeSlideTitle {
    x?: number
    y?: number
    font?: 'csz' | string
    size?: number
    italic?: boolean
    bold?: boolean
    color?: string
    rotation?: number
}

export interface ThemeSlideOptions {
  readonly background: ThemeSlideBackground
  readonly title: ThemeSlideTitle
}

export class ThemeSlide implements ThemeSlideOptions {
  readonly background: ThemeSlideBackground
  readonly title: ThemeSlideTitle

  constructor(
    name: string,
    background: string
  )
  constructor(
    name: string,
    options: ThemeSlideOptions
  )
  constructor(
    public readonly name: string,
    optionsOrBackground: string | Partial<ThemeSlideOptions>
  ) {
    if (typeof optionsOrBackground === 'string') {
      this.background = Object.assign(
        {},
        DefaultSlideBackground,
        { image: optionsOrBackground }
      )
      this.title = {}
    } else {
      this.background = Object.assign(
        {},
        DefaultSlideBackground,
        optionsOrBackground.background
      )
      this.title = Object.assign(
        {},
        optionsOrBackground.title
      )
    }

    Object.freeze(this)
  }
}
