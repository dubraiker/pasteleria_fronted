import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlertaEmergenciaResponse {
  id: number;
  id_dispositivo: number;
  id_tipo_alerta: number;
  id_usuario_atencion?: number | null;
  mensaje: string;
  atendida: boolean;
  fecha_atencion?: string | null;
  dispositivo_nombre?: string;
  tipo_alerta_nombre?: string;
  nivel_riesgo?: string;
  creado: string;
}


@Injectable({
  providedIn: 'root'
})
export class IotService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/api/iot';

  obtenerAlertasPendientes(): Observable<AlertaEmergenciaResponse[]> {
    return this.http.get<AlertaEmergenciaResponse[]>(`${this.API_URL}/alertas/pendientes`);
  }

  atenderAlerta(alertaId: number, idUsuario: number): Observable<any> {
    return this.http.put(`${this.API_URL}/alertas/${alertaId}/atender?id_usuario=${idUsuario}`, {});
  }
}