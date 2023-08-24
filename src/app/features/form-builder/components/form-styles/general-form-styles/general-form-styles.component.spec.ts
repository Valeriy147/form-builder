import { applyFormStyles } from './../../../store/form.actions';
import { selectBorderTypes } from './../../../store/form.selectors';
import { State } from './../../../../../store/index';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralFormStylesComponent } from './general-form-styles.component';
import { Store, MemoizedSelector } from '@ngrx/store';

describe('GeneralFormStylesComponent', () => {
  let component: GeneralFormStylesComponent;
  let fixture: ComponentFixture<GeneralFormStylesComponent>;
  let mockStore: MockStore<State>;
  let mockBorderTypesSelector: MemoizedSelector<State, string[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralFormStylesComponent],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GeneralFormStylesComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 5 controls', () => {
    expect(component.generalForm.contains('label')).toBeTruthy()
    expect(component.generalForm.contains('textColor')).toBeTruthy()
    expect(component.generalForm.contains('backgroundColor')).toBeTruthy()
    expect(component.generalForm.contains('borderType')).toBeTruthy()
    expect(component.generalForm.contains('borderColor')).toBeTruthy()
  })

  it('should mark field as invalid if "label" field value length more then 50', () => {
    let label = component.generalForm.get('label')
    label?.setValue('012345678901234567890123456789012345678901234567890123456789')
    expect(label?.valid).toBeFalsy()
  })

  it('should mark field as valid if "label" field value length less then 50', () => {
    let label = component.generalForm.get('label')
    label?.setValue('012345678901234567890123456789')
    expect(label?.valid).toBeTruthy()
  })

  it('should have value ["1", "2"] in borderTypes selector', () => {
    mockBorderTypesSelector = mockStore.overrideSelector(selectBorderTypes, []);
    mockBorderTypesSelector.setResult(['1', '2']);
    mockStore.refreshState();
    fixture.detectChanges();
    component.borderTypes$.subscribe((result) => expect(result).toEqual(['1', '2']))
  })

  it('should call dispatch applyFormStyles with formData', () => {
    let spy = spyOn(mockStore, 'dispatch')
    const formData = { ...component.generalForm.value }
    component.applyFormStyles()
    expect(spy).toHaveBeenCalledWith(applyFormStyles({ data: formData }))
  })
});
