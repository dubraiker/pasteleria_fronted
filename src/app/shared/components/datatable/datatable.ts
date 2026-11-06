
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datatable',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './datatable.html',
  styleUrl: './datatable.css'
})
export class DataTableComponent {

  @Input({ required: true }) headers: string[] = [];

}
