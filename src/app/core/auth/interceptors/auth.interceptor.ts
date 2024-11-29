import { HttpInterceptorFn } from '@angular/common/http';
import { JWTTokenService } from '../services/jwttoken.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtService = inject(JWTTokenService);
  const router = inject(Router);

  const token = jwtService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next(req).pipe(
      catchError(err => {
        if (jwtService.isTokenExpired()) {
          jwtService.removeToken();
          router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
};
