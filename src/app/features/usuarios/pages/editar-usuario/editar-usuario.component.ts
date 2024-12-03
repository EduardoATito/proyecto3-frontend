import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutService } from '../../../../core/layout/layout.service';
import { Roles } from '../crear-usuario/crear-usuario.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CrearUsuario, EditarUsuario } from '../../interfaces/usuarios.interface';

@Component({
    selector: 'app-editar-usuario',
    imports: [ReactiveFormsModule, SpinnerComponent],
    templateUrl: './editar-usuario.component.html',
    styleUrl: './editar-usuario.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class EditarUsuarioComponent implements OnInit {

  private toastrService = inject(ToastrService);
  private usuarioService = inject(UsuariosService);
  private activateRouter = inject(ActivatedRoute);
  private layoutService = inject(LayoutService);
  private formGroup = inject(FormBuilder);
  private router = inject(Router);

  public isMobile = computed(() => this.layoutService.isMobile());
  private usuarioState = signal<any>({loading: true, usuario: {}});
  public usuario = computed(() => this.usuarioState().usuario);
  public loading = computed(() => this.usuarioState().loading);

  public roles = Object.values(Roles);

  public fromEditarUsuario = this.formGroup.group({
    nombre: ['', [Validators.required]],
    usuario: ['', Validators.required],
    correo: ['', Validators.required],
    rut: ['', Validators.required],
    rol: ['', Validators.required],
  });

  public loadingEditarUsuario = signal(false);

  ngOnInit(): void {
    this.setUsuarioById();
  }

  setUsuarioById() {
    const id_usuario = this.activateRouter.snapshot.params['id']
    this.usuarioService.getUsuarioById(id_usuario).subscribe((usuario) => {
      this.usuarioState.set({loading: false, usuario: usuario});
      if (!usuario) {
        this.router.navigate(['/usuarios']);
      }
      this.fromEditarUsuario.patchValue(usuario);
    });


  }

  editarUsuario() {
    if (this.fromEditarUsuario.invalid) {
      this.fromEditarUsuario.markAllAsTouched();
      this.toastrService.error('Por favor, complete el formulario');
      return;
    }

    const userEdited : EditarUsuario = {
      nombre: this.fromEditarUsuario.value.nombre!,
      usuario: this.fromEditarUsuario.value.usuario!,
      correo: this.fromEditarUsuario.value.correo!,
      rut: this.fromEditarUsuario.value.rut!,
      rol: this.fromEditarUsuario.value.rol!,
    }
    this.loadingEditarUsuario.set(true);
    this.usuarioService.editarUsuario(this.usuario().id_usuario,userEdited).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
        this.toastrService.success('Usuario editado correctamente', 'Exito', {positionClass: 'toast-bottom-center'});
      },
      error: () => {
        this.loadingEditarUsuario.set(false);
        this.toastrService.error('Ocurrio un error al editar el usuario','Error',{positionClass: 'toast-bottom-center'});
      }
    });
  }

  hasRequiredError(controlName: string) {
    const control = this.fromEditarUsuario.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
}
