import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupTitle: string = 'Sign up';
  emailPlaceholder: string = 'Email';
  passwordPlaceholder: string = 'Password';
  buttonText: string = 'Sign up';
  gotAccount: string = 'Already got an account?';
  login: string = 'Login';
  gotAccountLastText: string = 'now!';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signup(email: string, password: string) {
    this.authService
      .signup(email, password)
      .subscribe((res: HttpResponse<any>) => console.log(res));
  }
}
