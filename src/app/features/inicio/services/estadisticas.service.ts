import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private http = inject(HttpClient);
  private BASE_URL = environment.apiUrl;
  
  getCantidadRecursos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/statistics/count-recursos`);
  }

  getCantidadEstudiantes():Observable<any>{
    return this.http.get(`${this.BASE_URL}/statistics/count-estudiantes`);
  }

  getCantidadCategorias():Observable<any>{
    return this.http.get(`${this.BASE_URL}/statistics/count-categorias`);
  }

  getCantidadPrestamosRegularActivos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/statistics/count-prestamos-regular-activos`);
  }

  getCantidadRecursosPorCategoria():Observable<any>{
    return this.http.get(`${this.BASE_URL}/statistics/cantidad-recursos-por-categoria`);
  }
}
