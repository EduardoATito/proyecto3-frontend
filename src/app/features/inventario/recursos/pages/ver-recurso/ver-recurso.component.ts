import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriasResponse } from '../../../categorias/interfaces/categorias.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursosService } from '../../services/recursos.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ver-recurso',
  imports: [SpinnerComponent,ReactiveFormsModule],
  templateUrl: './ver-recurso.component.html',
  styleUrl: './ver-recurso.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
]
})
export class VerRecursoComponent implements OnInit {

  private formGroup = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  private activateRouter = inject(ActivatedRoute);
  private recursoService = inject(RecursosService);
  private categoriasService = inject(CategoriasService);


  private recursoState = signal<any>({loading: true, recursos: {}});	
  public recurso = computed(() => this.recursoState().recursos);
  public loading = computed(() => this.recursoState().loading);
  public categoriasState = signal<{loading: boolean, categorias: CategoriasResponse[]}>({loading: true, categorias: []});
  public formVerRecurso = this.formGroup.group({
    id_dici: [''],
    nombre: [''],
    id_uta: [''],
    marca: [''],
    modelo: [''],
    ubicacion: [''],
    categoria: [''],
    descripcion: [''],
  });


  ngOnInit(): void {
    this.formVerRecurso.disable();
    this.setRecursoByIdDICI();
    this.setAllCategorias();

  }
  
  setRecursoByIdDICI() {
    const recursoIdUta = this.activateRouter.snapshot.params['id']
    this.recursoService.getRecursoByIdDICI(recursoIdUta).subscribe((recurso) => {
      console.log(recurso);
      this.recursoState.set({loading: false, recurso});
      if(!recurso) {
        this.toastrService.error('Recurso no encontrado', 'Error',{ positionClass: 'toast-bottom-center'});
        this.router.navigate(['/inventario/recursos']);
      }
      this.formVerRecurso.patchValue({categoria: recurso.id_categoria.toString()});
      this.formVerRecurso.patchValue(recurso);
    });
  }

  setAllCategorias(){
    this.categoriasService.getAllCategorias().subscribe((categorias) => { 
      this.categoriasState.set({loading: false, categorias});
    }); 
  }


  public isMobile = computed(() => this.layoutService.isMobile());

  hasRequiredError(controlName: string) {
    const control = this.formVerRecurso.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  volver() {
    this.router.navigate(['/inventario/recursos']);
  }

}
