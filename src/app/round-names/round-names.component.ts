import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Match} from "../config/match";
import {RoundNameDirective} from "../round-name.directive";
import {animationFrameScheduler, asyncScheduler, BehaviorSubject, observeOn, Subscription} from "rxjs";

interface NameElementData {
  element: HTMLElement
  offset: number
  width: number
}

interface NameData {
  selected: NameElementData
  unselected: NameElementData
}

@Component({
  selector: 'app-round-names',
  templateUrl: './round-names.component.html',
  styleUrls: ['./round-names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundNamesComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly _offset = new BehaviorSubject<string>('0')

  readonly DEBUG = false
  readonly round = this.match.round
  readonly offset = this._offset.pipe(observeOn(animationFrameScheduler))

  @ViewChild('roundNameContainer') private roundNameContainer!: ElementRef<HTMLElement>
  @ViewChildren(RoundNameDirective) roundNames?: QueryList<RoundNameDirective>

  nameData?: NameData[]
  nameGap: number = 0
  nameChange?: Subscription
  selectChange?: Subscription
  offsetChange?: Subscription

  constructor(
    public readonly match: Match,
    readonly changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.nameChange = this.round.namesChange.pipe(
      observeOn(asyncScheduler)
    ).subscribe(() => {
      this.updateData()
      this.updateOffset(this.round.current.value)
    })

    this.selectChange = this.round.current.pipe(
      observeOn(asyncScheduler)
    ).subscribe((index: number) => {
      this.updateOffset(index)
    })

    this.offsetChange = this.offset.subscribe(() => this.changeDetector.markForCheck())
  }

  ngOnDestroy() {
    this.nameChange?.unsubscribe()
    this.selectChange?.unsubscribe()
    this.offsetChange?.unsubscribe()
  }

  ngAfterViewInit() {
    this.updateData()
    this.updateOffset()
  }

  private updateData() {
    if (!this.roundNames) return

    this.nameData = this.roundNames.map(item => {
      const el = item.el.nativeElement
      const containerRect = this.roundNameContainer.nativeElement.getBoundingClientRect()
      const selected = el.getElementsByClassName('selected').item(0)! as HTMLElement
      const unselected = el.getElementsByClassName('unselected').item(0)! as HTMLElement
      const selectedRect = selected.getBoundingClientRect()
      const unselectedRect = unselected.getBoundingClientRect()

      return {
        selected: {
          element: selected,
          offset: selectedRect.left - containerRect.left,
          width: selectedRect.width
        },
        unselected: {
          element: unselected,
          offset: unselectedRect.left - containerRect.left,
          width: unselectedRect.width
        }
      }
    })

    // Calculate space between names
    if (this.nameData!.length < 2) {
      this.nameGap = 0
    } else  {
      const name0 = this.dataFor(0)
      const name1 = this.dataFor(1)
      this.nameGap = name1.offset - name0.offset - name0.width
    }

    console.info('Name data updated', `Gap: ${this.nameGap}`, this.nameData)
  }

  private updateOffset(selected: number = this.round.current.value) {
    let newOffset = 0

    this.nameData!.forEach((data, index) => {
      if (index === selected) {
        newOffset += data.selected.width / 2
      } else if (index < selected) {
        newOffset += data.unselected.width + this.nameGap
      }
    })

    this._offset.next(this.pixels(-newOffset))
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
}
