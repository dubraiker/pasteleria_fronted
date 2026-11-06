
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,

  imports: [
    NgIf
  ],

  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeaderComponent {

  @Input({ required: true }) title!: string;

  @Input() subtitle?: string;

}
