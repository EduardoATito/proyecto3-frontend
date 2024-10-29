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
  password: string;
}