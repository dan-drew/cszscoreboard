import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[roundNames]'
})
export class RoundNamesDirective {
  constructor(public readonly el: ElementRef) { }

}
