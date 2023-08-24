import { fakeAsync } from '@angular/core/testing';
import { routes } from './../../../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { getBorderTypes } from './../../store/form.actions';
import { State } from './../../../../store/index';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormStylesComponent } from './form-styles.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('FormStylesComponent', () => {
  let component: FormStylesComponent;
  let fixture: ComponentFixture<FormStylesComponent>;
  let mockStore: MockStore<State>;
  let router: Router
  let location: Location

  let store: MockStore<{}>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkAccordionModule, RouterTestingModule.withRoutes(routes)],
      declarations: [FormStylesComponent],
      providers: [provideMockStore()],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);
    router = TestBed.inject(Router)
    router.initialNavigation()
    location = TestBed.inject(Location)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items, that includes 2 values', () => {
    expect(component.items).toContain('Form Styles')
    expect(component.items).toContain('Field Styles')
  });

  it('should call dispatch getBorderTypes in OnInit', () => {
    let spy = spyOn(mockStore, 'dispatch')
    component.ngOnInit()
    expect(spy).toHaveBeenCalledWith(getBorderTypes())
  })
  it('should redirect from path empty "" to "/login"', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe("/login");
    })
  }));
});
