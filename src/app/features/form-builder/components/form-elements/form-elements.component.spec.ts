import { saveForm } from './../../store/form.actions';
import { selectFormStyles, selectSelectedElements, selectSelectedItemId, selectSavingLoading, selectSavingError, selectSavingSuccess } from './../../store/form.selectors';
import { selectUserLogin } from './../../../login/store/auth.selectors';
import { State } from './../../../../store/index';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormElement, FormStyles } from './../../store/interfaces';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormElementsComponent } from './form-elements.component';
import { Store, MemoizedSelector } from '@ngrx/store';

describe('FormElementsComponent', () => {
  let component: FormElementsComponent;
  let fixture: ComponentFixture<FormElementsComponent>;
  let mockUserLoginSelector: MemoizedSelector<State, string>;
  let mockFormStylesSelector: MemoizedSelector<State, FormStyles>;
  let mockFormElementsSelector: MemoizedSelector<State, FormElement[]>;
  let mockSelectedElementSelector: MemoizedSelector<State, number>;
  let mockSavingLoadingSelector: MemoizedSelector<State, boolean>;
  let mockSavingErrorSelector: MemoizedSelector<State, string>;
  let mockSavingSuccessSelector: MemoizedSelector<State, boolean>;
  let mockStore: MockStore<State>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [FormElementsComponent],
      providers: [provideMockStore(), MatSnackBar]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form control "0"', () => {
    let elem: FormElement = { id: 0, type: 'checkbox', styles: {} }
    component.addControl(elem)
    expect(component.form.contains('0')).toBeTruthy()
  });

  it('should mark field as invalid if "input" if the required field is true and the field "input" is empty', () => {
    let elem: FormElement = { id: 0, type: 'input', styles: { required: true } }
    component.addControl(elem)
    let input = component.form.get('0')

    input?.setValue('')

    expect(input?.valid).toBeFalsy()
  })

  it('should mark field as valid if "input" if the required field is false and the field "input" is empty', () => {
    let elem: FormElement = { id: 0, type: 'input', styles: { required: false } }
    component.addControl(elem)
    let input = component.form.get('0')

    input?.setValue('')

    expect(input?.valid).toBeTruthy()
  })

  it('should return value and placeholder', () => {
    let label = component.itemDetails({ id: 0, type: 'checkbox', styles: { label: 'label', placeholder: 'placeholder' } }).value
    let placeholder = component.itemDetails({
      id: 0, type: 'checkbox', styles: { label: 'label', placeholder: 'placeholder' }
    }).placeholder

    expect(label).toBe('label')
    expect(placeholder).toBe('placeholder')
  });

  it('should continue labelName', () => {
    expect(component.labelName).toBe('Form label');
  });

  it('should call event emitter with CDKDragDrop array of strings', () => {
    let obj!: CdkDragDrop<string[]>
    let result = null
    component.toDrop.subscribe(v => result = v)
    component.drop(obj)
    expect(result).toBe(result)
  })

  it('should have value "login" in UserLogin selector', () => {
    mockUserLoginSelector = mockStore.overrideSelector(selectUserLogin, '');
    mockUserLoginSelector.setResult('login');
    mockStore.refreshState();
    fixture.detectChanges();
    component.userLogin$.subscribe((result) => expect(result).toBe('login'))
  })

  it('should have value FromStyles type object in FormStyles selector', () => {
    let formStyles!: FormStyles
    mockFormStylesSelector = mockStore.overrideSelector(selectFormStyles, {
      label: '',
      textColor: '',
      backgroundColor: '',
      borderColor: '',
      borderType: ''
    });
    mockFormStylesSelector.setResult(formStyles);
    mockStore.refreshState();
    fixture.detectChanges();
    component.formStyles$.subscribe((result) => expect(result).toEqual(formStyles))
  })

  it('should have value FormElement array in SelectedElements selector', () => {
    let selectedElements!: FormElement[]
    mockFormElementsSelector = mockStore.overrideSelector(selectSelectedElements, []);
    mockFormElementsSelector.setResult(selectedElements);
    mockStore.refreshState();
    fixture.detectChanges();
    component.formElements$.subscribe((result) => expect(result).toEqual(selectedElements))
  })

  it('should have value 1 in SelectedItemId selector', () => {
    mockSelectedElementSelector = mockStore.overrideSelector(selectSelectedItemId, NaN);
    mockSelectedElementSelector.setResult(1);
    mockStore.refreshState();
    fixture.detectChanges();
    component.selectedElement$.subscribe((result) => expect(result).toBe(1))
  })

  it('should have value true in SavingLoading selector', () => {
    mockSavingLoadingSelector = mockStore.overrideSelector(selectSavingLoading, false);
    mockSavingLoadingSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    component.savingLoading$.subscribe((result) => expect(result).toBeTruthy())
  })

  it('should have value "error" in SavingError selector', () => {
    mockSavingErrorSelector = mockStore.overrideSelector(selectSavingError, '');
    mockSavingErrorSelector.setResult('error');
    mockStore.refreshState();
    fixture.detectChanges();
    component.savingError$.subscribe((result) => expect(result).toBe('error'))
  })

  it('should have value true in SavingSuccess selector', () => {
    mockSavingSuccessSelector = mockStore.overrideSelector(selectSavingSuccess, false);
    mockSavingSuccessSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    component.savingSuccess$.subscribe((result) => expect(result).toBeTruthy())
  })

  it('should call dispatch saveForm with userLogin, formStyles and formElements', () => {
    let spy = spyOn(mockStore, 'dispatch')
    let formStyles = {
      label: '',
      textColor: '',
      backgroundColor: '',
      borderColor: '',
      borderType: ''
    }
    component.saveForm('login', formStyles, [])
    expect(spy).toHaveBeenCalledWith(saveForm({ userLogin: 'login', formStyles, formElements: [] }))
  })
});

