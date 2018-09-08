
import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: any[];

  constructor(private service: UserService) {
    this.service.getAll().subscribe(res => {
      this.users = res;
    });
  }


  ngOnInit() {
  }

}
