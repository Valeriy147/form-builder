import { addSelectOption, applyElementStyles } from './../../../store/form.actions';
import { selectSelectedStyles, selectBorderTypes, selectBorderTypesLoading, selectBorderTypesError } from './../../../store/form.selectors';
import { Styles } from './../../../store/interfaces';
import { State } from './../../../../../store/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementsStylesComponent } from './elements-styles.component';
import { MemoizedSelector, Store } from '@ngrx/store';

describe('ElementsStylesComponent', () => {
  let component: ElementsStylesComponent;
  let fixture: ComponentFixture<ElementsStylesComponent>;
  let mockSelectedStylesSelector: MemoizedSelector<State, string[]>;
  let mockBorderTypesSelector: MemoizedSelector<State, string[]>;
  let mockBorderTypesLoadingSelector: MemoizedSelector<State, boolean>;
  let mockBorderTypesErrorSelector: MemoizedSelector<State, string>;
  let mockStore: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementsStylesComponent],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ElementsStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 15 controls', () => {
    expect(component.elementsForm.contains('label')).toBeTruthy()
    expect(component.elementsForm.contains('textColor')).toBeTruthy()
    expect(component.elementsForm.contains('placeholder')).toBeTruthy()
    expect(component.elementsForm.contains('width')).toBeTruthy()
    expect(component.elementsForm.contains('height')).toBeTruthy()
    expect(component.elementsForm.contains('fontSize')).toBeTruthy()
    expect(component.elementsForm.contains('fontWeight')).toBeTruthy()
    expect(component.elementsForm.contains('required')).toBeTruthy()
    expect(component.elementsForm.contains('colorInput')).toBeTruthy()
    expect(component.elementsForm.contains('backgroundColor')).toBeTruthy()
    expect(component.elementsForm.contains('borderType')).toBeTruthy()
    expect(component.elementsForm.contains('borderColor')).toBeTruthy()
    expect(component.elementsForm.contains('color')).toBeTruthy()
    expect(component.elementsForm.contains('option')).toBeTruthy()
    expect(component.elementsForm.contains('checkboxOption')).toBeTruthy()
  })

  it('should mark field as invalid if "fontWeight" field value more then 10', () => {
    let fontWeight = component.elementsForm.get('fontWeight')
    fontWeight?.setValue('11')
    expect(fontWeight?.valid).toBeFalsy()
  })

  it('should mark field as valid if "fontWeight" field value less then 10', () => {
    let fontWeight = component.elementsForm.get('fontWeight')
    fontWeight?.setValue('9')
    expect(fontWeight?.valid).toBeTruthy()
  })

  it('should set option control as empty string after call addOption() and call dispatch addSelectorOption', () => {
    component.elementsForm.value.option = 'option'
    let spy = spyOn(mockStore, 'dispatch')
    component.addOption()
    expect(spy).toHaveBeenCalledWith(addSelectOption({ data: 'option' }))
    expect(component.elementsForm.value.option).toBe('')
  })

  it('should have value ["1", "2"] in SelectedStyles selector', () => {
    mockSelectedStylesSelector = mockStore.overrideSelector(selectSelectedStyles, []);
    mockSelectedStylesSelector.setResult(['1', '2']);
    mockStore.refreshState();
    fixture.detectChanges();
    component.selectedStyles$.subscribe((result) => expect(result).toEqual(['1', '2']))
  })

  it('should have value ["1", "2"] in BorderTypes selector', () => {
    mockBorderTypesSelector = mockStore.overrideSelector(selectBorderTypes, []);
    mockBorderTypesSelector.setResult(['1', '2']);
    mockStore.refreshState();
    fixture.detectChanges();
    component.borderTypes$.subscribe((result) => expect(result).toEqual(['1', '2']))
  })

  it('should have value true in BorderTypesLoading selector', () => {
    mockBorderTypesLoadingSelector = mockStore.overrideSelector(selectBorderTypesLoading, false);
    mockBorderTypesLoadingSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    component.borderTypesLoading$.subscribe((result) => expect(result).toBeTruthy())
  })

  it('should have value error in BorderTypesError selector', () => {
    mockBorderTypesErrorSelector = mockStore.overrideSelector(selectBorderTypesError, '');
    mockBorderTypesErrorSelector.setResult('error');
    mockStore.refreshState();
    fixture.detectChanges();
    component.borderTypesError$.subscribe((result) => expect(result).toBe('error'))
  })

  it('should call dispatch applyElementStyles with formData', () => {
    let spy = spyOn(mockStore, 'dispatch')
    const formData = { ...component.elementsForm.value }
    component.applyElementsStyles()
    expect(spy).toHaveBeenCalledWith(applyElementStyles({ data: formData }))
  })

  it('should call dispatch delete', () => {
    let spy = spyOn(mockStore, 'dispatch')
    component.delete()
    expect(spy).toHaveBeenCalled()
  })
})
