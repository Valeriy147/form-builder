import { User } from './../store/interfaces';
import { throwError } from 'rxjs';
import { State } from './../../../store/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from './../../../../environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { fakeAsync, TestBed } from '@angular/core/testing'
import { setLoading } from '../store/auth.actions';
import { auth } from '../store/auth.reducer';


describe('AuthService', () => {
  let httpTestingController: HttpTestingController
  let authService: AuthService
  let mockStore: MockStore<State>;
  const user: User = {
    email: 'email',
    password: 'password',
  }
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, provideMockStore()],
    })

    authService = TestBed.get(AuthService)
    httpTestingController = TestBed.get(
      HttpTestingController
    )
    mockStore = TestBed.get(Store);

  })

  it('should return true if token true', () => {
    spyOn(authService, 'token').and.returnValue(true)
    authService.isAuthenticated()
    expect(authService).toBeTruthy()

  })

  it('should clear localStorage if call logout()', () => {
    localStorage.setItem('fb-token', '123')
    authService.logout()
    expect(localStorage.getItem('fb-token')).toBeFalsy()
  })

  it('should call handleError', () => {
    let error!: HttpErrorResponse
    spyOn(authService, 'handleError').and.callFake((error) => { return throwError(error) })
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
  })

  it('should make post request to login', () => {
    authService
      .login(user)
      .subscribe((response) => user)
    const req = httpTestingController.expectOne(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`
    )
    expect(req.request.method).toBe('POST')
    expect(user.returnSecureToken).toBeTruthy()
    req.flush(user)
  })

  it('should make post request to create user', () => {
    authService
      .create(user)
      .subscribe((response) => user)
    const req = httpTestingController.expectOne(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`
    )
    expect(req.request.method).toBe('POST')
    expect(user.returnSecureToken).toBeTruthy()
    req.flush(user)
  })

  it('should call next error$ with value "Email not found"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'EMAIL_NOT_FOUND' } }
    })
    error = {
      error: { error: { code: 400, message: 'EMAIL_NOT_FOUND' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Email not found'))
  })

  it('should call next error$ with value "Wrong email"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'INVALID_EMAIL' } }
    })
    error = {
      error: { error: { code: 400, message: 'INVALID_EMAIL' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Wrong email'))
  })

  it('should call next error$ with value "Wrong password"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'INVALID_PASSWORD' } }
    })
    error = {
      error: { error: { code: 400, message: 'INVALID_PASSWORD' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Wrong password'))
  })

  it('should call next error$ with value "Email already in use"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'EMAIL_EXISTS' } }
    })
    error = {
      error: { error: { code: 400, message: 'EMAIL_EXISTS' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Email already in use'))
  })

  it('should call next error$ with value "Operation not allowed"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'OPERATION_NOT_ALLOWED' } }
    })
    error = {
      error: { error: { code: 400, message: 'OPERATION_NOT_ALLOWED' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Operation not allowed'))
  })

  it('should call next error$ with value "Too many attempts, please try later"', () => {
    let error = jasmine.createSpyObj("error", {
      error: { error: { code: 400, message: 'TOO_MANY_ATTEMPTS_TRY_LATER' } }
    })
    error = {
      error: { error: { code: 400, message: 'TOO_MANY_ATTEMPTS_TRY_LATER' } }
    }
    spyOn(authService, 'handleError').and.callThrough()
    authService.handleError(error)
    expect(authService.handleError).toHaveBeenCalled()
    authService.error$.subscribe((err) => expect(err).toBe('Too many attempts, please try later'))
  })

  afterEach(() => httpTestingController.verify())
})
