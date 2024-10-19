import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private BASE_URL = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getAllEstudiantes() : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/estudiantes`);
  }

  getEstudianteByRut(rut: string) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/estudiantes/${rut}`);
  }

}
