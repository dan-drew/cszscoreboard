import {ThemeSlide} from "./theme-slide";
import {Cacheable} from "./cacheable";
import {CacheOptions} from "./cache";
import {ThemeSlideConfig} from "./theme-slide-config";

export interface ThemeSlidesCache {
  active: number
  slides: ThemeSlideConfig[]
}

export class ThemeSlides extends Cacheable<ThemeSlidesCache> implements ThemeSlidesCache {
  static readonly Themes: readonly ThemeSlide[] = Object.freeze([
    new ThemeSlide('Adventure', 'adventure.jpg'),
    new ThemeSlide('Noir', 'noir.jpg'),
    new ThemeSlide('Romance', 'romance.jpg'),
    new ThemeSlide('Horror', 'horror.jpg'),
    new ThemeSlide('Sci-Fi', 'scifi.jpg'),
    new ThemeSlide('Western', {
      background: {image: 'western.jpg'},
      title: { color: '#560706' }
    }),
    new ThemeSlide('Holiday', 'holiday.jpg'),
  ])
  private static readonly themeMap = new Map<string, ThemeSlide>(ThemeSlides.Themes.map(t => [t.name, t]))

  active!: number
  slides!: ThemeSlideConfig[]

  constructor(options?: CacheOptions) {
    super('theme-slides', options);
  }

  static byName(name: string): ThemeSlide {
    if (!this.themeMap.has(name)) throw new Error(`Invalid theme name: ${name}`)
    return this.themeMap.get(name)!
  }

  get enabled() {
    return this.slides.length > 0
  }

  get activeConfig() {
    return this.slides[this.active]
  }

  get activeTheme() {
    return ThemeSlides.byName(this.activeConfig.name)
  }

  next() {
    if (this.active < this.slides.length - 1) this.active++
  }

  previous() {
    if (this.active > 0) this.active--
  }

  add(theme: ThemeSlide): void {
    this.slides.push({ name: theme.name, title: '' })
  }

  remove(slide: ThemeSlideConfig): void {
    const i = this.slides.indexOf(slide)
    if (i >= 0) {
      this.slides.splice(i, 1)
      if (this.active >= this.slides.length) this.active = this.slides.length - 1;
    }
  }

  reset() {
    this.active = 0
    this.slides.length = 0
  }

  protected override init(data?: any) {
    this.active = 0
    this.slides = []
  }

  protected override serialize(): ThemeSlidesCache {
    return this
  }

  protected override deserialize(data: ThemeSlidesCache) {
    this.active = data.active || 0
    this.slides = data.slides || []
  }
}
