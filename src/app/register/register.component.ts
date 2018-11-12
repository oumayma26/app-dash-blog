import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  AuthService
} from '../ngrx/services/auth.service';
import {
  MatSnackBar
} from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public snackBar: MatSnackBar) {
    this.myForm = new FormBuilder().group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user']
    });
  }

  ngOnInit() {}


  save() {
    this.authService.register(this.myForm.value).subscribe(res => {
      console.log(res);
      if (res.result === 1) {
        this.snackBar.open('New User created', 'ok', {
          duration: 6000,
        });

        this.router.navigate(['login']);
      } else {
        this.snackBar.open('A problem has occured', 'ok', {
          duration: 2000,
        });
      }
    });
  }

}
