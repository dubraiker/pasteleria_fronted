
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';

  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  @Input() disabled = false;

}
