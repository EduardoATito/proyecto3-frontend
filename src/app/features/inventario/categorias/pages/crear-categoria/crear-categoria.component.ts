import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { CategoriasService } from '../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {

  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  private toastrService = inject(ToastrService);

  public isMobile = computed(() => this.layoutService.isMobile());

  public formCrearCategoria = this.formBuilder.group({
    nombre_categoria: ['', Validators.required],
    fecha_creacion: new Date(),
  });

  crearCategoria() {
    if(this.formCrearCategoria.invalid){
      this.formCrearCategoria.markAllAsTouched();
      this.toastrService.error('Porfavor complete los campos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }

    const categoria = {
      nombre_categoria: this.formCrearCategoria.get('nombre_categoria')?.value,
      fecha_creacion: this.formCrearCategoria.get('fecha_creacion')?.value,
    };

    console.log(categoria);

    this.categoriasService.crearCategoria(categoria).subscribe({
      next: () => {
        this.toastrService.success('Categoria creada con exito', 'Exito', {positionClass: 'toast-bottom-center'});
      },error: (err) => {
        console.log(err);
        this.toastrService.error('Error al crear la categoria', 'Error', {positionClass: 'toast-bottom-center'});
      }
    });

    console.log(categoria);
  }

  hasRequiredError(controlName: string) {
    const control = this.formCrearCategoria.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
}
