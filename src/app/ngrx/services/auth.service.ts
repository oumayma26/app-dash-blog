import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  url = environment.url ;
  token: string;


  constructor(private http: HttpClient) {

  }


  login(email: string, password: string): any {
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
     console.log(email, password);
          return this.http.post<any>('http://localhost:3000/auth/login', { email : email, password: password}).map( result => {
      if (result && result.token) {
        console.log(result);
        localStorage.setItem('jwt', result.token);
        localStorage.setItem('email', result.email);
        localStorage.setItem('id', result._id);
        this.token = result.token;

        return result;
      }   else {
        return null;
      }
     });
  }

  logout() {
      this.token = null;
      localStorage.removeItem('jwt');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return  (localStorage.getItem('jwt') !== null);
  }

}

