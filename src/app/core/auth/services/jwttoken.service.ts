import { inject, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { PayloadToken } from '../interface/payload.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  private cookieService = inject(CookieService);
  private decodedToken: PayloadToken = { id_usuario: 0, nombre: '', usuario: '', correo: '', rut: '', rol: '', estado: false, iat: 0, exp: 0 };

  setToken(token: string) {
    if (token) {
      this.cookieService.set('access_token', token);
    }
  }

  getToken() {
    return this.cookieService.get('access_token');
  }

  decodeToken() {
    const token = this.cookieService.get('access_token');
    if (token) {
      this.decodedToken = jwt_decode.jwtDecode(token);
    }
  }

  getDecodeToken() {
    const token = this.cookieService.get('access_token');
    return jwt_decode.jwtDecode(token);
  }

  getIdUsuario() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.id_usuario : null;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.usuario : null;
  }

  getRol() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.rol : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  removeToken() {
    this.cookieService.delete('access_token');
  }

  isTokenExpired(): boolean {

    const expiryTime = this.getExpiryTime(); // Se asume que devuelve un número o null
    if (expiryTime === null) {
      // Si no hay un tiempo de expiración, el token no está expirado
      return false;
    }

    const currentTime = Date.now(); 
    const expiryTimeMs = expiryTime * 1000; 

    return (expiryTimeMs - currentTime) < 5000;
  }
}
