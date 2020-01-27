import { AuthService } from './../services/auth.service';

import { OnInit, Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';
  returnUrl: string;
  loading = false;
  submitted = false;
  expiredToken=localStorage.getItem("isTokenExpired");


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() :void{

   localStorage.clear();
   this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  initForm():void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get formControls() { return this.loginForm.controls; }

  login() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;

    this.authService.login(
      {
        username: this.formControls.username.value,
        password: this.formControls.password.value
      }
    )
    .subscribe(
      data => {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigate([redirect]);
      },
      error => {
          this.errorMessage = (error.error.message || error.statusText);
          this.loading = false;
      }
    );

  }

}
