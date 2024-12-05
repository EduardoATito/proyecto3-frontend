import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoEspecialService } from '../../services/prestamo-especial.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ver-prestamo-especial',
  imports: [ReactiveFormsModule, MatDatepickerModule, MatFormField],
  templateUrl: './ver-prestamo-especial.component.html',
  styleUrl: './ver-prestamo-especial.component.css',
  animations: [
    trigger('notLoading', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms ease-out', style({ opacity: 1 }))
        ]),
    ])
  ]
})
export class VerPrestamoEspecialComponent implements OnInit {

  private layoutService = inject(LayoutService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private prestamosEspecialesService = inject(PrestamoEspecialService);

  public isMobile = computed(() => this.layoutService.isMobile());

  private formBuilder = inject(FormBuilder);

  public formVerPrestamoEspecial = this.formBuilder.group({
    descripcion    : ['', Validators.required],
    motivo         : ['', Validators.required],
    id_dici        : ['', Validators.required],
    fecha_inicio   : ['', Validators.required],
    fecha_fin      : ['', Validators.required],
    rut_estudiante : ['', Validators.required],
  });

  ngOnInit(): void {
    this.formVerPrestamoEspecial.disable();
    this.setPrestamoEspecial();
  }

  setPrestamoEspecial() {
    const id = this.activeRoute.snapshot.params['id'];
    this.prestamosEspecialesService.getPrestamoEspecial(id).subscribe((response) => {
      this.formVerPrestamoEspecial.setValue({
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
    const control = this.formVerPrestamoEspecial.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
  volver(){
    this.router.navigate(['/prestamos-especiales']);
  }
}
