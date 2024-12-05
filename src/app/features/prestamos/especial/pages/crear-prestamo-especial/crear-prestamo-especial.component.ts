import { Component, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestamoEspecialService } from '../../services/prestamo-especial.service';
import { ToastrService } from 'ngx-toastr';
import { ICrearPrestamoEspecial } from '../../interfaces/crear-prestamo-especial.interface';
import { JWTTokenService } from '../../../../../core/auth/services/jwttoken.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-prestamo-especial',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './crear-prestamo-especial.component.html',
  styleUrl: './crear-prestamo-especial.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class CrearPrestamoEspecialComponent {

  private layoutService = inject(LayoutService);
  private prestamoEspecialService = inject(PrestamoEspecialService);

  public isMobile = computed(() => this.layoutService.isMobile());
  private router = inject(Router);
  public toastrService = inject(ToastrService);

  private jwtService = inject(JWTTokenService);

  public loadingCrearRecurso = signal(false);
  private formBuilder = inject(FormBuilder);

  public fromCrearPrestamoEspecial = this.formBuilder.group({
    descripcion    : ['', Validators.required],
    motivo         : ['', Validators.required],
    id_dici        : ['', Validators.required],
    fecha_inicio   : ['', Validators.required],
    fecha_fin      : ['', Validators.required],
    rut_estudiante : ['', Validators.required],
  });


  crearPrestamoEspecial() {
    if (this.fromCrearPrestamoEspecial.invalid) {
      this.fromCrearPrestamoEspecial.markAllAsTouched();
      this.toastrService.error('Por favor, complete todos los campos', 'Error', { positionClass: 'toast-bottom-center' });
      return;
    }

    const id_usuario = this.jwtService.getIdUsuario();

    const bodyPrestamoEspecial : ICrearPrestamoEspecial = {
      descripcion    : this.fromCrearPrestamoEspecial.get('descripcion')?.value!,
      motivo         : this.fromCrearPrestamoEspecial.get('motivo')?.value!,
      id_usuario     : id_usuario!,
      id_dici        : this.fromCrearPrestamoEspecial.get('id_dici')?.value!,
      fecha_inicio   : this.fromCrearPrestamoEspecial.get('fecha_inicio')?.value!,
      fecha_fin      : this.fromCrearPrestamoEspecial.get('fecha_fin')?.value!,
      rut_estudiante : this.fromCrearPrestamoEspecial.get('rut_estudiante')?.value!,
    }

    console.log(bodyPrestamoEspecial);
    this.loadingCrearRecurso.set(true);
    this.prestamoEspecialService.createPrestamoEspecial(bodyPrestamoEspecial).subscribe({
      next: () => {
        this.toastrService.success('Prestamo especial creado correctamente', 'Exito', { positionClass: 'toast-bottom-center' });
        this.loadingCrearRecurso.set(false);
        this.router.navigate(['/prestamos-especiales']);
        this.fromCrearPrestamoEspecial.reset();
      },
      error: (error) => {
        this.toastrService.error(error.error.message, 'Error', { positionClass: 'toast-bottom-center' });
        this.loadingCrearRecurso.set(false);
      }
    });
  }

  hasRequiredError(controlName: string) {
    const control = this.fromCrearPrestamoEspecial.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }

  cancelar() {
    this.router.navigate(['/prestamos-especiales']);
  }
}
