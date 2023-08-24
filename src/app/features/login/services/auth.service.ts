import { setLoading } from './../store/auth.actions';
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User, AuthResponse } from '../store/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store) { }

  public error$: Subject<string> = new Subject<string>()

  get token(): any {
    const expDate = new Date(Number(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  create(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  handleError(error: HttpErrorResponse) {
    const { message } = error.error.error
    this.store.dispatch(setLoading({ data: false }))
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
      case 'EMAIL_EXISTS':
        this.error$.next('Email already in use')
        break
      case 'OPERATION_NOT_ALLOWED':
        this.error$.next('Operation not allowed')
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.error$.next('Too many attempts, please try later')
        break
    }
    return throwError(error)
  }


  private setToken(response: AuthResponse | null | any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
