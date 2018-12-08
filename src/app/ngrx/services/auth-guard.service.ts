import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      !this.authService.isAuthenticated()
    ) {
      this.router.navigate(['login']);
      console.log('canActivate : ', false);
      return false;
    } else {
      if (localStorage.getItem('role') === 'user') {
        this.router.navigate(['blog']);
      }
      if (localStorage.getItem('role') === 'admin') {
        this.router.navigate(['dashbord']);
      }

      return this.authService.isAuthenticated();
    }
  }


}
