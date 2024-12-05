import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrearPrestamoEspecial } from '../interfaces/crear-prestamo-especial.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamoEspecialService {

  private prestamoRegularService = inject(HttpClient);
  private BASE_URL = environment.apiUrl;

  getAllPrestamosEspeciales(page :number,limit :number = 10) : Observable<any> {
    return this.prestamoRegularService.get(`${this.BASE_URL}/prestamo-especial?page=${page}&limit=${limit}`);
  }

  getPrestamoEspecial(id :number) : Observable<any> {
    return this.prestamoRegularService.get(`${this.BASE_URL}/prestamo-especial/${id}`);
  }

  createPrestamoEspecial(bodyPrestamoEspecial :ICrearPrestamoEspecial) : Observable<any> {
    return this.prestamoRegularService.post(`${this.BASE_URL}/prestamo-especial`, bodyPrestamoEspecial);
  }

  editarPrestamoEspecial(id :number, bodyPrestamoEspecial :ICrearPrestamoEspecial) : Observable<any> {
    return this.prestamoRegularService.patch(`${this.BASE_URL}/prestamo-especial/${id}`, bodyPrestamoEspecial);
  }

}
