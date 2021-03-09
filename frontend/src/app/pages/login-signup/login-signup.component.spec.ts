import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginSignupComponent } from './login-signup.component';
import { ActivatedRoute } from '@angular/router';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginSignupComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {snapshot: {url: [{path: 'login'}]}} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});


describe('Login option', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      login: (email: string, password: string) => ({ subscribe: (f) => f({ }) })
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginSignupComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: ActivatedRoute, useValue: {snapshot: {url: [{path: 'login'}]}} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loginSignup with option login', () => {
    const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    spyOn(authServiceStub, 'login').and.callThrough();
    component.ngOnInit();
    component.loginSignup("emailTest", "passwordTest");
    expect(authServiceStub.login).toHaveBeenCalled();
    expect(component.title).toEqual('Login');
  });
});


describe('Signup option', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      signup: (email, password) => ({ subscribe: (f) => f({}) }),
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginSignupComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: ActivatedRoute, useValue: {snapshot: {url: [{path: 'signup'}]}} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should call loginSignup with option signup`, () => {
    const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    spyOn(authServiceStub, 'signup').and.callThrough();
    component.ngOnInit();
    component.loginSignup("emailTest", "passwordTest");
    expect(authServiceStub.signup).toHaveBeenCalled();
    expect(component.title).toEqual('Sign up');
  });
});