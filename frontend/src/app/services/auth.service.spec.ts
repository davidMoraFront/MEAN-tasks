import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do login', () => {
    service.login('test10@test.com', '12345678');
    expect(service).toBeTruthy();
  });

  it('should do signup', () => {
    service.signup('test11@test.com', '12345678');
    expect(service).toBeTruthy();
  });

  it('should get access-token', () => {
    service.getAccessToken();
    expect(localStorage.getItem('x-access-token')).not.toBeNull;
  });

  it('should get refresh-token', () => {
    service.getRefreshToken();
    expect(localStorage.getItem('x-refresh-token')).not.toBeNull;
  });

  it('should get user id', () => {
    service.getUserId();
    expect(localStorage.getItem('user-id')).not.toBeNull;
  });

  it('should set access-token', () => {
    service.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRhOWNlYjM5M2EyNmE0MmYyZjI3NWYiLCJpYXQiOjE2MTQ0NjM5MTEsImV4cCI6MTYxNDQ2NjYxMX0.lwCZJe0VSa5cWhYSh8UpTVeQd4uuRU9dZQYNPkyPuYY');
    expect(localStorage.getItem('x-access-token')).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRhOWNlYjM5M2EyNmE0MmYyZjI3NWYiLCJpYXQiOjE2MTQ0NjM5MTEsImV4cCI6MTYxNDQ2NjYxMX0.lwCZJe0VSa5cWhYSh8UpTVeQd4uuRU9dZQYNPkyPuYY');
  });

  it('should get new access-token', () => {
    service.getNewAccessToken();
    expect(localStorage.getItem('x-access-token')).not.toBeNull;
  });

  it('should do logout', () => {
    service.logout();
    expect(true);
  });
  
});
