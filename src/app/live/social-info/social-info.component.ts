import {Component, Input} from '@angular/core';

type SocialLogo = 'facebook' | 'instagram' | 'twitter'

interface SocialPart {
  logos: SocialLogo[]
  text: string
}

@Component({
  selector: 'app-social-info',
  templateUrl: './social-info.component.html',
  styleUrls: ['./social-info.component.scss']
})
export class SocialInfoComponent {
  static readonly ParsePattern = /\([A-Z]{2}\)|\S+/g

  parts: SocialPart[] = []

  @Input()
  set text(value: string | undefined) {
    this.parts = value ? [...this.parseText(value)] : []
  }

  private *parseText(value: string): Generator<SocialPart> {
    const matches = value.matchAll(SocialInfoComponent.ParsePattern) || []
    let part: SocialPart = { logos: [], text: '' }

    for (let text of matches) {
      switch (text[0]) {
        case '(FB)': part.logos.push('facebook'); break
        case '(IG)': part.logos.push('instagram'); break
        case '(TW)': part.logos.push('twitter'); break
        default:
          part.text = text[0]
          yield part
          part = { logos: [], text: '' }
      }
    }
  }
}
