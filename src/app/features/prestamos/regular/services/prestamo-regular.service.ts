import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { Observable } from 'rxjs';
import { CrearPrestamoRegular, FinPrestamoDto } from '../interfaces/prestamo-regular.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamoRegularService {

  private prestamoRegularService = inject(HttpClient);
  private BASE_URL = environment.apiUrl;

  getAllPrestamosRegular(page :number,limit :number = 10) : Observable<any> {
    return this.prestamoRegularService.get(`${this.BASE_URL}/prestamo-regular?page=${page}&limit=${limit}`);
  }
  
  getAllPrestamosRetugularActivos(page : number, limit : number = 10) : Observable<any> {
    return this.prestamoRegularService.get(`${this.BASE_URL}/prestamo-regular/activos?page=${page}&limit=${limit}`);
  }

  crearPrestamoRegular(prestamoRegular: CrearPrestamoRegular): Observable<any> {
    return this.prestamoRegularService.post(`${this.BASE_URL}/prestamo-regular`, prestamoRegular);
  }

  devolverPrestamoRegular(finalPrestamoBody: FinPrestamoDto): Observable<any> {
    return this.prestamoRegularService.patch(`${this.BASE_URL}/prestamo-regular/finalizar-prestamo`, finalPrestamoBody);
  }
}
