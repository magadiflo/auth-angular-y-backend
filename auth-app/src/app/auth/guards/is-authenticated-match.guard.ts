import { CanMatchFn } from '@angular/router';

export const isAuthenticatedMatchGuard: CanMatchFn = (route, segments) => {
  console.log('isAuthenticatedMatchGuard');
  console.log({ route, segments });
  return true;
};
