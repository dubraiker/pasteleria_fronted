import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then(m => m.LoginPageComponent)
  },
 
  {
    path: 'admin/usuarios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/pages/usuarios-page/usuarios-page').then(m => m.UsuariosPageComponent)
  },
  {
    path: 'admin/alertas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pastelero/pages/alertas-page/alertas-page').then(m => m.AlertasPageComponent)
  },
 
  {
    path: 'admin/usuarios-directorio',
    redirectTo: 'cliente/usuarios-directorio',
    pathMatch: 'full'
  },
  
  {
    path: 'pastelero/inventario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pastelero/pages/inventario-page/inventario-page').then(m => m.InventarioPageComponent)
  },
  {
    path: 'pastelero/alertas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pastelero/pages/alertas-page/alertas-page').then(m => m.AlertasPageComponent)
  },
  {
    path: 'pastelero/alertas-estado',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pastelero/pages/alertas-page/alertas-page').then(m => m.AlertasPageComponent)
  },

{
  path: 'cliente/catalogo',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/cliente/pages/catalogo-page/catalogo-page').then(m => m.CatalogoPageComponent)
},
{
  path: 'cliente/catalogo-publico',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/cliente/pages/catalogo-page/catalogo-page').then(m => m.CatalogoPageComponent)
}]