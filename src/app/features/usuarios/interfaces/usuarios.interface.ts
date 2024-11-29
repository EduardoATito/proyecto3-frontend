export interface UsuariosResponse {
  id_usuario: number;
  nombre: string;
  usuario: string;
  correo: string;
  rut: string;
  rol: string;
  password: string;
}

export interface CrearUsuario {
  nombre: string;
  usuario: string;
  correo: string;
  rut: string;
  rol: string;
}

export interface EditarUsuario {
  nombre: string;
  usuario: string;
  correo: string;
  rut: string;
  rol: string;
}

export interface ChangePassword {
  usuario_id: number;
  old_password: string;
  new_password: string;
}