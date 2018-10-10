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
    }
    console.log('canActivate : ', this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }
}
