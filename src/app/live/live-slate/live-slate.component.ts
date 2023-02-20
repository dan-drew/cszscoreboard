import { Component } from '@angular/core';
import {Match} from "../../config/match";

@Component({
  selector: 'app-live-slate',
  templateUrl: './live-slate.component.html',
  styleUrls: ['./live-slate.component.scss'],
  host: {
    class: 'fullscreen'
  }
})
export class LiveSlateComponent {
  constructor(
    readonly match: Match
  ) {
  }
}
