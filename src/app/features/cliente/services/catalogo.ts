import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoVitrinaDTO {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  etiqueta_yolo: string;
  estado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/api/productos';

  obtenerCatalogoPublico(): Observable<ProductoVitrinaDTO[]> {
    // Corregido: incluir barra diagonal final
    return this.http.get<ProductoVitrinaDTO[]>(`${this.API_URL}/`);
  }
}