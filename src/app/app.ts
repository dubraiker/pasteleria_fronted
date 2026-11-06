import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/components/header/header';
import { SidebarComponent } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <ng-container *ngIf="authService.usuarioActual(); else loginLayout">
      <app-header></app-header>
      <div class="layout-body">
        <app-sidebar></app-sidebar>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </ng-container>

    <ng-template #loginLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .layout-body {
      display: flex;
      min-height: calc(100vh - 60px);
    }
    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: #faf8f5;
    }
  `]
})
export class AppComponent {
  authService = inject(AuthService);
}