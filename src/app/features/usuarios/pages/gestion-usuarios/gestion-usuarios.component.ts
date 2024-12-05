import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosResponse } from '../../interfaces/usuarios.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { LayoutService } from '../../../../core/layout/layout.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-gestion-usuarios',
    imports: [SpinnerComponent, NgClass],
    templateUrl: './gestion-usuarios.component.html',
    styleUrl: './gestion-usuarios.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class GestionUsuariosComponent implements OnInit {

  private usuarioServce = inject(UsuariosService);
  private router = inject(Router);
  private usuariosState = signal<{loading: boolean, usuarios: UsuariosResponse[]}>({loading: true, usuarios: []});
  private dialog = inject(MatDialog);
  private layoutService = inject(LayoutService);


  public usuarios = computed(() => {
    const sq = this.search(); 
    return this.usuariosState().usuarios.filter((usuario) => {
      return Object.values(usuario).some((value) => {
        // Asegúrate de manejar solo valores que puedan ser convertidos a string
        return String(value).toLowerCase().includes(sq);
      });
    });
    });
  public isLoading = computed(() => this.usuariosState().loading);
  public isMobile = computed(() => this.layoutService.isMobile());
  public search = signal<string>('');
  
  public currentPage = signal<number>(1);
  public totalPages : number[] = [];

  ngOnInit(): void {
    this.getAllUsuarios();
  }

 
  getAllUsuarios() {
    this.usuariosState.set({loading: true, usuarios: []});
    this.usuarioServce.getAllUsuarios(this.currentPage()).subscribe((res) => {
      console.log('Usuarios:', res);
      this.totalPages = Array.from({length: res.totalPages}, (_, i) => i + 1);
      this.usuariosState.set({loading: false, usuarios: res.data});
    });
  }

  onPageChange(page: number) {
    if(page < 1 || page > this.totalPages.length) return;
    this.currentPage.set(page);
    this.usuariosState.set({loading: true, usuarios: []});
    this.usuarioServce.getAllUsuarios(page).subscribe((res) => {
      this.usuariosState.set({loading: false, usuarios: res.data});
    });
  }

  onSearchUpdated(sq:string){
    this.search.set(sq);
  }
  crearUsuario() {
    this.router.navigate(['usuarios/crear-usuario']);
  }

  editarUsuario(id_usuario:number) {
    this.router.navigate([`usuarios/editar-usuario/${id_usuario}`]);
  }

  verUsuario() {}

  opendModalEliminarUsuario(rut: string) {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '600px',
      data: {rut},
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'Usuario eliminado') this.getAllUsuarios();
    });
  }
}
