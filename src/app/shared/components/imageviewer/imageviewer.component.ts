import { Component, Input } from '@angular/core';
import { View } from '../../../interfaces';

@Component({
  selector: 'shared-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.css']
})
export class ImageviewerComponent {

  @Input()
  public images: View[] = [];

  public currentIndex: number = 0;

  constructor() {}

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  previousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

}
