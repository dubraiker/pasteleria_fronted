
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-box',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './alert-box.html',
  styleUrl: './alert-box.css'
})
export class AlertBoxComponent {

  @Input() message?: string;

  @Input() type: 'error' | 'success' = 'error';

}
