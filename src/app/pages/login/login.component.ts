import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginTitle: string = 'Login';
  emailPlaceholder: string = 'Email';
  passwordPlaceholder: string = 'Password';
  buttonText: string = 'Login';
  noAccount: string = 'Not got an account?';
  signup: string = 'Sign up';
  noAccountLastText: string = 'now!';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe((res: HttpResponse<any>) => console.log(res));
  }
}
