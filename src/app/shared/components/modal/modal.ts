
import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class ModalComponent {

  @Input() isOpen = false;

  @Input() title = '';

  @Output() isOpenChange = new EventEmitter<boolean>();

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

}
