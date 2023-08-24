import { State } from './../../../../../store/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CheckboxComponent } from './checkbox.component';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { selectSelectedStyles } from '../../../store/form.selectors';


describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let mockStore: MockStore<State>;
  let mockSelectedStylesSelector: MemoizedSelector<State, string[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      providers: [provideMockStore()]

    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to have "value" variable', () => {
    component.value = 'value'
    expect(component.value).toBe('value');
  });

  it('should change value in writeValue method', () => {
    component.writeValue('value')
    expect(component.value).toBe('value');
  });

  it('should call onEditorValueChange', () => {
    let event!: Event
    let spy = spyOn(component, 'onEditorValueChange')
    component.onEditorValueChange(event)
    expect(spy).toHaveBeenCalled()
    expect(component).toBeTruthy();
  });

  it('should assign value to onChange', () => {
    let fn!: (value: boolean) => void
    component.registerOnChange(fn)
    expect(component.onChange).toEqual(fn)
  });

  it('should assign value to onTouched', () => {
    let fn!: () => void
    component.registerOnTouched(fn)
    expect(component.onTouched).toEqual(fn)
  });


  it('should have value ["1", "2"] in Styles selector', () => {
    mockSelectedStylesSelector = mockStore.overrideSelector(selectSelectedStyles, []);
    mockSelectedStylesSelector.setResult(['1', '2']);
    mockStore.refreshState();
    fixture.detectChanges();
    component.selectedStyles$.subscribe((result) => expect(result).toEqual(['1', '2']))
  })

  it('should assign value to onTouched', fakeAsync(() => {
    mockSelectedStylesSelector = mockStore.overrideSelector(selectSelectedStyles, []);
    component.value = 'a'
    mockSelectedStylesSelector.setResult(['1', '2']);
    mockStore.refreshState();
    fixture.detectChanges();
    component.selectedStyles$.subscribe((result) => expect(component.value).toEqual(''))
  }));

  it('should have`t error if call onEditorValueChange() with event', () => {
    let event = jasmine.createSpyObj("event", {
      target: ''
    })
    component.onEditorValueChange(event)
    expect(component).toBeTruthy()
  })
});
