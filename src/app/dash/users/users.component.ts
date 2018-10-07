

import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';
import { UserLogic } from '../../ngrx/logic/user.store';
import { AlertMsgComponent } from '../../alert-msg/alert-msg.component';


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
      });

      this._logic.userState$.subscribe(
        state => {
          this.users = state.users;

        });
  }

  searchUser(e: KeyboardEvent, text) {
    if (e.keyCode === 13) {
      this._logic.searchUser(text);
    }
  }

}
