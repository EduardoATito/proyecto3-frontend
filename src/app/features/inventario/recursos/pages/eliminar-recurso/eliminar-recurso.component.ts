import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EliminarCategoriaComponent } from '../../../categorias/pages/eliminar-categoria/eliminar-categoria.component';
import { RecursosService } from '../../services/recursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-recurso',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-recurso.component.html',
  styleUrl: './eliminar-recurso.component.css'
})
export class EliminarRecursoComponent {

  private dialogRef = inject(MatDialogRef<EliminarCategoriaComponent>);
  private recursoService = inject(RecursosService);
  private toasterService = inject(ToastrService);
  private router = inject(Router);
  private data = inject(MAT_DIALOG_DATA);

  closeDialog(){
    this.dialogRef.close();
  }

  eliminarRecurso(){
    const id_dici = this.data.id_dici;
    this.recursoService.eliminarRecurso(id_dici).subscribe({
      next: () => {
        this.dialogRef.close('eliminado');
        this.toasterService.success('Recurso eliminado con exito', 'Exito', {positionClass: 'toast-bottom-center'});
      },error: (err) => {
        this.closeDialog();
        this.toasterService.error('Error al eliminar el recurso', 'Error', {positionClass: 'toast-bottom-center'});
      }
    });
  }
}
