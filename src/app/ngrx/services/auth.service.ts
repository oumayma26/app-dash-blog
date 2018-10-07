import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  url = environment.url + '/users';

  constructor(private http: HttpClient) {

  }

  login(username: any, password) {
    return  this.http.get(this.url + '/searchByName/' + name);
  }


}
