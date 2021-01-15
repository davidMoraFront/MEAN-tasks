import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginSignupComponent } from './login-signup.component';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      login: (email, password) => ({ subscribe: (f) => f({ res: true }) }),
      signup: (email, password) => ({ subscribe: (f) => f({}) }),
    });
    const routerStub = () => ({ navigate: (array) => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { url: { path: { res: 'login' } } },
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginSignupComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`emailPlaceholder has default value`, () => {
    expect(component.emailPlaceholder).toEqual(`Email`);
  });

  it(`passwordPlaceholder has default value`, () => {
    expect(component.passwordPlaceholder).toEqual(`Password`);
  });

  it(`afterLinkText has default value`, () => {
    expect(component.afterLinkText).toEqual(`now!`);
  });

  xit('makes expected calls', () => {
    spyOn(component, 'loginSignup').and.callThrough();
    component.ngOnInit();
    // expect(authServiceStub.login());
    expect(component.loginSignup).toHaveBeenCalled();
  });
});

/* 
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupComponent } from './login-signup.component';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

 */
