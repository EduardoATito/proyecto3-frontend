import { CanActivateFn, Router } from '@angular/router';
import { JWTTokenService } from '../services/jwttoken.service';

export const reverseAuthGuard: CanActivateFn = (route, state) => {

  const jwtService = new JWTTokenService();
  const router = new Router();

  if(!jwtService.isTokenExpired()) {
    router.navigateByUrl('');
    return false;
  }

  return true;
};
