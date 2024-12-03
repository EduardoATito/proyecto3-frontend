import { Component, computed, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../features/usuarios/services/usuarios.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../layout/layout.service';
import { Router } from '@angular/router';
import { Roles } from '../../../../features/usuarios/pages/crear-usuario/crear-usuario.component';
import { EditarUsuario } from '../../../../features/usuarios/interfaces/usuarios.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { JWTTokenService } from '../../services/jwttoken.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';

@Component({
    selector: 'app-profile',
    imports: [ReactiveFormsModule, SpinnerComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class ProfileComponent {

  private toastrService = inject(ToastrService);
  private usuarioService = inject(UsuariosService);
  private layoutService = inject(LayoutService);
  private formGroup = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private jwtService = inject(JWTTokenService);

  public isMobile = computed(() => this.layoutService.isMobile());
  private usuarioState = signal<any>({loading: true, usuario: {}});
  public usuario = computed(() => this.usuarioState().usuario);
  public loading = computed(() => this.usuarioState().loading);

  public roles = Object.values(Roles);

  public fromEditarUsuario = this.formGroup.group({
    nombre: ['', Validators.required],
    usuario: ['', Validators.required],
    correo: ['', Validators.required],
    rut: ['', Validators.required],
    rol: [{value: '', disabled: true}, Validators.required],
    password: ['', Validators.required],
  });

  public loadingEditarUsuario = signal(false);

  ngOnInit(): void {
    this.setUsuarioById();
  }

  setUsuarioById() {

    const id_usuario = this.jwtService.getIdUsuario()!;
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

  cambiarPassword() {
    const id_usuario = this.jwtService.getIdUsuario()!;
    this.dialog.open(DialogChangePasswordComponent,{
      width: '600px',
      data: {id_usuario},
      enterAnimationDuration: 200,
      exitAnimationDuration: 200
    });
  }
}
