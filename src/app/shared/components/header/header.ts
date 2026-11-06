
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  authService = inject(AuthService);

}
