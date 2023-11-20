import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly appUserAgentPattern = /scoreboard/i

  readonly isApp: boolean
  readonly isWeb: boolean

  constructor() {
    this.isApp = this.appUserAgentPattern.test(navigator.userAgent)
    this.isWeb = !this.isApp
  }
}
