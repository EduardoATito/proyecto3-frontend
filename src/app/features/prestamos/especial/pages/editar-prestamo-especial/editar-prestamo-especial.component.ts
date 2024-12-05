import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { ToastrService } from 'ngx-toastr';
import { PrestamoEspecialService } from '../../services/prestamo-especial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JWTTokenService } from '../../../../../core/auth/services/jwttoken.service';
import { ICrearPrestamoEspecial } from '../../interfaces/crear-prestamo-especial.interface';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-editar-prestamo-especial',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './editar-prestamo-especial.component.html',
  styleUrl: './editar-prestamo-especial.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class EditarPrestamoEspecialComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private layoutrService = inject(LayoutService);
  private toastrService = inject(ToastrService);
  private prestamosEspecialesService = inject(PrestamoEspecialService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private jwtService = inject(JWTTokenService);
  
  public  loadingEditarRecurso = signal(false);

  public isMobile = computed(() => this.layoutrService.isMobile());
  public formEditarPrestamoEspecial = this.formBuilder.group({
    descripcion    : ['', Validators.required],
    motivo         : ['', Validators.required],
    id_dici        : ['', Validators.required],
    fecha_inicio   : ['', Validators.required],
    fecha_fin      : ['', Validators.required],
    rut_estudiante : ['', Validators.required],
  });


  ngOnInit(): void {

    this.setPrestamoEspecial();
  }


  setPrestamoEspecial() {

    const id = this.activeRoute.snapshot.params['id'];

    this.prestamosEspecialesService.getPrestamoEspecial(id).subscribe((response) => {
      this.formEditarPrestamoEspecial.patchValue({
        descripcion    : response.descripcion,
        motivo         : response.motivo,
        id_dici        : response.id_dici,
        fecha_inicio   : response.fecha_inicio,
        fecha_fin      : response.fecha_fin,
        rut_estudiante : response.rut_estudiante,
      });
    });
  }

  hasRequiredError(controlName: string) {
    const control = this.formEditarPrestamoEspecial.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  EditarPrestamoEspecial() {

    if (this.formEditarPrestamoEspecial.invalid) {
      this.formEditarPrestamoEspecial.markAllAsTouched();
      this.toastrService.error('Por favor, complete todos los campos', 'Error', { positionClass: 'toast-bottom-center' });
      return;
    }

    const id_usuario = this.jwtService.getIdUsuario();
    const id = this.activeRoute.snapshot.params['id'];

    const bodyPrestamoEspecial : ICrearPrestamoEspecial = {
      descripcion    : this.formEditarPrestamoEspecial.get('descripcion')?.value!,
      motivo         : this.formEditarPrestamoEspecial.get('motivo')?.value!,
      id_usuario     : id_usuario!,
      id_dici        : this.formEditarPrestamoEspecial.get('id_dici')?.value!,
      fecha_inicio   : this.formEditarPrestamoEspecial.get('fecha_inicio')?.value!,
      fecha_fin      : this.formEditarPrestamoEspecial.get('fecha_fin')?.value!,
      rut_estudiante : this.formEditarPrestamoEspecial.get('rut_estudiante')?.value!,
    }

    this.loadingEditarRecurso.set(true);
      this.prestamosEspecialesService.editarPrestamoEspecial(id, bodyPrestamoEspecial).subscribe({
        next: () => {
          this.toastrService.success('Prestamo especial editado correctamente', 'Exito', { positionClass: 'toast-bottom-center' });
          this.loadingEditarRecurso.set(false);
          this.router.navigate(['/prestamos-especiales']);
          this.formEditarPrestamoEspecial.reset();
        },
        error: (error) => {
          this.toastrService.error(error.error.message, 'Error', { positionClass: 'toast-bottom-center' });
          this.loadingEditarRecurso.set(false);
        }
      });
  }

  cancelar(){
    this.router.navigate(['/prestamos-especiales']);
  }
}
