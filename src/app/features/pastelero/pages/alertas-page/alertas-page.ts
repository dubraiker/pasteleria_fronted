
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IotService,
  AlertaEmergenciaResponse
} from '../../services/iot';

import { AuthService } from '../../../../core/services/auth.service';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { CardComponent } from '../../../../shared/components/card/card';
import { DataTableComponent } from '../../../../shared/components/datatable/datatable';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box';

@Component({
  selector: 'app-alertas-page',
  standalone: true,

  imports: [
    CommonModule,
    PageHeaderComponent,
    CardComponent,
    DataTableComponent,
    ButtonComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    AlertBoxComponent
  ],

  templateUrl: './alertas-page.html',
  styleUrl: './alertas-page.css'
})

export class AlertasPageComponent implements OnInit {

  private iotService = inject(IotService);
  private authService = inject(AuthService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);

  titulo = 'Monitoreo IoT y Atención de Alertas';

  subtitulo = 'Telemetría en tiempo real de temperatura, humedad y sensores ESP32';

  alertas: AlertaEmergenciaResponse[] = [];

  cargando = false;
  mensaje = '';

  tipoAlerta: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.configurarTitulos();
    this.cargarAlertas();
  }

  
  configurarTitulos(): void {

    const urlActual = this.router.url;

    if (urlActual.includes('alertas-estado')) {

      this.titulo = 'Estado de Sensores en Vivo y Telemetría';

      this.subtitulo = 'Visualización en tiempo real del estado operacional de dispositivos IoT';

    } else {

      this.titulo = 'Monitoreo IoT y Atención de Alertas';

      this.subtitulo = 'Telemetría en tiempo real de temperatura, humedad y sensores de presencia ESP32';

    }

  }

  
  cargarAlertas(): void {

    this.cargando = true;

    this.iotService.obtenerAlertasPendientes().subscribe({

      next: (data) => {

        this.alertas = [...data];

        this.cargando = false;

        this.cd.detectChanges();

      },

      error: () => {

        this.cargando = false;

        this.mostrarMensaje(
          'Error al obtener alertas de la red IoT',
          'error'
        );

        this.cd.detectChanges();

      }

    });

  }

  
  atender(alerta: AlertaEmergenciaResponse): void {

    const usr = this.authService.usuarioActual();

    if (!usr) {

      this.mostrarMensaje(
        'No se encontró un usuario autenticado',
        'error'
      );

      return;

    }

    if (this.cargando) return;

    this.cargando = true;

    this.iotService.atenderAlerta(alerta.id, usr.id).subscribe({

      next: () => {

        this.mostrarMensaje(
          'Alerta registrada como atendida exitosamente',
          'success'
        );

        this.cargarAlertas();

      },

      error: () => {

        this.cargando = false;

        this.mostrarMensaje(
          'Error al registrar la atención de la alerta',
          'error'
        );

        this.cd.detectChanges();

      }

    });

  }

  
  private mostrarMensaje(
    msg: string,
    tipo: 'success' | 'error'
  ): void {

    this.mensaje = msg;

    this.tipoAlerta = tipo;

    this.cd.detectChanges();

    setTimeout(() => {

      this.mensaje = '';

      this.cd.detectChanges();

    }, 4000);

  }

}
