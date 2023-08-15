import { CanActivateFn } from '@angular/router';

export const isAuthenticatedActivateGuard: CanActivateFn = (route, state) => {
  console.log('isAuthenticatedActivateGuard');
  console.log({ route, state });
  return true;
};
