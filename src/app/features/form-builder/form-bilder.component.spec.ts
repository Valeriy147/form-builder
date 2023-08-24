import { Field } from './store/interfaces';
import { selectFields } from './store/form.selectors';
import { getFields } from './store/form.actions';
import { State } from './../../store/index';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilderComponent } from './form-builder.component';
import { Store, MemoizedSelector } from '@ngrx/store';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let mockFieldsSelector: MemoizedSelector<State, Field[]>;

  let mockStore: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have value ["1", "2"] in fields selector', () => {
    mockFieldsSelector = mockStore.overrideSelector(selectFields, [{ id: 1, type: "type", styles: [] }]);
    mockFieldsSelector.setResult([{ id: 1, type: "type", styles: [] }]);
    mockStore.refreshState();
    fixture.detectChanges();
    component.fields$.subscribe((result) => expect(result).toEqual([{ id: 1, type: "type", styles: [] }]))
  })

  it('should call dispatch getFields in OnInit', () => {
    mockFieldsSelector = mockStore.overrideSelector(selectFields, [{ id: 1, type: "type", styles: [] }]);
    let spy = spyOn(mockStore, 'dispatch')
    component.ngOnInit()
    expect(spy).toHaveBeenCalledWith(getFields())
  })

  it('should call drop with event and assign value to id, previousIndex, currentIndex', () => {
    component.listElements = ['1', '2', '3', '4']
    component.id = 0
    let event = jasmine.createSpyObj("event",
      {
        previousContainer: { data: ['1', '2'] },
        container: { data: ['1', '2'] },
        previousIndex: 1,
        currentIndex: 2
      })
    event = {
      previousContainer: { data: ['1', '2'] },
      container: { data: ['1', '2'] },
      previousIndex: 1,
      currentIndex: 2
    }
    spyOn(component, 'drop').and.callThrough()
    component.drop(event)
    expect(component.drop).toHaveBeenCalledWith(event)
    expect(component.id).toBe(1)
    expect(component.previousIndex).toBe(1)
    expect(component.currentIndex).toBe(2)

  })
});
