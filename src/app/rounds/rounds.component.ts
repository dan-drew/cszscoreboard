import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, HostBinding,
  Input, OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Match} from "../config/match";
import {RoundNamesDirective} from "../round-names.directive";
import {RoundNameDirective} from "../round-name.directive";
import {BehaviorSubject} from "rxjs";
import {Rounds} from "../config/rounds";

class NameInfo {
  offset: number
  center: number
  width: number

  constructor(containerRect: DOMRect, el: ElementRef) {
    const rect = el.nativeElement.getBoundingClientRect()

    this.width = rect.width
    this.offset = rect.x - containerRect.x
    this.center = this.offset + (this.width / 2)
  }
}

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
  host: {
    class: 'd-flex flex-nowrap align-items-stretch'
  }
})
export class RoundsComponent implements OnInit {
  @Input() editable: boolean = false
  @ViewChild(RoundNamesDirective) roundNameContainer?: RoundNamesDirective
  @ViewChildren(RoundNameDirective) roundNameList?: QueryList<RoundNameDirective>
  nameInfo?: NameInfo[]
  containerRect?: DOMRect

  constructor(
    public readonly match: Match,
    readonly changeDetector: ChangeDetectorRef
  ) {
  }

  get round() {
    return this.match.round
  }

  ngOnInit() {
    setTimeout(() => this.updateInfo(), 200)
  }

  @HostBinding('class.round-edit')
  get hostRoundEditClass() {
    return this.editable
  }

  selected(roundIndex: number) {
    return this.round.current === roundIndex
  }

  select(roundIndex: number) {
    this.round.current = roundIndex
    // this.updateInfo()
  }

  updateInfo() {
    if (this.roundNameList) {
      this.containerRect = this.roundNameContainer!.el.nativeElement.parentElement.getBoundingClientRect()
      this.nameInfo = this.roundNameList?.map(name => new NameInfo(this.containerRect!, name.el)) || []
      // this.changeDetector.markForCheck()
    }
  }

  roundOffset(roundIndex: number) {
    if (this.nameInfo) {
      const info = this.nameInfo![roundIndex]
      const newOffset = (this.containerRect!.width / 2) - info.offset - (info.width / 2)
      console.info('New offset', newOffset)
      return `${newOffset}px`
    } else {
      return 0
    }
  }
}
