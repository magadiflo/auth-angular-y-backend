import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedMatchGuard: CanMatchFn = (route, segments) => {
  console.log('isNotAuthenticatedMatchGuard');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
