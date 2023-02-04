import {Component, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import { ButtonGroupItemDirective } from './button-group-item.directive';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'rounded d-flex flex-nowrap align-items-stretch justify-content-stretch'
  }
})
export class ButtonGroupComponent {
  @Input() title?: string
  _selectedValue?: any
  @Output() readonly selectedValueChange = new EventEmitter<any>()

  @ViewChildren(ButtonGroupItemDirective) items?: QueryList<ButtonGroupItemDirective>

  @Input()
  set selectedValue(val: any) {
    this._selectedValue = val
    this.selectedValueChange.emit(val)
  }

  get selectedValue() {
    return this._selectedValue
  }

  clicked(value: any) {
    this.selectedValue = value
  }
}
