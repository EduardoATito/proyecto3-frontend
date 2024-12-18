import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.development';
import { Observable } from 'rxjs';
import { ChangePassword, CrearUsuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  private BASE_URL = environment.apiUrl;
  
  getAllUsuarios(page:number, limit: number = 10) : Observable<any> {
    return this.http.get(`${this.BASE_URL}/usuarios?page=${page}&limit=${limit}`);
  }

  getUsuarioById(id_usuario: number) : Observable<any> {
    return this.http.get(`${this.BASE_URL}/usuarios/${id_usuario}`);
  }
  crearUsuario(usuario: CrearUsuario) : Observable<any> {
    return this.http.post(`${this.BASE_URL}/usuarios`, usuario);
  }

  editarUsuario(id_usuario: number, usuario: CrearUsuario) : Observable<any> {
    return this.http.patch(`${this.BASE_URL}/usuarios/actualizar-usuario/${id_usuario}`, usuario);
  }

  eliminarUsuario(rut: string) : Observable<any> {
    return this.http.delete(`${this.BASE_URL}/usuarios/${rut}`);
  }

  cambiarPassword(cambiarPasswordBody : ChangePassword) : Observable<any> {
    return this.http.patch(`${this.BASE_URL}/usuarios/change-password`, cambiarPasswordBody);
  }
}
