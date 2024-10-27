import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { single } from 'rxjs';
import { CategoriasResponse } from '../../../categorias/interfaces/categorias.interface';
import { RecursosService } from '../../services/recursos.service';

@Component({
  selector: 'app-crear-recurso',
  standalone: true,
  imports: [ReactiveFormsModule, ToastrModule],
  templateUrl: './crear-recurso.component.html',
  styleUrl: './crear-recurso.component.css'
})
export class CrearRecursoComponent implements OnInit{

  private toastrService = inject(ToastrService);
  private formGroup = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private categoriasService = inject(CategoriasService);
  private recursoService = inject(RecursosService);

  public isMobile = computed(() => this.layoutService.isMobile());
  public categoriasState = signal<{loading: boolean, categorias: CategoriasResponse[]}>({loading: true, categorias: []});

  public fromCrearRecurso = this.formGroup.group({
    id_dici: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    id_uta: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    ubicacion: ['', Validators.required],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  public dropMenuCategorias = signal<boolean>(false);
  ngOnInit(): void {
    this.categoriasService.getAllCategorias().subscribe((categorias) => { 
      this.categoriasState.set({loading: false, categorias});
    }); 
  }

  clickDropMenuCategorias() {
    this.dropMenuCategorias.set(!this.dropMenuCategorias());
  }

  crearRecurso() {

    if(this.fromCrearRecurso.invalid){
      this.fromCrearRecurso.markAllAsTouched();
      this.toastrService.error('Por favor, completa los campos', 'Error',{ positionClass: 'toast-bottom-center'});
      return;
    }

    const recurso : any = {
      id_dici: this.fromCrearRecurso.get('id_dici')?.value!,
      id_uta: this.fromCrearRecurso.get('id_uta')?.value!,
      marca: this.fromCrearRecurso.get('marca')?.value!,
      modelo: this.fromCrearRecurso.get('modelo')?.value!,
      ubicacion: this.fromCrearRecurso.get('ubicacion')?.value!,
      id_categoria: +this.fromCrearRecurso.get('categoria')?.value!,
      descripcion: this.fromCrearRecurso.get('descripcion')?.value!,
      nombre: this.fromCrearRecurso.get('nombre')?.value!,
      fecha_ingreso: new Date(),
    }

    console.log(recurso);

    this.recursoService.crearRecurso(recurso).subscribe({
      next: () => {
        this.toastrService.success('Recurso creado con éxito', 'Éxito',{ positionClass: 'toast-bottom-center'});
      },
      error: (res) => {
        console.log(recurso);
        console.log(res);
        this.toastrService.error(res.error.message, 'Error',{ positionClass: 'toast-bottom-center'});
      }
    });
    
  }

  hasRequiredError(controlName: string) {
    const control = this.fromCrearRecurso.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
}
