import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBorderTypes } from '../../store/form.actions';

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormStylesComponent implements OnInit {

  items = ['Form Styles', 'Field Styles'];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getBorderTypes())
  }
}
