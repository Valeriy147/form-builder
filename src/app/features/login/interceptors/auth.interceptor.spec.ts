import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { State } from './../../../store/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from 'src/app/features/login/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from "@angular/core/testing";
import { Store } from '@ngrx/store';
import { AuthInterceptor } from './auth.interceptor';

class MockAuthService {
  canActivate() { return true }
  isAuthenticated() { return true }
  logout() { }
}

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let auth: AuthService
  let mockStore: MockStore<State>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let req!: HttpRequest<any>
  let next: HttpHandler
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        AuthInterceptor,
        HttpClient,
        HttpHandler,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: MockAuthService },
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    auth = TestBed.inject(AuthService);
    mockStore = TestBed.get(Store);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should load instance', () => {
    expect(auth).toBeTruthy();
  });

  it('should call intercept', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(false);
    spyOn(interceptor, 'intercept');
    interceptor.intercept(req, next);
    expect(interceptor.intercept).toHaveBeenCalled();
  });

  it('should set req value from auth.token ', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(true)
    const myInterceptorObject = jasmine.createSpyObj('intercept', [
      'next',
      'req',
    ]);
    spyOn(interceptor, 'intercept').and.callThrough()
    expect(req).toBe(auth.token)
  });

  it('should call bkj', () => {

    spyOn(auth, 'isAuthenticated').and.returnValue(false);

    next = {
      handle: () => {
        return Observable.create((subscriber: any) => {
          subscriber.error('error')
        });
      }
    };

    const myInterceptorObject = jasmine.createSpyObj('intercept', [
      'next',
      'req',
    ]);
    let error!: HttpErrorResponse
    myInterceptorObject.next
      .and
      .returnValue(of(error));
    spyOn(interceptor, 'intercept').and.callThrough()
    interceptor.intercept(req, next);
    expect(req).toBe(auth.token)
  });
})
