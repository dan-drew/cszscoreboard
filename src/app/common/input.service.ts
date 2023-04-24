import { Injectable } from '@angular/core';
import {InputModalComponent, InputOptions} from "./input-modal/input-modal.component";

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private ui?: InputModalComponent

  constructor() { }

  setUI(ui: InputModalComponent) {
    this.ui = ui
  }

  show(options: InputOptions) {
    this.ui?.show(options)
  }
}
