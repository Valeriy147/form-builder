import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { selectFieldsLoading, selectFieldsError } from './../../store/form.selectors';
import { State } from './../../../../store/index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ListElementsComponent } from './list-elements.component';

describe('ListElements', () => {
  let component: ListElementsComponent;
  let fixture: ComponentFixture<ListElementsComponent>;
  let mockStore: MockStore<State>;
  let mockFieldsLoadingSelector: MemoizedSelector<State, boolean>;
  let mockFieldsErrorSelector: MemoizedSelector<State, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [ListElementsComponent],
    });

    fixture = TestBed.createComponent(ListElementsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have value true in fieldsLoading selector', () => {
    mockFieldsLoadingSelector = mockStore.overrideSelector(selectFieldsLoading, false);
    mockFieldsLoadingSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    component.fieldsLoading$.subscribe((result) => expect(result).toBeTruthy())
  })

  it('should have value true in fieldsError selector', () => {
    mockFieldsErrorSelector = mockStore.overrideSelector(selectFieldsError, '');
    mockFieldsErrorSelector.setResult('error');
    mockStore.refreshState();
    fixture.detectChanges();
    component.fieldsError$.subscribe((result) => expect(result).toBe('error'))
  })

  it('should call event emitter with CDKDragDrop array of strings', () => {
    let obj!: CdkDragDrop<string[]>
    let result = null
    component.toDrop.subscribe(v => result = v)
    component.drop(obj)
    expect(result).toBe(result)
  })
});
