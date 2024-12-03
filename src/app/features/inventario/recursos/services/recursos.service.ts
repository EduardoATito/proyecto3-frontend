import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { Observable } from 'rxjs';
import { AllRecursosReponse } from '../interfaces/recursos.interface';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {


  private BASE_URL = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getAllRecursos(page : number, limit = 10) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/recursos?page=${page}&limit=${limit}`);
  }

  getRecursoByIdDICI(id_uta: number) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/recursos/${id_uta}`);
  }

  getRecursosByCategoria(id_categoria: number) : Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/categorias/${id_categoria}/recursos`);
  }

  crearRecurso( recurso: any) {
    return this.httpClient.post(`${this.BASE_URL}/recursos`, recurso);
  }

  editarRecurso(id_uta: number,recurso: any) {
    return this.httpClient.patch(`${this.BASE_URL}/recursos/${id_uta}`, recurso);
  }

  eliminarRecurso(id_uta: string) {
    return this.httpClient.delete(`${this.BASE_URL}/recursos/${id_uta}`);
  }
}
