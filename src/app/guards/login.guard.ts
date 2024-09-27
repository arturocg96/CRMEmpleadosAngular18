import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  console.log('paso por el guard')
  const router = inject(Router);
  if (!localStorage.getItem('token')) {
    router.navigateByUrl('/home?status=1')
    return false;
  }// else if( jwtHelper.isTokenExpired(localStorage.getItem('token')) ){
  //   localStorage.removeItem('token')
  //   router.navigateByUrl('/home?status=3')
  //   return false;
  // }
  return true;
};
