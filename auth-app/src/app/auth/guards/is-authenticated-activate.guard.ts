import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedActivateGuard: CanActivateFn = (route, state) => {
  console.log('isAuthenticatedActivateGuard');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigate(['/auth', 'login']);
  return false;
};
