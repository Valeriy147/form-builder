import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { selectSavingLoading, selectSavingError, selectSavingSuccess } from './../../store/form.selectors';
import { selectUserLogin } from './../../../login/store/auth.selectors';
import { saveForm } from './../../store/form.actions';
import { FieldsStyles, FormStyles } from './../../store/interfaces';
import { map } from 'rxjs/operators';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, ReplaySubject, takeUntil } from 'rxjs';
import { FormElement } from '../../store/interfaces';
import {
  selectFormStyles,
  selectSelectedElements,
  selectSelectedItemId
} from '../../store/form.selectors';
import { selectStyles } from '../../store/form.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { viewLabelName } from 'src/app/shared/pipes/functions/functions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormElementsComponent implements OnInit, OnDestroy {

  labelName: string = 'Form label';
  selectedElement!: number
  form!: FormGroup
  obj!: {}

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  userLogin$ = this.store.select(selectUserLogin)
  formStyles$ = this.store.select(selectFormStyles)
  formElements$ = this.store.select(selectSelectedElements)
  selectedElement$ = this.store.select(selectSelectedItemId)
  savingLoading$ = this.store.select(selectSavingLoading)
  savingError$ = this.store.select(selectSavingError)
  savingSuccess$ = this.store.select(selectSavingSuccess)

  @Input() selectedElements!: string[]
  @Input() styles!: FieldsStyles | any
  @Output() toDrop = new EventEmitter<CdkDragDrop<string[]>>()

  constructor(private store: Store, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedElement$
      .pipe(
        tap((id) => this.selectedElement = id),
        takeUntil(this.destroy),
      ).subscribe()
    this.form = new FormGroup({
      ...this.obj
    })
    this.formElements$
      .pipe(
        tap(() => this.form = new FormGroup({})),
        map(array => array.forEach(elem => this.addControl(elem))),
        takeUntil(this.destroy),
      ).subscribe()

    this.savingSuccess$
      .pipe(
        tap((value) => value ? this.openSnackBar() : ''),
        takeUntil(this.destroy),
      ).subscribe()
  }


  addControl(elem: FormElement) {
    if (elem.styles.required && elem.type === 'checkbox') {
      this.form.addControl(
        `${elem.id}`, new FormControl(
          `${elem.styles.label ? elem.styles.label : viewLabelName(elem.type)}`,
          Validators.requiredTrue))
    } else if (elem.styles.required && elem.type != 'checkbox') {
      this.form.addControl(
        `${elem.id}`, new FormControl(
          `${elem.styles.label ? elem.styles.label : viewLabelName(elem.type)}`,
          Validators.required))
    } else this.form.addControl(`${elem.id}`, new FormControl(
      `${elem.styles.label ? elem.styles.label : viewLabelName(elem.type)}`, []))
  }

  drop(event: CdkDragDrop<string[]>) {
    this.toDrop.emit(event)
  }

  selectElement(elem: FormElement, i: number) {
    this.store.dispatch(selectStyles({ data: this.styles[elem.type], id: elem.id, index: i }))
  }

  itemDetails(item: FormElement) {
    let value = viewLabelName(item.type)
    let placeholder = ''
    if (item.styles.label) {
      value = item.styles.label
    }
    if (item.styles.placeholder) {
      placeholder = item.styles.placeholder
    }
    return { value: value, placeholder: placeholder }
  }

  saveForm(userLogin: string, formStyles: FormStyles, formElements: FormElement[]) {
    this.store.dispatch(saveForm({ userLogin, formStyles, formElements }))
  }

  openSnackBar() {
    this._snackBar.open("Your form saved success!", "Ok");
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
