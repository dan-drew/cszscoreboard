export enum ThemeSlideType {
  Generic,
  Movie
}

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
    color: string
    rotation?: number
}

const DefaultSlideTitle: Partial<ThemeSlideTitle> = Object.freeze({
  color: 'white'
})

export interface ThemeSlideOptions {
  readonly type: ThemeSlideType
  readonly background: ThemeSlideBackground
  readonly title: ThemeSlideTitle
}

export class ThemeSlide implements ThemeSlideOptions {
  readonly type: ThemeSlideType
  readonly background: ThemeSlideBackground
  readonly title: ThemeSlideTitle

  constructor(
    name: string,
    background: string,
    type?: ThemeSlideType
  )
  constructor(
    name: string,
    options: ThemeSlideOptions
  )
  constructor(
    public readonly name: string,
    optionsOrBackground: string | Partial<ThemeSlideOptions>,
    type: ThemeSlideType = ThemeSlideType.Movie
  ) {
    if (typeof optionsOrBackground === 'string') {
      this.background = Object.assign(
        {},
        DefaultSlideBackground,
        { image: optionsOrBackground }
      )
      this.title = Object.assign({}, DefaultSlideTitle) as ThemeSlideTitle
      this.type = type
    } else {
      this.type = optionsOrBackground.type || ThemeSlideType.Movie
      this.background = Object.assign(
        {},
        DefaultSlideBackground,
        optionsOrBackground.background
      )
      this.title = Object.assign(
        {},
        DefaultSlideTitle,
        optionsOrBackground.title
      )
    }

    Object.freeze(this)
  }
}
