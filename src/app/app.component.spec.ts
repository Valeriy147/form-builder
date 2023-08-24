import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/features/login/services/auth.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AppModule } from './app.module';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthGuard } from './features/login/guards/auth.guard';
import { Location } from '@angular/common';
import { routes } from './app-routing.module';
import { User } from './features/login/store/interfaces';
import { State } from './store';


class MockAuthGuard {
  canActivate() { return true }
}

class MockAuthService {
  canActivate() { return true }
  isAuthenticated() { return true }
  logout() { }
  login() { }
  signIn(user: User) { }
}

describe('AppComponent', () => {
  let guard: AuthGuard
  let router: Router
  let location: Location
  let auth: AuthService
  let mockStore: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        provideMockStore(),
        { provide: AuthGuard, useClass: MockAuthGuard },
      ],
      teardown: { destroyAfterEach: false }

    }).compileComponents();
    mockStore = TestBed.get(Store);
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router)
    router.initialNavigation()
    location = TestBed.inject(Location)
    auth = TestBed.inject(AuthService);

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should route to "/main"', () => {
    spyOn(guard, 'canActivate').and.returnValue(true)
    router.navigate(['main']).then(() => {
      expect(location.path()).toBe("/main");
    })
  });
});
