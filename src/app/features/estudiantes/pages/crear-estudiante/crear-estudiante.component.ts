import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/layout/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-crear-estudiante',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-estudiante.component.html',
  styleUrl: './crear-estudiante.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class CrearEstudianteComponent implements OnInit {

  private layoutService = inject(LayoutService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private estudianteService = inject(EstudiantesService);

  public isMobile = computed(() => this.layoutService.isMobile());
  public loadingCrearEstudiante = signal(false);


  public formCrearEstudiante = this.formBuilder.group({
    nombre: ['', Validators.required],
    rut: ['', Validators.required],
    direccion: ['', Validators.required],
    fono: ['', Validators.required],
    correo: ['', Validators.required],
    ingreso: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  crearEstudiante(){
    
    if(this.formCrearEstudiante.invalid){
      this.formCrearEstudiante.markAllAsTouched();
      this.toastr.error('Por favor, complete los campos requeridos', 'Error', {positionClass: 'toast-bottom-center'});
      return;
    }

    this.loadingCrearEstudiante.set(true);

    const estudiante  = {
      nombre: this.formCrearEstudiante.get('nombre')?.value!,
      rut: this.formCrearEstudiante.get('rut')?.value!,
      direccion: this.formCrearEstudiante.get('direccion')?.value!,
      fono: this.formCrearEstudiante.get('fono')?.value!,
      correo: this.formCrearEstudiante.get('correo')?.value!,
      ingreso: +this.formCrearEstudiante.get('ingreso')?.value!,
    };

    this.estudianteService.crearEstudiante(estudiante).subscribe({
      next: (response) => {
        this.loadingCrearEstudiante.set(false);
        this.toastr.success('Estudiante creado correctamente', 'Éxito', {positionClass: 'toast-bottom-center'});
        this.router.navigate(['/estudiantes']);
      },
      error: (error) => {
        this.loadingCrearEstudiante.set(false);
        this.toastr.error(error.error.message, 'Error', {positionClass: 'toast-bottom-center'});
      }
    });
  }

  cancelar(){
    this.router.navigate(['/estudiantes']);
  }

  hasRequiredError(controlName: string) {
    const control = this.formCrearEstudiante.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

}
