import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Match} from "../../config/match";
import {RoundNameData, RoundNameDirective} from "../round-name.directive";
import {asyncScheduler, fromEvent, Subscription, tap, throttleTime} from "rxjs";
import {RoundNamesDirective} from "../round-names.directive";

const UPDATE_INTERVAL = 50
const UPDATE_PERIOD = 500
const UPDATE_TIMES = UPDATE_PERIOD / UPDATE_INTERVAL

@Component({
  selector: 'app-round-names',
  templateUrl: './round-names.component.html',
  styleUrls: ['./round-names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundNamesComponent implements OnInit, OnDestroy, AfterViewChecked {

  readonly DEBUG = false
  readonly round = this.match.round

  @ViewChild(RoundNamesDirective) private roundNameContainer!: RoundNamesDirective
  @ViewChildren(RoundNameDirective) roundNames?: QueryList<RoundNameDirective>

  nameData?: RoundNameData[]
  nameGap: number = 0
  nameChange?: Subscription
  selectChange?: Subscription
  resizeEvent?: Subscription

  constructor(
    public readonly match: Match,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // Update position info if round names change
    this.nameChange = this.round.namesChange.subscribe(() => {
      this.trace('Round names changed')
      this.changeDetectorRef.markForCheck()
    })

    // Update display if current round changes
    this.selectChange = this.round.current.pipe(
      tap(index => this.trace(`Selection changed to ${index}`))
    ).subscribe(index => this.update({selected: index}))

    // Update position info if window size changes
    fromEvent(window, 'resize').pipe(
      throttleTime(100, asyncScheduler, {trailing: true, leading: false}),
      tap(() => this.trace('Window resized!'))
    ).subscribe(() => this.update())
  }

  ngOnDestroy() {
    this.nameChange?.unsubscribe()
    this.selectChange?.unsubscribe()
    this.resizeEvent?.unsubscribe()
  }

  ngAfterViewChecked() {
    this.updateSelected()
    this.updateData()
    this.updateOffset()
  }

  private updateData() {
    if (!this.roundNames) return

    const containerRect = this.roundNameContainer.rect
    this.nameData = this.roundNames.map(item => item.getData(containerRect.left))

    // Calculate space between names
    if (this.nameData!.length < 2) {
      this.nameGap = 0
    } else  {
      const name0 = this.dataFor(0)
      const name1 = this.dataFor(1)
      this.nameGap = name1.offset - name0.offset - name0.width
    }

    this.trace('Name data updated', `Gap: ${this.nameGap}`, this.nameData)
  }

  private updateSelected(selected: number = this.round.current.value) {
    this.roundNames?.forEach((item, index) => {
      this.trace(`Name ${index} before: `, item.getData())
      item.selected = index === selected
      this.trace(`Name ${index} after: `, item.getData())
    })
  }

  private update(
    {selected = this.round.current.value, times = UPDATE_TIMES}: {selected?: number, times?: number} = {}
  ) {
    this.updateSelected(selected)
    this.updateOffset(selected)
    this.updateData()
  }

  private updateOffset(selected: number = this.round.current.value) {
    if (!this.roundNameContainer) return

    let newOffset = 0

    this.nameData?.forEach((data, index) => {
      if (index === selected) {
        newOffset += data.selected.width / 2
      } else if (index < selected) {
        newOffset += data.unselected.width + this.nameGap
      }
    })

    this.roundNameContainer.offset = newOffset
  }

  private dataFor(index: number, selected: number = this.round.current.value) {
    const data = this.nameData!.at(index)!
    if (index === selected) {
      return data.selected
    } else {
      return data.unselected
    }
  }

  pixels(val: number) {
    return `${val.toFixed(2)}px`
  }

  private trace(str: string, ...args: any[]) {
    if (this.DEBUG) console.debug(str, ...args)
  }
}
