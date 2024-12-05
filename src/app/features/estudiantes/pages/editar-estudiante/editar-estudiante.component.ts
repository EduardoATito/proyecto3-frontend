import { Component, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../../../../core/layout/layout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-editar-estudiante',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-estudiante.component.html',
  styleUrl: './editar-estudiante.component.css'
})
export class EditarEstudianteComponent {
  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private estudianteService = inject(EstudiantesService);
  private activeRoute = inject(ActivatedRoute);
  private toastrService = inject(ToastrService);

  public isMobile = computed(() => this.layoutService.isMobile());
  public loadingEditarEstudiante = signal(false);
  public estudianteState = signal<{loading:boolean, estudiante: Estudiante | null}>({loading: true, estudiante: null});


  public formEditarEstudiante = this.formBuilder.group({
    nombre: ['', Validators.required],
    rut: [{value:'',disabled:true}, Validators.required],
    direccion: ['', Validators.required],
    fono: ['', Validators.required],
    correo: ['', Validators.required],
    ingreso: ['', Validators.required],
    estado: [{value:'', disabled:true}, Validators.required],
  });

  ngOnInit(): void {

    this.setEstudiate();
  }

  setEstudiate(){
    const rut = this.activeRoute.snapshot.params['rut']
    this.estudianteService.getEstudianteByRut(rut).subscribe((estudiante) => {
      console.log(estudiante);
      this.estudianteState.set({loading: false, estudiante});
      if(!estudiante) {
        this.toastrService.error('Estudiante no encontrado', 'Error',{ positionClass: 'toast-bottom-center'});
        this.router.navigate(['/estudiantes']);
      }
      this.formEditarEstudiante.patchValue(estudiante)
      this.formEditarEstudiante.patchValue({estado: estudiante.estado ? '1' : '0'});
    });
  }

  EditarEstudiante(){
    
    if(this.formEditarEstudiante.invalid){
      this.formEditarEstudiante.markAllAsTouched();
      this.toastr.error('Por favor, complete los campos requeridos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }

    this.loadingEditarEstudiante.set(true);

    const estudiante  = {
      nombre: this.formEditarEstudiante.get('nombre')?.value!,
      rut: this.formEditarEstudiante.get('rut')?.value!,
      direccion: this.formEditarEstudiante.get('direccion')?.value!,
      fono: this.formEditarEstudiante.get('fono')?.value!,
      correo: this.formEditarEstudiante.get('correo')?.value!,
      ingreso: +this.formEditarEstudiante.get('ingreso')?.value!,
    };

    const rut = this.activeRoute.snapshot.params['rut'];

    this.estudianteService.editarEstudiante(estudiante,rut).subscribe({
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
    const control = this.formEditarEstudiante.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

}
