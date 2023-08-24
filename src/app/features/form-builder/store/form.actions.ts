import { createAction, props } from '@ngrx/store';
import { Field, FormStyles, FormElement, Styles } from './interfaces';

export enum FormActions {

  GetFields = '[FORM] get fields',
  GetFieldsSuccess = '[FORM] get fields success',
  GetFieldsError = '[FORM] get fields error',
  GetBorderTypes = '[FORM] get border types',
  GetBorderTypesSuccess = '[FORM] get border types success',
  GetBorderTypesError = '[FORM] get border types error',
  SelectStyles = '[FORM] select styles',
  ApplyFormStyles = '[FORM] apply form styles',
  AddSelectOption = '[FORM] add select option',
  ApplyElementStyles = '[FORM] apply element styles',
  AddFormElement = '[FORM] add form element',
  DeleteElement = '[FORM] delete element',
  SaveForm = '[FORM] save form',
  SaveFormSuccess = '[FORM] save form success',
  SaveFormError = '[FORM] save form error'
}

export const getFields = createAction(FormActions.GetFields);

export const getFieldsSuccess = createAction(
  FormActions.GetFieldsSuccess,
  props<{ data: Field[] }>()
);

export const getFieldsError = createAction(
  FormActions.GetFieldsError,
  props<{ err: string }>());


export const getBorderTypes = createAction(FormActions.GetBorderTypes);

export const getBorderTypesSuccess = createAction(
  FormActions.GetBorderTypesSuccess,
  props<{ data: string[] }>()
);

export const getBorderTypesError = createAction(
  FormActions.GetBorderTypesError,
  props<{ err: string }>()
);

export const selectStyles = createAction(
  FormActions.SelectStyles,
  props<{ data: string[], id: number, index: number }>()
);

export const applyFormStyles = createAction(
  FormActions.ApplyFormStyles,
  props<{ data: FormStyles }>()
)

export const addSelectOption = createAction(
  FormActions.AddSelectOption,
  props<{ data: string }>()
)

export const addFormElement = createAction(
  FormActions.AddFormElement,
  props<{ data: FormElement, index: number }>()
)
export const applyElementStyles = createAction(
  FormActions.ApplyElementStyles,
  props<{ data: Styles }>()
)
export const deleteElement = createAction(
  FormActions.DeleteElement
)

export const saveForm = createAction(
  FormActions.SaveForm,
  props<{ userLogin: string, formStyles: FormStyles, formElements: FormElement[] }>()
)

export const saveFormSuccess = createAction(
  FormActions.SaveForm
)

export const saveFormError = createAction(
  FormActions.SaveForm,
  props<{ err: string }>()
)

