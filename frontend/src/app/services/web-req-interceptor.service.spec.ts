import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WebReqInterceptorService } from './web-req-interceptor.service';


describe('WebReqInterceptorService', () => {
  let service: WebReqInterceptorService;
  let webReqInterceptorServiceSpy: jasmine.SpyObj<WebReqInterceptorService>;
  let authService: AuthService;

  beforeEach(() => {
    const spyWebReqInterceptorService = jasmine.createSpyObj('WebReqInterceptorService', ['intercept', 'refreshAccessToken', 'addAuthHeader']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [WebReqInterceptorService, AuthService]
    });
    service = TestBed.inject(WebReqInterceptorService);
    webReqInterceptorServiceSpy = TestBed.inject(WebReqInterceptorService) as jasmine.SpyObj<WebReqInterceptorService>;
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercep refresh-token', fakeAsync(() => {
    spyOn(webReqInterceptorServiceSpy, 'refreshAccessToken').and.callThrough();
    tick();
    expect(service.refreshAccessToken()).toBeTruthy();
  }));

  it('should intercep refresh-token with refreshingAccessToken', fakeAsync(() => {
    spyOn(webReqInterceptorServiceSpy, 'refreshAccessToken').and.callThrough();
    service.refreshingAccessToken = true;
    tick();
    expect(service.refreshAccessToken()).toBeTruthy();
  }));

  xit('should get addAuthHeader', fakeAsync(() => {
    spyOn(webReqInterceptorServiceSpy, 'addAuthHeader').and.callThrough();
    tick();
    expect(webReqInterceptorServiceSpy.addAuthHeader).toHaveBeenCalled();
  }));
});
