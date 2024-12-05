import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { CategoriasService } from '../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-crear-categoria',
    imports: [ReactiveFormsModule],
    templateUrl: './crear-categoria.component.html',
    styleUrl: './crear-categoria.component.css',
    animations: [
      trigger('notLoading', [
          transition(':enter', [
              style({ opacity: 0 }),
              animate('300ms ease-out', style({ opacity: 1 }))
          ]),
      ])
  ]
})
export class CrearCategoriaComponent {

  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  public loadingCrearCategoria = signal(false);

  public isMobile = computed(() => this.layoutService.isMobile());

  public formCrearCategoria = this.formBuilder.group({
    nombre_categoria: ['', Validators.required],
  });

  crearCategoria() {
    if(this.formCrearCategoria.invalid){
      this.formCrearCategoria.markAllAsTouched();
      this.toastrService.error('Porfavor complete los campos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }

    const categoria : any = {
      nombre_categoria: this.formCrearCategoria.get('nombre_categoria')?.value,
      fecha_creacion: new Date(),
    };

    this.loadingCrearCategoria.set(true);
    this.categoriasService.crearCategoria(categoria).subscribe({
      next: () => {
        this.router.navigate(['/inventario/categorias']);
        this.toastrService.success('Categoria creada con exito', 'Exito', {positionClass: 'toast-bottom-center'});
      },error: (err) => {
        this.loadingCrearCategoria.set(false);
        this.toastrService.error('Error al crear la categoria', 'Error', {positionClass: 'toast-bottom-center'});
      }
    });

    console.log(categoria);
  }

  hasRequiredError(controlName: string) {
    const control = this.formCrearCategoria.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  cancelar(){
    this.router.navigate(['/inventario/categorias']);
  }
}
