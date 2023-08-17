import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedActivateGuard: CanActivateFn = (route, state) => {
  console.log('isNotAuthenticatedActivateGuard');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
