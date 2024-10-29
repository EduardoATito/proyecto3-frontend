import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./core/layout/dashboard/dashboard.component').then(c => c.DashboardComponent), 
    children: [
      { path: 'prestamos/regular', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-categoria/seleccionar-categoria.component').
        then(c => c.SeleccionarCategoriaComponent) },
      { path: 'prestamos/regular/:id_categoria', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-recurso/seleccionar-recurso.component').
        then(c => c.SeleccionarRecursoComponent)},
      { path: 'prestamos/regular/:id_categoria/:id_dici', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-estudiante/seleccionar-estudiante.component').
        then(c => c.SeleccionarEstudianteComponent)},
      { path: 'prestamos/regular/:id_categoria/:id_dici/metodo-qr', loadComponent: () => 
        import('./features/prestamos/regular/pages/metodo-qr/metodo-qr.component').
        then(c => c.MetodoQrComponent)},
      { path: 'prestamos/regular/:id_categoria/:id_dici/:rut', loadComponent: () => 
        import('./features/prestamos/regular/pages/confirmar-prestamo/confirmar-prestamo.component').
        then(c => c.ConfirmarPrestamoComponent)},
      { path: 'prestamos/seguimiento', loadComponent: () => 
        import('./features/prestamos/seguimiento/pages/seguimiento-prestamos/seguimiento-prestamos.component').
        then(c => c.SeguimientoPrestamosComponent)},
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
      { path: 'inventario/categorias/editar-categoria/:id', loadComponent: () => 
        import('./features/inventario/categorias/pages/editar-categoria/editar-categoria.component').
        then(c => c.EditarCategoriaComponent)},
      { path: 'penalizaciones', loadComponent: () => 
        import('./features/penalizaciones/pages/gestion-penalizaciones/gestion-penalizaciones.component').
        then(c => c.GestionPenalizacionesComponent)},
      { path: 'usuarios', loadComponent: () => 
        import('./features/usuarios/pages/gestion-usuarios/gestion-usuarios.component').
        then(c => c.GestionUsuariosComponent)},
      { path: 'usuarios/crear-usuario', loadComponent: () => 
        import('./features/usuarios/pages/crear-usuario/crear-usuario.component').
        then(c => c.CrearUsuarioComponent)},
      { path: 'usuarios/editar-usuario/:id', loadComponent: () => 
        import('./features/usuarios/pages/editar-usuario/editar-usuario.component').
        then(c => c.EditarUsuarioComponent)},
      
    ]
  },
  { path: 'login', loadComponent: () => 
    import('./core/auth/pages/login/login.component').
    then(c => c.LoginComponent)},
];
