import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class UserService {

   url = environment.url;

  constructor(private http: HttpClient) {

  }

  getAll() {

    const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

console.log("helloo")

    return this.http.get('http://localhost:3000/users');
  }
}
