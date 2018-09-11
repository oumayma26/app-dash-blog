import { User } from './../models/user.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

   url = environment.url + '/users';

  constructor(private http: HttpClient) {

  }

  getAll() {

    const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    return this.http.get('http://localhost:3000/users');
  }

  deleteUser(id: any) {
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return  this.http.get(this.url + '/delete/' + id);

  }

  searchByName(name: any) {
    return  this.http.get(this.url + '/searchByName/' + name);
  }
}




