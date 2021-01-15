import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { WebRequestService } from './web-request.service';

describe('WebRequestService', () => {
  let service: WebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should perform get correctly', fakeAsync(
    inject(
      [WebRequestService, HttpTestingController],
      (
        webRequestService: WebRequestService,
        backend: HttpTestingController
      ) => {
        const responseObject = [{ title: 'new list' }, { title: 'other list' }];
        let response = null;

        webRequestService.get('lists').subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:3000/lists',
        });
        requestWrapper.flush(responseObject);

        tick();
        console.log(requestWrapper);
        console.log(response);
        expect(requestWrapper.request.method).toEqual('GET');
        expect(response).toEqual(responseObject);
      }
    )
  ));

  it('should perform login correctly', fakeAsync(
    inject(
      [WebRequestService, HttpTestingController],
      (
        webRequestService: WebRequestService,
        backend: HttpTestingController
      ) => {
        const responseObject = {
          success: true,
          message: 'login was successful',
        };
        let response = null;

        webRequestService.login('test10@test.com', '12345678').subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:3000/users/login',
        });
        requestWrapper.flush(responseObject);

        tick();
        console.log(requestWrapper);
        console.log(response);
        expect(requestWrapper.request.method).toEqual('POST');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));

  it('should perform signup correctly', fakeAsync(
    inject(
      [WebRequestService, HttpTestingController],
      (
        webRequestService: WebRequestService,
        backend: HttpTestingController
      ) => {
        const responseObject = {
          success: true,
          message: 'signup was successful',
        };
        let response = null;

        webRequestService.signup('test10@test.com', '12345678').subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:3000/users',
        });
        requestWrapper.flush(responseObject);

        tick();
        console.log(requestWrapper);
        console.log(response);
        expect(requestWrapper.request.method).toEqual('POST');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));
});
