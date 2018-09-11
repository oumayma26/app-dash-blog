import { DeleteUser } from './../ngrx/store/user/user.action';
import { AlertMsgComponent } from './../alert-msg/alert-msg.component';

import { UserService } from './../ngrx/services/user.service';
import { UserLogic } from './../ngrx/logic/user.store';


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { User } from '../ngrx/models/user.model';
import {MatDialog} from '@angular/material';


 @Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  model: any = {};
  users: any[];
  filterText: string;





  constructor(public _logic: UserLogic,
    public dialog: MatDialog) {
    this._logic.getListUsers(true);
  }

  getAllUser() {
    this._logic.getListUsers(true);
  }

  deleteUser(id) {
    const dialogRef = this.dialog.open(AlertMsgComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result === true ) {
        this._logic.delteUser(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnInit() {
    this._logic.userState$.subscribe(
      state => {
        this.users = state.users;
        console.log(state.users);
      });

  }

  searchUser(e: KeyboardEvent, text) {
    if (e.keyCode === 13) {
      this._logic.searchUser(text);
    }
  }

}
