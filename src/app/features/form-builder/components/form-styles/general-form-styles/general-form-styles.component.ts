import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectBorderTypes } from '../../../store/form.selectors';
import { applyFormStyles } from '../../../store/form.actions';

@Component({
  selector: 'app-general-form-styles',
  templateUrl: './general-form-styles.component.html',
  styleUrls: ['./general-form-styles.component.scss']
})
export class GeneralFormStylesComponent implements OnInit {

  generalForm!: FormGroup
  borderTypes$ = this.store.select(selectBorderTypes)
  selectedValue!: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.generalForm = new FormGroup({
      label: new FormControl('', [Validators.maxLength(50)]),
      textColor: new FormControl('', []),
      backgroundColor: new FormControl('', []),
      borderType: new FormControl('', []),
      borderColor: new FormControl('', []),
    })
  }


  applyFormStyles(): void {
    if (this.generalForm.valid) {
      const formData = { ...this.generalForm.value }
      this.store.dispatch(applyFormStyles({ data: formData }))
    }
  }
}
