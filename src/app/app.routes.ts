import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./core/layout/dashboard/dashboard.component').then(c => c.DashboardComponent), 
    children: [
      { path: 'prestamos/regular', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-categoria/seleccionar-categoria.component').
        then(c => c.SeleccionarCategoriaComponent) },
      { path: 'prestamos/gestion/:categoria', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-recurso/seleccionar-recurso.component').
        then(c => c.SeleccionarRecursoComponent)},
      { path: 'inventario/recursos', loadComponent: () => 
        import('./features/inventario/recursos/pages/gestion-recursos/gestion-recursos.component').
        then(c => c.GestionRecursosComponent)},
      { path: 'inventario/recursos/crear-recurso', loadComponent: () => 
        import('./features/inventario/recursos/pages/crear-recurso/crear-recurso.component').
        then(c => c.CrearRecursoComponent)},
      { path: 'inventario/recursos/editar-recurso/:id', loadComponent: () => 
        import('./features/inventario/recursos/pages/editar-recurso/editar-recurso.component').
        then(c => c.EditarRecursoComponent)},
      { path: 'inventario/categorias', loadComponent: () => 
        import('./features/inventario/categorias/pages/gestion-categorias/gestion-categorias.component').
        then(c => c.GestionCategoriasComponent)},
      { path: 'inventario/categorias/crear-categoria', loadComponent: () => 
        import('./features/inventario/categorias/pages/crear-categoria/crear-categoria.component').
        then(c => c.CrearCategoriaComponent)},
    ]
  },
  { path: 'login', loadComponent: () => 
    import('./core/auth/pages/login/login.component').
    then(c => c.LoginComponent)},
];
