import {ThemeSlide, ThemeSlideType} from "./theme-slide";
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
      type: ThemeSlideType.Movie,
      background: {image: 'western.jpg'},
      title: { color: '#560706' }
    }),
    new ThemeSlide('Holiday', 'holiday.jpg'),
    new ThemeSlide('Generic', 'generic.png', ThemeSlideType.Generic)
  ])
  private static readonly themeMap = new Map<string, ThemeSlide>(ThemeSlides.Themes.map(t => [t.name, t]))

  private _active!: number
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

  get active() {
    return this._active
  }

  set active(val: number) {
    if (val < 0) throw new Error('Invalid active theme index (less than zero)')
    if (val >= this.slides.length && val !== 0) throw new Error(`Invalid active slide index (${val})`)
    this._active = val
    this.cache()
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
    this.cache()
  }

  remove(slide: ThemeSlideConfig): void {
    const i = this.slides.indexOf(slide)
    if (i >= 0) {
      this.cache(() => {
        this.slides.splice(i, 1)
        if (this.active >= this.slides.length) this.active = Math.max(0, this.slides.length - 1)
      })
    }
  }

  reset() {
    this.active = 0
    this.slides.length = 0
  }

  protected override init(_data?: any) {
    this.slides = []
    this.active = 0
  }

  protected override serialize(): ThemeSlidesCache {
    return {
      active: this.active,
      slides: this.slides
    }
  }

  protected override deserialize(data: ThemeSlidesCache) {
    this.slides = data.slides || []
    this.active = data.active || 0
  }
}
