import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { JWTTokenService } from '../services/jwttoken.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const jwtService = inject(JWTTokenService);
  const router = inject(Router);

  // Verifica si el token existe
  if (!jwtService.getToken()) {
    router.navigateByUrl('/login');
    return false;
  }

  // Verifica si el token ha expirado
  if (jwtService.isTokenExpired()) {
    router.navigateByUrl('/login');
    jwtService.removeToken();
    return false;
  }

  // Permite acceso a la ruta hija
  return true;
};