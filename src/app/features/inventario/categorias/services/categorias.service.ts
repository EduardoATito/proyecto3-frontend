import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments.development';
import { Observable } from 'rxjs';
import { CrearCategoria } from '../interfaces/crear-categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private BASE_URL = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getAllCategorias() : Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/categorias');
  }

  getCategoriaById(id_categoria: number) : Observable<any> {
    return this.httpClient.get(this.BASE_URL + `/categorias/${id_categoria}`);
  }

  crearCategoria(categoria: any) : Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/categorias', categoria, { headers: { 'Content-Type': 'application/json' } });
  }

  editarCategoria(id_categoria: number, categoria: CrearCategoria) : Observable<any> {
    return this.httpClient.patch(this.BASE_URL + `/categorias/${id_categoria}`, categoria, { headers: { 'Content-Type': 'application/json' } });
  }

  eliminarCategoria(id_categoria: number) : Observable<any> {
    return this.httpClient.delete(this.BASE_URL + `/categorias/${id_categoria}`);
  }
}
