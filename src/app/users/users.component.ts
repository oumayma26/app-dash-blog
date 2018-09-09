import { UserService } from './../ngrx/services/user.service';
import { UserLogic } from './../ngrx/logic/user.store';


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { User } from '../ngrx/models/user.model';
//  import {NgxSpinnerService} from '../../../../node_modules/ngx-spinner';
 @Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: any[];

  constructor(public _logic: UserLogic) {
    this._logic.getListUsers(true);
  }


  ngOnInit() {
    this._logic.userState$.subscribe(
      state => {
        this.users = state.users;
        console.log(state.users);
      });

  }

}
