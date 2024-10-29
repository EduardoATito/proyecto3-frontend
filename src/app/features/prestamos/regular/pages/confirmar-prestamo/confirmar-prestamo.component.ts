import { Component, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { EstudiantesService } from '../../services/estudiantes.service';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { RecursosService } from '../../../../inventario/recursos/services/recursos.service';
import { AllRecursosReponse } from '../../../../inventario/recursos/interfaces/recursos.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-confirmar-prestamo',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './confirmar-prestamo.component.html',
  styleUrl: './confirmar-prestamo.component.css'
})
export class ConfirmarPrestamoComponent {

  private layoutService = inject(LayoutService);
  private estudianteService = inject(EstudiantesService);
  private recursoService = inject(RecursosService);
  private activateRouter = inject(ActivatedRoute);

  public isMobile = computed(() => this.layoutService.isMobile());

  public estudianteState = signal<{loading: boolean, estudiante : Estudiante | null}>({loading: true, estudiante: null});
  public estudiante  = computed(() => this.estudianteState().estudiante) ;
  public loadingEstudiante = computed(() => this.estudianteState().loading);

  public recursoState = signal<{loading: boolean, recurso: AllRecursosReponse | null}>({loading: true, recurso: null});
  public recurso = computed(() => this.recursoState().recurso);
  public loadingRecurso = computed(() => this.recursoState().loading);

  ngOnInit(): void {
    this.setEstudiante();
    this.setRecurso();
  }

  setEstudiante() {

    const rut = this.activateRouter.snapshot.params['rut'];
    this.estudianteService.getEstudianteByRut(rut).subscribe((estudiante) => {
      this.estudianteState.set({loading: false, estudiante});
    });
  }

  setRecurso() {
    const id_dici = this.activateRouter.snapshot.params['id_dici'];
    this.recursoService.getRecursoByIdDICI(id_dici).subscribe((recurso) => {
      this.recursoState.set({loading: false, recurso});
    });
  }

  confirmarPrestamo() {
  }
}
