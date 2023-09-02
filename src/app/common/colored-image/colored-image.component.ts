import {Component, HostBinding, Input} from '@angular/core';

const MASK_REPEAT = 'no-repeat'
const MASK_SIZE = 'contain'
const MASK_POSITION = 'center'

@Component({
  selector: 'colored-image',
  templateUrl: './colored-image.component.html',
  styleUrls: ['./colored-image.component.scss']
})
export class ColoredImageComponent {
  @Input() src!: string
  @Input() width: string = '100px'
  @Input() height: string = '100px'
  @Input() color: string = 'white'

  @HostBinding('style')
  get hostStyle() {
    return {
      position: 'relative',
      width: this.width,
      height: this.height,
      maskImage: `url(${this.src})`,
      webkitMaskImage: `url(${this.src})`,
      maskRepeat: MASK_REPEAT,
      webkitMaskRepeat: MASK_REPEAT,
      maskSize: MASK_SIZE,
      webkitMaskSize: MASK_SIZE,
      maskPosition: MASK_POSITION,
      webkitMaskPosition: MASK_POSITION
    }
  }
}
