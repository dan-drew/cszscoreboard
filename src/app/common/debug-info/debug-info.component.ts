import { Component } from '@angular/core';
import {PlatformService} from "../platform.service";

@Component({
  selector: 'app-debug-info',
  templateUrl: './debug-info.component.html',
  styleUrls: ['./debug-info.component.scss'],
  host: {
    class: 'position-fixed top-0 start-0 h-auto rounded m-1 p-2 text-bg-dark',
    style: '--bs-bg-opacity: 0.75; z-index: 99999'
  }
})
export class DebugInfoComponent {
  constructor(
    readonly platform: PlatformService
  ) {
  }

  get userAgent() {
    return navigator.userAgent
  }
}
