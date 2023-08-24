import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/login/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

class MockAuthService {
  logout() { }
}

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [HeaderComponent, { provide: AuthService, useClass: MockAuthService }, { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('can load instance', () => {
    expect(authService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout is authService', () => {
    const authServiceSpy = spyOn(authService, 'logout')
    component.logout()
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should navigate to "/login" after calling logout()', () => {
    component.logout()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  })
})

