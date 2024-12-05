import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private BASE_URL = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getAllEstudiantes(page:number, limit:number = 10) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/estudiantes?page=${page}&limit=${limit}`);
  }

  getEstudianteByRut(rut: string) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/estudiantes/${rut}`);
  }

  crearEstudiante(estudiante: any) : Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/estudiantes`, estudiante);
  }

  veEstudiante(estudiante: any) : Observable<any> {
    return this.httpClient.put(`${this.BASE_URL}/estudiantes`, estudiante); 
  }

  editarEstudiante(estudiante: any, rut: string) : Observable<any> {
    return this.httpClient.patch(`${this.BASE_URL}/estudiantes/${rut}`, estudiante);
  }

  cargarMasivaEstudiantes(estudiantesForm : FormData) : Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/estudiantes/carga_masiva`, estudiantesForm);
  }

}
