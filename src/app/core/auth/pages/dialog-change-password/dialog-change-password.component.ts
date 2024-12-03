import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../../../features/usuarios/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from '../../../../features/usuarios/interfaces/usuarios.interface';

@Component({
    selector: 'app-dialog-change-password',
    imports: [ReactiveFormsModule],
    templateUrl: './dialog-change-password.component.html',
    styleUrl: './dialog-change-password.component.css'
})
export class DialogChangePasswordComponent {

  private dialogRef = inject(MatDialogRef<DialogChangePasswordComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private formBulder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private usuarioService = inject(UsuariosService);

  public formChangePassword = this.formBulder.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  closeDialog(){
    this.dialogRef.close();
  }

  cambiarPassword(){
    if(this.formChangePassword.invalid){
      this.toastrService.error('Debe completar los campos requeridos', 'Error',{positionClass: 'toast-bottom-center'});
      this.formChangePassword.markAllAsTouched();
      return;
    }

    const body : ChangePassword = {
      usuario_id: +this.data.id_usuario,
      old_password: this.formChangePassword.get('password')?.value!,
      new_password: this.formChangePassword.get('newPassword')?.value!,
    }

    console.log(body);
    this.usuarioService.cambiarPassword(body).subscribe({
      next: () => {
        this.closeDialog();
        this.toastrService.success('Contraseña cambiada con exito', 'Exito', { positionClass: 'toast-bottom-center' });
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error(error.error.message, 'Error', { positionClass: 'toast-bottom-center' });
      }
    });
  }

  hasRequiredError(controlName: string) {
    const control = this.formChangePassword.get(controlName);
    return control?.hasError('required') && control?.touched ;
  }
}
