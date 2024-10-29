import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosResponse } from '../../interfaces/usuarios.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
})
export class GestionUsuariosComponent implements OnInit {

  private usuarioServce = inject(UsuariosService);
  private router = inject(Router);
  private usuariosState = signal<{loading: boolean, usuarios: UsuariosResponse[]}>({loading: true, usuarios: []});
  private dialog = inject(MatDialog);


  public usuarios = computed(() => this.usuariosState().usuarios);
  public isLoading = computed(() => this.usuariosState().loading);

  ngOnInit(): void {
    this.getAllUsuarios();
  }

 
  getAllUsuarios() {
    this.usuarioServce.getAllUsuarios().subscribe((res) => {
      this.usuariosState.set({loading: false, usuarios: res});
    });
  }

  crearUsuario() {
    this.router.navigate(['usuarios/crear-usuario']);
  }

  editarUsuario(id_usuario:number) {
    this.router.navigate([`usuarios/editar-usuario/${id_usuario}`]);
  }

  verUsuario() {}

  opendModalEliminarUsuario(rut: string) {
    this.dialog.open(EliminarUsuarioComponent, {
      width: '600px',
      data: {rut},
      enterAnimationDuration: 200,
      exitAnimationDuration: 200
    });
  }
}
