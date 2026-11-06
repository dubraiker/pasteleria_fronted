import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioDTO {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  id_perfil: number;
  estado?: boolean;
  activo?: boolean; 
  perfil_nombre?: string;
}

export interface UsuarioCreateDTO {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  id_perfil: number;
  embedding_facial?: number[] | null;
  foto_perfil_url?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/api/usuarios';

  obtenerUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.API_URL}/`);
  }

  crearUsuarioAdmin(usuario: UsuarioCreateDTO): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/crear`, usuario);
  }

  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}