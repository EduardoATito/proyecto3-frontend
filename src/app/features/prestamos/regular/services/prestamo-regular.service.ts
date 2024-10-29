import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { Observable } from 'rxjs';
import { CrearPrestamoRegular } from '../interfaces/prestamo-regular.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamoRegularService {

  private prestamoRegularService = inject(HttpClient);
  private BASE_URL = environment.apiUrl;

  getAllPrestamosRegular() : Observable<any> {
    return this.prestamoRegularService.get(`${this.BASE_URL}/prestamo-regular`);
  }

  crearPrestamoRegular(prestamoRegular: CrearPrestamoRegular): Observable<any> {
    return this.prestamoRegularService.post(`${this.BASE_URL}/prestamo-regular`, prestamoRegular);
  }
}
