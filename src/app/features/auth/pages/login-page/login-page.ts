import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CardComponent } from '../../../../shared/components/card/card';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    ButtonComponent,
    AlertBoxComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="login-wrapper">
      <app-card title="Inicio de Sesión - Pastelería IoT">
        <app-alert-box [message]="errorMessage" type="error"></app-alert-box>
        <app-loading-spinner [isLoading]="loading"></app-loading-spinner>

        <form (ngSubmit)="onSubmit()" *ngIf="!loading">
          <div class="form-group">
            <label for="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              [(ngModel)]="correo"
              required
              class="form-control"
              placeholder="ejemplo@pasteleria.com"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              class="form-control"
              placeholder="••••••••"
            />
          </div>

          <div class="form-actions">
            <app-button type="submit" variant="primary">Ingresar</app-button>
          </div>
        </form>
      </app-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f7f3ef;
      padding: 1rem;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    label {
      display: block;
      margin-bottom: 0.4rem;
      color: #4a2c2a;
      font-weight: 600;
    }
    .form-control {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #d1c7bd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
  `]
})
export class LoginPageComponent {
  correo = '';
  password = '';
  errorMessage = '';
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(): void {
    if (!this.correo || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        const modulos = res.usuario.modulos;
        if (modulos && modulos.length > 0) {
          // Redirecciona al primer módulo permitido devuelto por la base de datos
          this.router.navigate([modulos[0].ruta]);
        } else {
          this.errorMessage = 'El usuario no tiene módulos asignados en la base de datos';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.detail || 'Credenciales incorrectas o error de conexión';
      }
    });
  }
}