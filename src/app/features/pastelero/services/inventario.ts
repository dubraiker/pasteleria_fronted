import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoDTO {
  id?: number;
  id_categoria: number;
  nombre: string;
  descripcion: string;
  precio: number;
  etiqueta_yolo: string;
  estado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8000/api/productos';

  
  obtenerProductos(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.API_URL}/`);
  }

  
  crearProducto(producto: ProductoDTO): Observable<any> {
    return this.http.post(`${this.API_URL}/`, producto);
  }

  
  actualizarProducto(
    id: number,
    producto: ProductoDTO
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, producto);
  }

 
  desactivarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}