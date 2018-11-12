import { Category } from './../models/category.model';
import { User } from './../models/user.model';
import { Article } from './../models/article.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LikeArticle } from '../store/article/article.action';


@Injectable()
export class ArticlesService {

   url = environment.url + '/article';

  constructor(private http: HttpClient) {

  }

  getAll() {

    console.log('getAll');
    const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return this.http.get('http://localhost:3000/article/');
  }

  deleteArticle(id: any) {
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return  this.http.get(this.url + '/delete/' + id);

  }

  findArticlebyId(id: any) {

    return  this.http.get(this.url + '/findById/' + id);

  }

  getArticlesByEmail(email) {
    return this.http.get(this.url + '/' + email);
  }

  /*
    category
    */

   getAllCategory() {
      const headers = new HttpHeaders()
              .set('Access-Control-Allow-Origin', '*')
              .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      return this.http.get(this.url + '/allCategory/');
    }

  deleteCategory(id: any) {
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set ('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return  this.http.get( 'localhost:3000/article/deleteCategory/' + id);

  }

  addCategory(c) {
    return  this.http.post<Category>( 'http://localhost:3000/article/addCategory', c );
  }

  /*
    Like
    */

    likeArticle(article, user) {

      console.log('article - service');
      const like = {
        user: user,
        article: article
      };
      return this.http.post<any>('http://localhost:3000/article/like', like);
    }
}
