import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { reverseAuthGuard } from './core/auth/guards/reverse-auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./core/layout/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivateChild: [authGuard], 
    children: [
      { path: '',  loadComponent:() => import('./features/inicio/pages/inicio/inicio.component').
        then(c => c.InicioComponent),
        title: 'Dashboard',
      },
      { path: 'perfil',  loadComponent:() => import('./core/auth/pages/profile/profile.component').
        then(c => c.ProfileComponent),  
        title: 'Perfil',
      },
      { path: 'prestamos/regular', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-categoria/seleccionar-categoria.component').
        then(c => c.SeleccionarCategoriaComponent),
        title: 'Prestamos Regular'
      },
      { path: 'prestamos/regular/:id_categoria', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-recurso/seleccionar-recurso.component').
        then(c => c.SeleccionarRecursoComponent),
        title: 'Prestamos Regular'
      },
      { path: 'prestamos/regular/:id_categoria/:id_dici', loadComponent: () => 
        import('./features/prestamos/regular/pages/seleccionar-estudiante/seleccionar-estudiante.component').
        then(c => c.SeleccionarEstudianteComponent),
        title: 'Prestamos Regular'
      },
      { path: 'prestamos/regular/:id_categoria/:id_dici/metodo-qr', loadComponent: () => 
        import('./features/prestamos/regular/pages/metodo-qr/metodo-qr.component').
        then(c => c.MetodoQrComponent),
        title: 'Metodo QR'
      },
      { path: 'prestamos/regular/:id_categoria/:id_dici/:rut', loadComponent: () => 
        import('./features/prestamos/regular/pages/confirmar-prestamo/confirmar-prestamo.component').
        then(c => c.ConfirmarPrestamoComponent),
        title: 'Confirmar Prestamo'
      },
      { path: 'prestamos/seguimiento', loadComponent: () => 
        import('./features/prestamos/seguimiento/pages/seguimiento-prestamos/seguimiento-prestamos.component').
        then(c => c.SeguimientoPrestamosComponent),
        title: 'Seguimiento'
      },
      { path: 'prestamos-especiales', loadComponent: () => 
        import('./features/prestamos/especial/pages/gestion-prestamos-especial/gestion-prestamos-especial.component').
        then(c => c.GestionPrestamosEspecialComponent),
        title: 'Prestamos Especiales'
      },
      { path: 'prestamos-especiales/crear-prestamos-especial', loadComponent: () => 
        import('./features/prestamos/especial/pages/crear-prestamo-especial/crear-prestamo-especial.component').
        then(c => c.CrearPrestamoEspecialComponent),
        title: 'Crear Prestamo Especial'
      },
      { path: 'prestamos-especiales/editar-prestamo-especial/:id', loadComponent: () => 
        import('./features/prestamos/especial/pages/editar-prestamo-especial/editar-prestamo-especial.component').
        then(c => c.EditarPrestamoEspecialComponent),
        title: 'Editar Prestamo Especial'
      },
      { path: 'prestamos-especiales/ver-prestamo-especial/:id', loadComponent: () => 
        import('./features/prestamos/especial/pages/ver-prestamo-especial/ver-prestamo-especial.component').
        then(c => c.VerPrestamoEspecialComponent),
        title: 'Ver Prestamo Especial'
      },
      { path: 'prestamos/historial', loadComponent: () => 
        import('./features/prestamos/historial/pages/historial/historial.component').
        then(c => c.HistorialComponent),
        title: 'Historial'
      },  
      { path: 'inventario/recursos', loadComponent: () => 
        import('./features/inventario/recursos/pages/gestion-recursos/gestion-recursos.component').
        then(c => c.GestionRecursosComponent),
        title: 'Recursos'
      },
      { path: 'inventario/recursos/crear-recurso', loadComponent: () => 
        import('./features/inventario/recursos/pages/crear-recurso/crear-recurso.component').
        then(c => c.CrearRecursoComponent),
        title: 'Crear Recurso'
      },
      { path: 'inventario/recursos/ver-recurso/:id', loadComponent: () => 
        import('./features/inventario/recursos/pages/ver-recurso/ver-recurso.component').
        then(c => c.VerRecursoComponent),
        title: 'Ver Recurso'
      },
      { path: 'inventario/recursos/editar-recurso/:id', loadComponent: () => 
        import('./features/inventario/recursos/pages/editar-recurso/editar-recurso.component').
        then(c => c.EditarRecursoComponent),
        title: 'Editar Recurso'
      },
      { path: 'inventario/categorias', loadComponent: () => 
        import('./features/inventario/categorias/pages/gestion-categorias/gestion-categorias.component').
        then(c => c.GestionCategoriasComponent),
        title: 'Categorias'
      },
      { path: 'inventario/categorias/crear-categoria', loadComponent: () => 
        import('./features/inventario/categorias/pages/crear-categoria/crear-categoria.component').
        then(c => c.CrearCategoriaComponent),
        title: 'Crear Categoria'
      },
      { path: 'inventario/categorias/editar-categoria/:id', loadComponent: () => 
        import('./features/inventario/categorias/pages/editar-categoria/editar-categoria.component').
        then(c => c.EditarCategoriaComponent),
        title: 'Editar Categoria'
      },
      { path: 'penalizaciones', loadComponent: () => 
        import('./features/penalizaciones/pages/gestion-penalizaciones/gestion-penalizaciones.component').
        then(c => c.GestionPenalizacionesComponent),
        title: 'Penalizaciones'
      },
      {
        path: 'penalizaciones/crear-penalizacion', loadComponent: () => 
        import('./features/penalizaciones/pages/crear-penalizacion/crear-penalizacion.component').
        then(c => c.CrearPenalizacionComponent),
        title: 'Crear Penalizacion'
      },
      { path: 'usuarios', loadComponent: () => 
        import('./features/usuarios/pages/gestion-usuarios/gestion-usuarios.component').
        then(c => c.GestionUsuariosComponent),
        title: 'Usuarios'
      },
      { path: 'usuarios/crear-usuario', loadComponent: () => 
        import('./features/usuarios/pages/crear-usuario/crear-usuario.component').
        then(c => c.CrearUsuarioComponent),
        title: 'Crear Usuario'
      },
      { path: 'usuarios/editar-usuario/:id', loadComponent: () => 
        import('./features/usuarios/pages/editar-usuario/editar-usuario.component').
        then(c => c.EditarUsuarioComponent),
        title: 'Editar Usuario'
      },
      { path: 'estudiantes', loadComponent: () => 
        import('./features/estudiantes/pages/gestion-estudiantes/gestion-estudiantes.component').
        then(c => c.GestionEstudiantesComponent),
        title: 'Estudiantes'
      },
      { path: 'estudiantes/crear-estudiante', loadComponent: () => 
        import('./features/estudiantes/pages/crear-estudiante/crear-estudiante.component').
        then(c => c.CrearEstudianteComponent),
        title: 'Crear Estudiante'
      },
      { path: 'estudiantes/ver-estudiante/:rut', loadComponent: () => 
        import('./features/estudiantes/pages/ver-estudiante/ver-estudiante.component').
        then(c => c.VerEstudianteComponent),
        title: 'Ver Estudiante'
      },
      { path: 'estudiantes/editar-estudiante/:rut', loadComponent: () => 
        import('./features/estudiantes/pages/editar-estudiante/editar-estudiante.component').
        then(c => c.EditarEstudianteComponent),
        title: 'Editar Estudiante'
      },
    
    ]
  },
  { path: 'login', loadComponent: () => 
    import('./core/auth/pages/login/login.component').
    then(c => c.LoginComponent),
    title: 'Login',
    canActivate: [reverseAuthGuard]
  },
];
