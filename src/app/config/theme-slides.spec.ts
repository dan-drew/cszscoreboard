import {ThemeSlides} from "./theme-slides";

describe('ThemeSlides', () => {
  const THEME1 = ThemeSlides.Themes[0]
  const THEME2 = ThemeSlides.Themes[1]
  let $slides: ThemeSlides

  beforeEach(() => {
    $slides = new ThemeSlides()
  })

  describe('enabled', () => {
    it('should be false by default', () => {
      expect($slides.enabled).toBeFalse()
    })

    it('should be true if any slides', () => {
      $slides.add(THEME1)
      expect($slides.enabled).toBeTrue()
    })
  })

  describe('active', () => {
    it('should be 0 by default', () => {
      expect($slides.active).toBe(0)
    })

    it('should reject negative index', () => {
      expect(() => { $slides.active = -1 }).toThrow()
    })

    it('should reject index higher than slide count', () => {
      $slides.add(THEME1)
      $slides.add(THEME2)
      expect(() => { $slides.active = 2 }).toThrow()
    })

    it('should allow valid slide index', () => {
      $slides.add(THEME1)
      $slides.add(THEME2)
      $slides.active = 1
      expect($slides.active).toBe(1)
    })

    it('should handle when active slide index is removed', () => {
      $slides.add(THEME1)
      $slides.add(THEME2)
      $slides.active = 1
      expect($slides.active).toBe(1)
      $slides.remove($slides.slides[1])
      expect($slides.active).toBe(0)
    })

    it('should handle when all slides removed', () => {
      $slides.add(THEME1)
      expect($slides.active).toBe(0)
      $slides.remove($slides.slides[0])
      expect($slides.active).toBe(0)
    })
  })
})
