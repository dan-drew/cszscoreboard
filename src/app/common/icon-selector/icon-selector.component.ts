import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styles: [
  ]
})
export class IconSelectorComponent {
  @Input() selectedIcon?: string
  @Output() selectedIconChange = new EventEmitter<string>()
  @Input() icons!: string[]

  setIcon(value: string) {
    this.selectedIcon = value
    this.selectedIconChange.emit(value)
  }
}
