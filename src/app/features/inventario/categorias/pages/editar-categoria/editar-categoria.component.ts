import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearCategoria } from '../../interfaces/crear-categoria.interface';
import { CategoriasResponse } from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {

  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  private toastrService = inject(ToastrService);
  private activateRouter = inject(ActivatedRoute);
  private router = inject(Router);

  public isMobile = computed(() => this.layoutService.isMobile());
  private categoriaState = signal<any>({loading: true, categoria:{}});
  public loading = computed(() => this.categoriaState().loading);
  public categoria = computed(() => this.categoriaState().categoria);

  public formEditarCategoria = this.formBuilder.group({
    nombre_categoria: ['', Validators.required],
    fecha_creacion: new Date().toISOString(),
  });

  ngOnInit(): void {
    this.setCategoriaById();
  }

  hasRequiredError(controlName: string) {
    const control = this.formEditarCategoria.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  setCategoriaById() {
    const idCategoria = +this.activateRouter.snapshot.params['id'];
    this.categoriasService.getCategoriaById(idCategoria).subscribe((categoria: any) => {
      this.categoriaState.set({loading: false, categoria});
      if(!categoria) {
        this.toastrService.error('Categoria no encontrada', 'Error', {positionClass: 'toast-bottom-center'});
        this.router.navigate(['/inventario/categorias']);
      }
      this.formEditarCategoria.patchValue({nombre_categoria: this.categoria().nombre_categoria});
    });
  }

  editarCategoria() {
    if (this.formEditarCategoria.invalid) {
      this.formEditarCategoria.markAllAsTouched();
      this.toastrService.error('Porfavor complete los campos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }
    console.log(this.formEditarCategoria.value);
    const categoria : any = {
      nombre_categoria: this.formEditarCategoria.get('nombre_categoria')?.value,
      fecha_creacion: this.formEditarCategoria.get('fecha_creacion')?.value,
    };

    const idCategoria = +this.activateRouter.snapshot.params['id'];

    this.categoriasService.editarCategoria(idCategoria,categoria).subscribe({
      next: () => {
        this.toastrService.success('Categoria editada con exito', 'Exito', {positionClass: 'toast-bottom-center'});
      },
      error: (e) => {
        this.toastrService.error('Error al editar la categoria', 'Error', {positionClass: 'toast-bottom-center'});
      },
    });
  }
}
