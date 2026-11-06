
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  UsuarioService,
  UsuarioDTO,
  UsuarioCreateDTO
} from '../../services/usuario';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { CardComponent } from '../../../../shared/components/card/card';
import { DataTableComponent } from '../../../../shared/components/datatable/datatable';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    CardComponent,
    DataTableComponent,
    ButtonComponent,
    ModalComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    AlertBoxComponent
  ],

  templateUrl: './usuarios-page.html',
  styleUrl: './usuarios-page.css'
})

export class UsuariosPageComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private cd = inject(ChangeDetectorRef);

  usuarios: UsuarioDTO[] = [];

  cargando = false;
  modalAbierto = false;
  modoEdicion = false;

  usuarioEdicionId: number | null = null;

  mensaje = '';

  tipoAlerta: 'success' | 'error' = 'success';

  nuevoUsuario: UsuarioCreateDTO = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    id_perfil: 2
  };

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    this.cargando = true;

    this.usuarioService.obtenerUsuarios().subscribe({

      next: (data) => {

        this.usuarios = data.filter(usr => {

          const usuario = usr as UsuarioDTO & {
            activo?: boolean | string | null;
            estado?: boolean | string | null;
          };

          const esActivo = usuario.activo ?? usuario.estado ?? true;

          return esActivo !== false &&
                 String(esActivo).toLowerCase() !== 'false';

        });

        this.usuarios = [...this.usuarios];

        this.cargando = false;

        this.cd.detectChanges();

      },

      error: () => {

        this.cargando = false;

        this.mostrarMensaje(
          'Error al obtener la lista de usuarios',
          'error'
        );

        this.cd.detectChanges();

      }

    });

  }

  abrirModalCrear(): void {

    this.modoEdicion = false;

    this.usuarioEdicionId = null;

    this.nuevoUsuario = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      id_perfil: 2
    };

    this.modalAbierto = true;

  }

  abrirModalEditar(usr: UsuarioDTO): void {

    this.modoEdicion = true;

    this.usuarioEdicionId = usr.id || null;

    this.nuevoUsuario = {
      nombre: usr.nombre,
      apellido: usr.apellido,
      correo: usr.correo,
      password: '',
      id_perfil: usr.id_perfil
    };

    this.modalAbierto = true;

  }

  guardarUsuario(): void {

    this.cargando = true;

    if (this.modoEdicion && this.usuarioEdicionId) {

      this.usuarioService.actualizarUsuario(
        this.usuarioEdicionId,
        this.nuevoUsuario as any
      ).subscribe({

        next: () => {

          this.modalAbierto = false;

          this.mostrarMensaje(
            'Usuario actualizado correctamente',
            'success'
          );

          this.cargarUsuarios();

        },

        error: (err) => {

          this.cargando = false;

          this.mostrarMensaje(
            err.error?.detail || 'Error al actualizar el usuario',
            'error'
          );

          this.cd.detectChanges();

        }

      });

    } else {

      this.usuarioService.crearUsuarioAdmin(this.nuevoUsuario).subscribe({

        next: () => {

          this.modalAbierto = false;

          this.mostrarMensaje(
            'Usuario creado correctamente',
            'success'
          );

          this.cargarUsuarios();

        },

        error: (err) => {

          this.cargando = false;

          this.mostrarMensaje(
            err.error?.detail || 'Error al guardar el usuario',
            'error'
          );

          this.cd.detectChanges();

        }

      });

    }

  }

  eliminarUsuario(usr: UsuarioDTO): void {

    if (!usr.id) return;

    if (confirm(`¿Desea eliminar al usuario ${usr.nombre} ${usr.apellido}?`)) {

      this.cargando = true;

      this.usuarioService.eliminarUsuario(usr.id).subscribe({

        next: () => {

          this.mostrarMensaje(
            'Usuario eliminado correctamente',
            'success'
          );

          this.cargarUsuarios();

        },

        error: (err) => {

          this.cargando = false;

          this.mostrarMensaje(
            err.error?.detail || 'Error al eliminar el usuario',
            'error'
          );

          this.cd.detectChanges();

        }

      });

    }

  }

  obtenerNombrePerfil(idPerfil: number): string {

    switch (idPerfil) {

      case 1:
        return 'Administrador';

      case 2:
        return 'Pastelero';

      case 3:
        return 'Cliente';

      default:
        return 'Usuario Registrado';

    }

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
