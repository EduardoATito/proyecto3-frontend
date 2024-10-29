import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../core/layout/layout.service';
import { CategoriasService } from '../../../inventario/categorias/services/categorias.service';
import { RecursosService } from '../../../inventario/recursos/services/recursos.service';
import { CrearUsuario, UsuariosResponse } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

export enum Roles {
  ADMIN = 'ADMIN',
  AYUDANTE = 'AYUDANTE',
}

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  private toastrService = inject(ToastrService);
  private formGroup = inject(FormBuilder);
  private layoutService = inject(LayoutService);
  private usuarioService = inject(UsuariosService);
  private router = inject(Router);

  public isMobile = computed(() => this.layoutService.isMobile());

  public roles = Object.values(Roles);

  public fromCrearUsuario = this.formGroup.group({
    nombre: ['', [Validators.required]],
    usuario: ['', Validators.required],
    correo: ['', Validators.required],
    rut: ['', Validators.required],
    rol: ['', Validators.required],
    password: ['', Validators.required],
  });

  public loadingCrearUsuario = signal(false);

  crearUsuario(){
    console.log('boton crear usuario');
    if(this.fromCrearUsuario.invalid){
      this.toastrService.error('Por favor, completa los campos', 'Error',{ positionClass: 'toast-bottom-center'});
      this.fromCrearUsuario.markAllAsTouched();
      return;
    }

    const usuario : CrearUsuario = {
      nombre: this.fromCrearUsuario.get('nombre')?.value!,
      usuario: this.fromCrearUsuario.get('usuario')?.value!,
      correo: this.fromCrearUsuario.get('correo')?.value!,
      rut: this.fromCrearUsuario.get('rut')?.value!,
      rol: this.fromCrearUsuario.get('rol')?.value!,
      password: this.fromCrearUsuario.get('password')?.value!,
    };
    this.loadingCrearUsuario.set(true);
    this.usuarioService.crearUsuario(usuario).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
        this.toastrService.success('Usuario creado correctamente', 'Exito', {positionClass: 'toast-bottom-center'});
      },
      error: () => {
        this.loadingCrearUsuario.set(false);
        this.toastrService.error('Error al crear el usuario', 'Error', {positionClass: 'toast-bottom-center'});
      }
    });
  }
  hasRequiredError(controlName: string) {
    const control = this.fromCrearUsuario.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
}
