import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formFildes: FormGroup;

  constructor(   private formBuilder: FormBuilder) {
    this.formFildes = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {

  }

}
