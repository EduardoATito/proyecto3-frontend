import { Component, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../../../../../core/layout/layout.service';
import { EstudiantesService } from '../../../../estudiantes/services/estudiantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../../../../estudiantes/interfaces/estudiante.interface';
import { RecursosService } from '../../../../inventario/recursos/services/recursos.service';
import { AllRecursosReponse } from '../../../../inventario/recursos/interfaces/recursos.interface';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { PrestamoRegularService } from '../../services/prestamo-regular.service';
import { CrearPrestamoRegular } from '../../interfaces/prestamo-regular.interface';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../../../usuarios/services/usuarios.service';
import { UsuariosResponse } from '../../../../usuarios/interfaces/usuarios.interface';

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
  private prestamoService = inject(PrestamoRegularService);
  private toastervice = inject(ToastrService);
  private router = inject(Router);
  private usuarioService = inject(UsuariosService);

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

    const prestamoRegular : CrearPrestamoRegular = {
      rut: this.estudiante()?.rut ?? '',
      id_dici: this.recurso()?.id_dici ?? '',
      hora_inicio: new Date().toISOString(),
      id_usuario: 5, //aca deberia ir el id del usuario logeado
    }
    console.log(prestamoRegular);
    this.prestamoService.crearPrestamoRegular(prestamoRegular).subscribe({
      next: () => {
        this.router.navigate(['/prestamos/regular']);
        this.toastervice.success('Prestamo creado con exito','Exito',{ positionClass: 'toast-bottom-center'});
      },
      error: (error) => {
        this.toastervice.error('Error al crear el prestamo','Error',{ positionClass: 'toast-bottom-center'});
      }
    });
  }
}
