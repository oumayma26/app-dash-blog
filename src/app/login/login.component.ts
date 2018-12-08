import {  FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../ngrx/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(   private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.myForm = new FormBuilder().group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  get f() { return this.myForm.controls; }
  ngOnInit() {
  }

  login() {

    if (this.myForm.valid) {
      this.authService.login(this.myForm.value.email, this.myForm.value.password).subscribe(
        data => {
          console.log(data);
          if (data) {
            if (data.user) {
              if (data.user.role === 'admin') {
                this.router.navigate(['dashbord']);
              } else {
                this.router.navigate(['blog']);
              }
            }
          }

        },
        error => {
          console.log(error);
            this.router.navigate(['login']);
        });

    } else {

        this.router.navigate(['login']);
    }
  }

}
