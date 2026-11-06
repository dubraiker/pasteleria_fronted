

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  InventarioService,
  ProductoDTO
} from '../../services/inventario';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { CardComponent } from '../../../../shared/components/card/card';
import { DataTableComponent } from '../../../../shared/components/datatable/datatable';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box';

@Component({
  selector: 'app-inventario-page',
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
  templateUrl: './inventario-page.html',
  styleUrl: './inventario-page.css'
})
export class InventarioPageComponent implements OnInit {

  private inventarioService = inject(InventarioService);
  private cd = inject(ChangeDetectorRef);

  productos: ProductoDTO[] = [];

  cargando = false;
  modalAbierto = false;
  modoEdicion = false;
  productoEdicionId: number | null = null;

  mensaje = '';
  tipoAlerta: 'success' | 'error' = 'success';

  nuevoProducto: ProductoDTO = {
    id_categoria: 1,
    nombre: '',
    descripcion: '',
    precio: 0,
    etiqueta_yolo: ''
  };

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;

    this.inventarioService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data.filter(p => p.estado !== false);
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.mostrarMensaje(
          'Error al obtener el inventario de la API',
          'error'
        );
        this.cd.detectChanges();
      }
    });
  }

  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.productoEdicionId = null;

    this.nuevoProducto = {
      id_categoria: 1,
      nombre: '',
      descripcion: '',
      precio: 0,
      etiqueta_yolo: ''
    };

    this.modalAbierto = true;
  }

  abrirModalEditar(prod: ProductoDTO): void {
    if (!prod.id) {
      this.mostrarMensaje('No se encontró el ID del producto', 'error');
      return;
    }

    this.modoEdicion = true;
    this.productoEdicionId = prod.id;
    this.nuevoProducto = { ...prod };

    this.modalAbierto = true;
  }

  guardarProducto(): void {
    if (this.cargando) return;

    const payload = {
      id_categoria: Number(this.nuevoProducto.id_categoria) || 1,
      nombre: String(this.nuevoProducto.nombre).trim(),
      descripcion: this.nuevoProducto.descripcion
        ? String(this.nuevoProducto.descripcion).trim()
        : '',
      precio: parseFloat(String(this.nuevoProducto.precio)),
      etiqueta_yolo: String(this.nuevoProducto.etiqueta_yolo).trim()
    };

    if (
      !payload.nombre ||
      !payload.etiqueta_yolo ||
      !Number.isFinite(payload.precio) ||
      payload.precio < 0
    ) {
      this.mostrarMensaje(
        'Verifica el nombre, la etiqueta YOLO y el precio del producto',
        'error'
      );
      return;
    }

    this.cargando = true;

    if (this.modoEdicion && this.productoEdicionId !== null) {
      this.inventarioService.actualizarProducto(
        this.productoEdicionId,
        payload
      ).subscribe({
        next: () => {
          this.modalAbierto = false;
          this.mostrarMensaje(
            'Producto actualizado exitosamente',
            'success'
          );
          this.cargarProductos();
        },
        error: (err) => {
          this.cargando = false;
          console.error('Error devuelto por la API:', err.error);
          this.mostrarMensaje(
            err.error?.detail || 'Error al actualizar el producto',
            'error'
          );
          this.cd.detectChanges();
        }
      });
    } else {
      this.inventarioService.crearProducto(payload).subscribe({
        next: () => {
          this.modalAbierto = false;
          this.mostrarMensaje(
            'Producto agregado exitosamente al inventario',
            'success'
          );
          this.cargarProductos();
        },
        error: (err) => {
          this.cargando = false;
          console.error('Error devuelto por la API:', err.error);
          this.mostrarMensaje(
            err.error?.detail || 'Error al guardar el producto',
            'error'
          );
          this.cd.detectChanges();
        }
      });
    }
  }

  eliminarProducto(prod: ProductoDTO): void {
    if (!prod.id || this.cargando) return;

    if (confirm(`¿Desea retirar el producto "${prod.nombre}" del catálogo activo?`)) {
      this.cargando = true;

      this.inventarioService.desactivarProducto(prod.id).subscribe({
        next: () => {
          this.productos = this.productos.filter(
            p => p.id !== prod.id
          );

          this.cargando = false;

          this.mostrarMensaje(
            'Producto retirado del inventario',
            'success'
          );

          this.cd.detectChanges();
        },
        error: (err) => {
          this.cargando = false;

          this.mostrarMensaje(
            err.error?.detail || 'Error al retirar el producto',
            'error'
          );

          this.cd.detectChanges();
        }
      });
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
