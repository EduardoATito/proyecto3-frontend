export interface PayloadToken {
  id_usuario: number;
  nombre:     string;
  usuario:    string;
  correo:     string;
  rut:        string;
  rol:        string;
  estado:     boolean;
  iat:        number;
  exp:        number;
}
