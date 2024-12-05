import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-eliminar-usuario',
    imports: [],
    templateUrl: './eliminar-usuario.component.html',
    styleUrl: './eliminar-usuario.component.css'
})
export class EliminarUsuarioComponent {

  private dialogRef = inject(MatDialogRef<EliminarUsuarioComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private usuarioService = inject(UsuariosService);
  private toasterService = inject(ToastrService);
  private router = inject(Router);

  closeDialog(){
    this.dialogRef.close();
  }

  eliminarUsuario(){
    const rut = this.data.rut;
    this.usuarioService.eliminarUsuario(rut).subscribe({
      next: () => {
        this.dialogRef.close('Usuario eliminado');
        this.toasterService.success('Usuario eliminado con exito', 'Exito', { positionClass: 'toast-bottom-center' });
        
      },
      error: (error) => {
        this.toasterService.error(error.error.message, 'Error', { positionClass: 'toast-bottom-center' });
      }
    });
  }
}
