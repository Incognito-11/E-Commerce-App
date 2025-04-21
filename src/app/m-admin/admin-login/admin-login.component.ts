import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/m-shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  signInFormValue: any = {};
  user_data: any;
  constructor(
    private router: Router,
    private loginService: LoginSignupService
  ) {}
  ngOnInit(): void {}

  onSubmitSignIn() {
    this.loginService
      .adminLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPassword
      )
      .subscribe(
        (data) => {
          console.log('API Response:', data);
          this.user_data = data;

          if (this.user_data.length === 1) {
            sessionStorage.setItem('user_session_id', this.user_data[0].id);
            sessionStorage.setItem('role', this.user_data[0].role);
            this.router.navigateByUrl('/admin-dashboard');
          } else {
            alert('Invalid Email or Password');
          }
        },
        (error) => {
          console.error('API Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      );
  }
}
