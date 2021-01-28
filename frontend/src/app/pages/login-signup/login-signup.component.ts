import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  optionSelected: string = '';
  title: string = '';
  emailPlaceholder: string = 'Email';
  passwordPlaceholder: string = 'Password';
  buttonText: string = '';
  beforeLinkText: string = '';
  link: string = '';
  linkText: string = '';
  afterLinkText: string = 'now!';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.optionSelected = this.route.snapshot.url[0].path;
    if (this.optionSelected === 'login') {
      this.optionSelected = 'login';
      this.title = 'Login';
      this.buttonText = 'Login';
      this.beforeLinkText = 'Not got an account?';
      this.link = 'signup';
      this.linkText = 'Sign up';
    } else {
      this.optionSelected = 'signup';
      this.title = 'Sign up';
      this.buttonText = 'Sign up';
      this.beforeLinkText = 'Already got an account?';
      this.link = 'login';
      this.linkText = 'Login';
    }
  }

  loginSignup(email: string, password: string) {
    if (this.optionSelected === 'login') {
      this.authService
        .login(email, password)
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) this.router.navigate(['/lists']);
          console.log(res);
        });
    } else {
      this.authService
        .signup(email, password)
        .subscribe((res: HttpResponse<any>) => console.log(res));
    }
  }
}
