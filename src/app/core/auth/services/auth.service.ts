import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments.development';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interface/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.apiUrl;
  private httpClient = inject(HttpClient);

  public login(loginData: Login): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/auth/login`, loginData);
  }
  
}
