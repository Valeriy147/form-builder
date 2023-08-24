import { Component, Input, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { selectLoginAgain, selectLoading } from './store/auth.selectors';
import { User } from './store/interfaces';
import { setLoading, setUserLogin } from './store/auth.actions';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit, OnDestroy {
  haveAcc = true
  formGroup!: FormGroup;
  submitted = false

  @Input() formError = '';

  loading$ = this.store.select(selectLoading)
  loginAgain$ = this.store.select(selectLoginAgain)

  constructor(
    public auth: AuthService,
    private router: Router,
    private store: Store
  ) { }

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onFormChange() {
    this.formError = '';
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return
    }
    this.store.dispatch(setLoading({ data: true }))
    this.submitted = true

    const user: User = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    }
    if (this.haveAcc) {
      this.signIn(user)
    } else {
      this.auth.create(user).pipe(takeUntil(this.destroy)).subscribe((response) => {
        this.signIn(user)
      }, () => {
        this.submitted = false
      }
      )
    }
  }

  signIn(user: User) {
    this.auth.login(user).pipe(takeUntil(this.destroy)).subscribe((response) => {
      this.store.dispatch(setLoading({ data: false }))
      this.store.dispatch(setUserLogin({ data: user.email }))
      this.formGroup.reset()
      this.router.navigate(['/main'])
    }, () => {
      this.submitted = false
    }
    )
  }

  accStatus(haveAcc: boolean) {
    this.haveAcc = haveAcc
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
