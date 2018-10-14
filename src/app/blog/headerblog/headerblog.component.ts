import { AuthService } from './../../ngrx/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerblog',
  templateUrl: './headerblog.component.html',
  styleUrls: ['./headerblog.component.css']
})
export class HeaderblogComponent implements OnInit {

  constructor(private service: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.service.logout();
    this.router.navigate(['login']);
  }

}
