import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse, Usuario, Modulo } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api/auth';
  
  usuarioActual = signal<Usuario | null>(this.obtenerUsuarioStorage());

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { correo, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuarioActual.set(res.usuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerModulos(): Modulo[] {
    return this.usuarioActual()?.modulos || [];
  }

  private obtenerUsuarioStorage(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}