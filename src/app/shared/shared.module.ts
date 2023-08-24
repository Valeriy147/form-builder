import { StylesPipe } from './pipes/styles.pipe';
import { NameForFormControlPipe } from './pipes/name-for-form-control.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './loader/loader.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    NameForFormControlPipe,
    StylesPipe,
    LoaderComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NameForFormControlPipe,
    StylesPipe,
    LoaderComponent,
    MatFormFieldModule,
  ]
})
export class SharedModule { }
