import { changeAccessFlag } from './../store/auth.actions';
import { State } from './../../../store/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/features/login/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { Store } from '@ngrx/store';

class MockAuthService {
  canActivate() { return true }
  isAuthenticated() { return true }
  logout() { }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AuthService
  let mockStore: MockStore<State>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
  let routerStateSnapshotStub: RouterStateSnapshot = <any>{};

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        AuthGuard,
        HttpClient,
        HttpHandler,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    auth = TestBed.inject(AuthService);
    mockStore = TestBed.get(Store);
  });

  it('should load instance', () => {
    expect(auth).toBeTruthy();
  });

  it('should call canActivate', () => {
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(guard.canActivate).toHaveBeenCalled();
  });

  it('should call dispatch changeAccessFlag with data:false if isAuthenticated true', () => {
    let spyDispatch = spyOn(mockStore, 'dispatch')
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spyDispatch).toHaveBeenCalledWith(changeAccessFlag({ data: false }))
  });

  it('should navigate to "/login" if isAuthenticated false', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(false)
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call dispatch changeAccessFlag with data:true if isAuthenticated false', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(false)
    let spyDispatch = spyOn(mockStore, 'dispatch')
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spyDispatch).toHaveBeenCalledWith(changeAccessFlag({ data: true }))
  });

  it('should call method logout() in authService if isAuthenticated false', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(false)
    const authServiceSpy = spyOn(auth, 'logout')
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(authServiceSpy).toHaveBeenCalled();
  });
})
