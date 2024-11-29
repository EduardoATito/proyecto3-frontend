import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrearPenalizacion } from '../interfaces/penalizaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class PenalizacionesService {

  private BASE_URL = environment.apiUrl;
  private httpClient = inject(HttpClient);


  public createPenalizacion(penalizacion: ICrearPenalizacion): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/penalizaciones`, penalizacion);
  }

  public getPenalizaciones(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/penalizaciones`);
  }
}
