import {Component, HostBinding, Input, Optional,} from '@angular/core';
import {Match} from "../config/match";
import {LiveViewComponent} from "../live/live-view/live-view.component";

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
  host: {
    class: 'd-flex-row align-items-stretch overflow-hidden'
  }
})
export class RoundsComponent {
  @Input() editable: boolean = false

  constructor(
    public readonly match: Match,
    @Optional() readonly live?: LiveViewComponent
  ) {
  }

  get round() {
    return this.match.round
  }

  @HostBinding('class.round-edit')
  get hostRoundEditClass() {
    return this.editable
  }
}
