import {Directive, ElementRef, Input} from '@angular/core';
import {ButtonGroupComponent} from "./button-group.component";
import {Subscription} from "rxjs";

@Directive({
  selector: '[buttonGroupItem]'
})
export class ButtonGroupItemDirective {
  _value: any
  selectionChanged: Subscription

  constructor(
    readonly el: ElementRef,
    readonly buttonGroup: ButtonGroupComponent
  ) {
    el.nativeElement.classList.add('button-group-item')

    this.selectionChanged = buttonGroup.selectedValueChange.subscribe({
      next: (_value: any) => this.toggle()
    })

    el.nativeElement.addEventListener('click', () => {
      buttonGroup.clicked(this.value)
    })
  }

  @Input('buttonGroupItem')
  set value(val: any) {
    this._value = val
    this.toggle()
  }

  get value() {
    return this._value
  }

  private toggle() {
    if (this.buttonGroup.selectedValue === this.value) {
      this.el.nativeElement.classList.add('selected')
    } else {
      this.el.nativeElement.classList.remove('selected')
    }
  }
}
