import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private BASE_URL = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getAllCategorias() : Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/categorias');
  }

  crearCategoria(categoria: any) : Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/categorias', categoria);
  }
}
