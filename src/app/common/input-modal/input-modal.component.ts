import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {InputService} from "../input.service";
import {Modal} from 'bootstrap'

export type InputCallback = (text: string) => void

export interface InputOptions {
  title: string
  prompt: string
  placeholder?: string
  initial?: string
  callback: InputCallback
}

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('form') private form!: NgForm
  @ViewChild('modal') private modalElement!: ElementRef<HTMLDivElement>
  @ViewChild('input') private inputElement!: ElementRef<HTMLInputElement>

  private _options?: InputOptions
  private modal?: Modal

  constructor(
    private readonly inputService: InputService
  ) {
    this.inputService.setUI(this)
  }

  ngAfterViewInit() {
    this.modal = new Modal(this.modalElement.nativeElement, {})
  }

  ngOnDestroy() {
    this.modal?.dispose()
    delete this.modal
  }

  get options() {
    return this._options
  }

  show(options: InputOptions): void {
    this._options = options
    this.form.resetForm()
    this.form.setValue({input: options.initial || ''})
    this.modal?.show()
    this.inputElement!.nativeElement.select()
    this.inputElement!.nativeElement.focus()
  }

  onOK() {
    this.modal?.hide()
    this.options!.callback(this.form.value.input)
  }
}
