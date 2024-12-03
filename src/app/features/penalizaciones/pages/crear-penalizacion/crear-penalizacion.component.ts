import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/layout/layout.service';
import { PenalizacionesService } from '../../services/penalizaciones.service';
import { grados_sancion, ICrearPenalizacion } from '../../interfaces/penalizaciones.interface';
import { ToastrService } from 'ngx-toastr';
import { JWTTokenService } from '../../../../core/auth/services/jwttoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-penalizacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-penalizacion.component.html',
  styleUrl: './crear-penalizacion.component.css'
})
export class CrearPenalizacionComponent {

  private formBuilder = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private penalizacionService = inject(PenalizacionesService);
  private toastrService = inject(ToastrService);
  private jwtService = inject(JWTTokenService);
  private router = inject(Router);

  public loadingCrearPenalizacion = signal<boolean>(false);

  public grados = Object.values(grados_sancion);

  public isMobile = computed(() => this.layoutService.isMobile());

  public fromCrearPenalizacion = this.formBuilder.group({
    grado: ['', Validators.required],
    comentario: ['', Validators.required],
    rut_estudiante: ['', Validators.required]
  });

  hasRequiredError(controlName: string) {
    const control = this.fromCrearPenalizacion.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  crearPenalizacion(){
    if(this.fromCrearPenalizacion.invalid){
      this.fromCrearPenalizacion.markAllAsTouched();
      return;
    }
    const id_usuario = this.jwtService.getIdUsuario();
    const penalizacion : ICrearPenalizacion = {
      
      id_usuario: id_usuario!,
      grado: this.fromCrearPenalizacion.get('grado')?.value!,
      comentario: this.fromCrearPenalizacion.get('comentario')?.value!,
      rut_estudiante: this.fromCrearPenalizacion.get('rut_estudiante')?.value!,
      estado_sancion: true
    }

    this.loadingCrearPenalizacion.set(true);
    this.penalizacionService.createPenalizacion(penalizacion).subscribe({
      next: () => {
        this.router.navigate(['/penalizaciones']);
        this.toastrService.success('Penalización creada con éxito','Exito',{positionClass: 'toast-bottom-center'});
        this.loadingCrearPenalizacion.set(false);
        this.fromCrearPenalizacion.reset();
      },
      error: (e) => {
        this.toastrService.error(e.error.message,'Error',{positionClass: 'toast-bottom-center'});
      },

    });
  }
}
