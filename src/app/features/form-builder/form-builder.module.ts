import { FormService } from 'src/app/features/form-builder/services/form.service';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';

import { ElementsStylesComponent } from './components/form-styles/elements-styles/elements-styles.component';
import { ColorInputComponent } from './components/fields/color-input/color-input.component';
import { CheckboxComponent } from './components/fields/checkbox/checkbox.component';
import { SelectorComponent } from './components/fields/selector/selector.component';
import { TextInputComponent } from './components/fields/text-input/text-input.component';
import { NumberInputComponent } from './components/fields/number-input/number-input.component';
import { HeaderComponent } from './components/header/header.component';
import { GeneralFormStylesComponent } from './components/form-styles/general-form-styles/general-form-styles.component';
import { FormStylesComponent } from './components/form-styles/form-styles.component';
import { ListElementsComponent } from './components/list-elements/list-elements.component';
import { FormElementsComponent } from './components/form-elements/form-elements.component';
import { FormBuilderComponent } from './form-builder.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    FormBuilderComponent,
    FormElementsComponent,
    HeaderComponent,
    ListElementsComponent,
    FormStylesComponent,
    GeneralFormStylesComponent,
    ElementsStylesComponent,
    ColorInputComponent,
    CheckboxComponent,
    SelectorComponent,
    TextInputComponent,
    NumberInputComponent,
  ],

  imports: [
    RouterModule.forChild([
      { path: '', component: FormBuilderComponent }
    ]),
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    CdkAccordionModule,
    MatDividerModule,
    SharedModule,
    MatSnackBarModule
  ],
  providers: [
    FormService
  ],
  exports: [
    RouterModule
  ]
})
export class FormBuilderModule { }
