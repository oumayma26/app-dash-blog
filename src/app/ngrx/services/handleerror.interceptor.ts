import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want


      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          // redirect to the login route
          // or show a modal
          localStorage.removeItem('jwt');
          this.router.navigate(['login']);
        }
      }
    }));
  }
}
