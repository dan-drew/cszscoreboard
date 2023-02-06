import {
  AfterViewInit,
  Component,
  HostBinding,
  Input, OnDestroy, Optional,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Match} from "../config/match";
import {RoundNamesDirective} from "../round-names.directive";
import {RoundNameDirective} from "../round-name.directive";
import {BehaviorSubject, merge, Subscription, timer} from "rxjs";
import {LiveViewComponent} from "../live-view/live-view.component";

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
  host: {
    class: 'd-flex flex-nowrap align-items-stretch'
  }
})
export class RoundsComponent implements AfterViewInit, OnDestroy {
  @Input() editable: boolean = false
  @ViewChild(RoundNamesDirective) roundNameContainer?: RoundNamesDirective
  @ViewChildren(RoundNameDirective) roundNameList?: QueryList<RoundNameDirective>

  namesChangeSubscription?: Subscription
  resizeListener: { (): void }
  readonly roundOffset = new BehaviorSubject<string>('0')

  constructor(
    public readonly match: Match,
    @Optional() readonly live?: LiveViewComponent
  ) {
    this.namesChangeSubscription = merge(
      this.match.round.namesChange,
      this.match.round.current
    ).subscribe(() => {
      this.updateRoundOffset(true)
    })

    this.resizeListener = () => {
      this.updateRoundOffset()
    }

    window.addEventListener('resize', this.resizeListener)
  }

  get round() {
    return this.match.round
  }

  ngAfterViewInit() {
    this.updateRoundOffset()
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener)
    this.namesChangeSubscription?.unsubscribe()
  }

  @HostBinding('class.round-edit')
  get hostRoundEditClass() {
    return this.editable
  }

  get selectedIndex() {
    return this.round.current.value
  }

  selected(roundIndex: number) {
    return this.round.current.value === roundIndex
  }

  select(roundIndex: number) {
    this.round.setCurrent(roundIndex)
  }

  private updateRoundOffset(force: boolean = false): void {
    if (!this.roundNameList) return
    window.setTimeout(() => this.doOffsetUpdate(), 0)
  }

  private doOffsetUpdate() {
    const el = this.roundNameList!.get(this.selectedIndex)!.el!.nativeElement
    const roundWidth = el.getBoundingClientRect().width
    const offset = this.roundNameList!
      .map((item, i) => i < this.selectedIndex ? item.el.nativeElement.getBoundingClientRect().width : 0)
      .reduce((prev, curr) => prev + curr, 0)

    this.roundOffset.next(`-${offset + roundWidth / 2}px`)
  }
}
