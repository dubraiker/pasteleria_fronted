
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  CatalogoService,
  ProductoVitrinaDTO
} from '../../services/catalogo';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { CardComponent } from '../../../../shared/components/card/card';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,

  imports: [
    CommonModule,
    PageHeaderComponent,
    CardComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    AlertBoxComponent
  ],

  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css'
})

export class CatalogoPageComponent implements OnInit {

  private catalogoService = inject(CatalogoService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  titulo: string = 'Catálogo & Vitrina de Repostería';

  subtitulo: string = 'Explora nuestra variedad de pasteles artesanales disponibles en tienda';

  productos: ProductoVitrinaDTO[] = [];

  cargando = false;
  mensaje = '';

  ngOnInit(): void {

    this.definirTitulosSegunRuta();

    this.cargarProductos();

  }

  definirTitulosSegunRuta(): void {

    const urlActual = this.router.url;

    if (urlActual.includes('catalogo-publico')) {

      this.titulo = 'Catálogo de Productos Disponibles';

      this.subtitulo = 'Consulta los productos disponibles en tiempo real en nuestra vitrina';

    } else {

      this.titulo = 'Catálogo & Vitrina de Repostería';

      this.subtitulo = 'Explora nuestra variedad de pasteles artesanales disponibles en tienda';

    }

  }

  cargarProductos(): void {

    this.cargando = true;
    this.mensaje = '';

    this.catalogoService.obtenerCatalogoPublico().subscribe({

      next: (data) => {

        this.productos = [...data];

        this.cargando = false;

        this.cd.detectChanges();

      },

      error: () => {

        this.cargando = false;

        this.mensaje = 'Error al conectar con la base de datos para cargar la vitrina de productos';

        this.cd.detectChanges();

      }

    });

  }

}
