import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../../../core/layout/layout.service';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ver-estudiante',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './ver-estudiante.component.html',
  styleUrl: './ver-estudiante.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class VerEstudianteComponent {
  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private activateRouter = inject(ActivatedRoute);
  private toastrService = inject(ToastrService);
  private estudianteService = inject(EstudiantesService);

  public isMobile = computed(() => this.layoutService.isMobile());
  public loadingEditarEstudiante = signal(false);
  public estudianteState = signal<{loading:boolean, estudiante: Estudiante | null}>({loading: true, estudiante: null});


  public formVerEstudiante = this.formBuilder.group({
    nombre: [{value:'',disabled:true}, Validators.required],
    rut: [{value:'',disabled:true}, Validators.required],
    direccion: [{value:'',disabled:true}, Validators.required],
    fono: [{value:'',disabled:true}, Validators.required],
    correo: [{value:'',disabled:true}, Validators.required],
    ingreso: [{value:'',disabled:true}, Validators.required],
    estado: [{value:'',disabled:true}, Validators.required],
  });

  ngOnInit(): void {
    this.setEstudiate();
  
  }

  crearEstudiante(){
    
    if(this.formVerEstudiante.invalid){
      this.formVerEstudiante.markAllAsTouched();
      this.toastr.error('Por favor, complete los campos requeridos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }

    this.loadingEditarEstudiante.set(true);

    const estudiante  = {
      nombre: this.formVerEstudiante.get('nombre')?.value!,
      rut: this.formVerEstudiante.get('rut')?.value!,
      direccion: this.formVerEstudiante.get('direccion')?.value!,
      fono: this.formVerEstudiante.get('fono')?.value!,
      correo: this.formVerEstudiante.get('correo')?.value!,
      ingreso: +this.formVerEstudiante.get('ingreso')?.value!,
    };

    this.estudianteService.crearEstudiante(estudiante).subscribe({
      next: (response) => {
        this.loadingEditarEstudiante.set(false);
        this.toastr.success('Estudiante creado correctamente', 'Éxito', {positionClass: 'toast-bottom-center'});
        this.router.navigate(['/estudiantes']);
      },
      error: (error) => {
        this.loadingEditarEstudiante.set(false);
        this.toastr.error(error.error.message, 'Error', {positionClass: 'toast-bottom-center'});
      }
    });
  }

  cancelar(){
    this.router.navigate(['/estudiantes']);
  }

  hasRequiredError(controlName: string) {
    const control = this.formVerEstudiante.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  setEstudiate(){
    const rut = this.activateRouter.snapshot.params['rut']
    this.estudianteService.getEstudianteByRut(rut).subscribe((estudiante) => {
      console.log(estudiante);
      this.estudianteState.set({loading: false, estudiante});
      if(!estudiante) {
        this.toastrService.error('Estudiante no encontrado', 'Error',{ positionClass: 'toast-bottom-center'});
        this.router.navigate(['/estudiantes']);
      }
      this.formVerEstudiante.patchValue(estudiante)
      this.formVerEstudiante.patchValue({estado: estudiante.estado ? 'Activo' : 'Inactivo'});
    });
  }
}
