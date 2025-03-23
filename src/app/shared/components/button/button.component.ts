import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() title: string = 'Click me';
  @Input() icon: string = '';
  @Input() action: Function = () => { };

  handleClick() {
    if (this.action) {
      this.action();
    }
  }
}
