import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CategoriasService } from '../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-eliminar-categoria',
    imports: [MatDialogActions, MatDialogClose, MatDialogContent],
    templateUrl: './eliminar-categoria.component.html',
    styleUrl: './eliminar-categoria.component.css'
})
export class EliminarCategoriaComponent {

  private dialogRef = inject(MatDialogRef<EliminarCategoriaComponent>);
  private categoriasService = inject(CategoriasService);
  public toasterService = inject(ToastrService);
  private router = inject(Router);

  private data = inject(MAT_DIALOG_DATA);

  eliminarCategoria() {
    const id_categoria = this.data.id_categoria;
    this.categoriasService.eliminarCategoria(id_categoria).subscribe({
      next: () => {
        this.closeDialog();
        this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
          this.router.navigate(['/inventario/categorias']).then(()=>{
            this.toasterService.success('Categoria eliminada con exito', 'Exito', { positionClass: 'toast-bottom-center' });
          })
        })
      },
      error: (err) => {
        this.toasterService.error('Error al eliminar la categoria', 'Error', { positionClass: 'toast-bottom-center' });
      },
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
