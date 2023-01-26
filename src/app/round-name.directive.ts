import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[roundName]'
})
export class RoundNameDirective {

  constructor(public readonly el: ElementRef) { }

}
