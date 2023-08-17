import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedMatchGuard: CanMatchFn = (route, segments) => {
  console.log('isAuthenticatedMatchGuard');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigate(['/auth', 'login']);
  return false;
};
