import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { RecursosService } from '../../services/recursos.service';
import { CategoriasResponse } from '../../../categorias/interfaces/categorias.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { delay } from 'rxjs';

@Component({
  selector: 'app-editar-recurso',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './editar-recurso.component.html',
  styleUrl: './editar-recurso.component.css',
  animations: [
    trigger('notLoading', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1})) 
      ]),
    ])
  ]
})
export class EditarRecursoComponent {

  private toastrService = inject(ToastrService);
  private formGroup = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private categoriasService = inject(CategoriasService);
  private recursoService = inject(RecursosService);
  private activateRouter = inject(ActivatedRoute);
  private router = inject(Router);

  public isMobile = computed(() => this.layoutService.isMobile());
  public categoriasState = signal<{loading: boolean, categorias: CategoriasResponse[]}>({loading: true, categorias: []});

  private recursoState = signal<any>({loading: true, recurso: {}});
  public recurso = computed(() => this.recursoState().recurso);
  public loading = computed(() => this.recursoState().loading);

  public loadingEditarRecurso = signal(false);

  public fromEditarRecurso = this.formGroup.group({
    id_dici: ['', [Validators.required]],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    ubicacion: ['', Validators.required],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  public dropMenuCategorias = signal<boolean>(false);

  ngOnInit(): void {

    this.setRecursoByIdDICI();
    this.setAllCategorias();

  }

  setRecursoByIdDICI() {
    const recursoIdUta = this.activateRouter.snapshot.params['id']
    console.log(recursoIdUta);
    this.recursoService.getRecursoByIdDICI(recursoIdUta).subscribe((recurso) => {
      console.log(recurso);
      this.recursoState.set({loading: false, recurso});
      if(!recurso) {
        this.toastrService.error('Recurso no encontrado', 'Error',{ positionClass: 'toast-bottom-center'});
        this.router.navigate(['/inventario/recursos']);
      }
      this.fromEditarRecurso.patchValue({categoria: recurso.id_categoria.toString()});
      this.fromEditarRecurso.patchValue(recurso);
    });
  }

  setAllCategorias(){
    this.categoriasService.getAllCategorias().subscribe((categorias) => { 
      this.categoriasState.set({loading: false, categorias});
    }); 
  }

  editarRecurso() {

    if(this.fromEditarRecurso.invalid){
      this.fromEditarRecurso.markAllAsTouched();
      this.toastrService.error('Por favor, completa los campos', 'Error',{ positionClass: 'toast-bottom-center'});
      return;
    }

    const recurso : any = {
      id_dici: this.fromEditarRecurso.get('id_dici')?.value!,
      marca: this.fromEditarRecurso.get('marca')?.value!,
      modelo: this.fromEditarRecurso.get('modelo')?.value!,
      ubicacion: this.fromEditarRecurso.get('ubicacion')?.value!,
      id_categoria: +this.fromEditarRecurso.get('categoria')?.value!,
      descripcion: this.fromEditarRecurso.get('descripcion')?.value!,
      fecha_ingreso: new Date(),
    }

    this.loadingEditarRecurso.set(true);

    this.recursoService.editarRecurso(this.recurso().id_dici,recurso).subscribe({
      next: () => {
        this.router.navigate(['/inventario/recursos']);
        this.toastrService.success('Recurso editado con éxito', 'Éxito',{ positionClass: 'toast-bottom-center'});
      },
      error: (res) => {
        this.loadingEditarRecurso.set(false);
        this.toastrService.error(res.error.message, 'Error',{ positionClass: 'toast-bottom-center'});
      }
    });
    
  }

  hasRequiredError(controlName: string) {
    const control = this.fromEditarRecurso.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

}
