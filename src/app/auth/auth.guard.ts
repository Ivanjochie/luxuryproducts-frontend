import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const tokenService: TokenService = inject(TokenService);

  if(tokenService.isValid()){
    return true;
  }

  return false;
};
