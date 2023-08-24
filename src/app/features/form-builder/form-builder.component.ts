import { deepClone } from 'src/app/shared/pipes/functions/functions';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Field, Styles, FieldsStyles } from './store/interfaces';
import { Store } from '@ngrx/store';
import { tap, ReplaySubject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { getFields, addFormElement, selectStyles } from './store/form.actions';
import { selectFields } from './store/form.selectors';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormBuilderComponent {

  id: number = 0
  selectedElements = ['input'];
  previousIndex!: number
  currentIndex!: number
  elem: string = 'input'
  listElements: string[] = []
  styles: FieldsStyles | any = {}

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  fields$ = this.store.select(selectFields)

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getFields())
    this.fields$
      .pipe(
        tap(() => this.listElements = [], () => this.styles = {}),
        map((item) =>
          item.forEach((elem: Field) => {
            this.listElements.push(elem.type),
              this.styles = { ...this.styles, [elem.type]: elem.styles }
          })),
        tap(() => this.store.dispatch(selectStyles({ data: this.styles[this.elem], id: 0, index: 0 }))),
        takeUntil(this.destroy),
      ).subscribe()
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.previousIndex = event.previousIndex
      this.currentIndex = event.currentIndex
      this.elem = this.listElements[this.previousIndex]
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.id++
      this.store.dispatch(addFormElement({ data: { id: this.id, type: this.elem, styles: {} }, index: this.currentIndex }))
      if (this.listElements.length === 4) {
        this.listElements = [...this.listElements.slice(0, this.previousIndex),
        this.elem, ...this.listElements.slice(this.previousIndex, this.listElements.length)]
      }
      this.store.dispatch(selectStyles({ data: this.styles[this.elem], id: this.id, index: this.currentIndex }))

    }
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
