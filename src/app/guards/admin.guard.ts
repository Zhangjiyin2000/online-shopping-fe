import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = Number(localStorage.getItem('role'));
  console.log('Role: ', role);

  if (role === 2) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
