import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import { NgModule, Provider } from "@angular/core";

import { LoginComponent } from './login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    INTERCEPTOR_PROVIDER,
    AuthService
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
