import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService,
    public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if ( localStorage.getItem('role') === 'user') {
        return true;
      } else {
        return false;
      }
    }

  }
