import { createReducer, on } from '@ngrx/store';
import { FormState } from './interfaces';
import {
  getFields,
  getFieldsSuccess,
  getFieldsError,
  getBorderTypes,
  getBorderTypesSuccess,
  getBorderTypesError,
  selectStyles,
  applyFormStyles,
  addFormElement,
  applyElementStyles,
  deleteElement,
  addSelectOption,
  saveForm,
  saveFormSuccess,
  saveFormError
} from './form.actions';

export const form = 'form';

export const formInitialState: FormState = {
  fields: [],
  fieldsLoading: false,
  fieldsError: '',
  savingLoading: false,
  savingError: '',
  savingSuccess: false,
  borderTypes: [],
  borderTypesLoading: false,
  borderTypesError: '',
  selectedStyles: [],
  formStyles: {
    label: '',
    textColor: '',
    backgroundColor: '',
    borderColor: '',
    borderType: ''
  },
  selectedElements: [{
    id: 0, type: 'input', styles: {
      label: '',
      textColor: '',
      placeholder: '',
      width: NaN,
      height: NaN,
      fontSize: NaN,
      fontWeight: NaN,
      required: false,
      colorInput: '',
      backgroundColor: '',
      borderType: '',
      borderColor: '',
      color: '',
      options: []
    }
  }],
  selectedItemId: 0,
  selectedItemIndex: 0
};

export const formReducer = createReducer(
  formInitialState,

  on(getFields, state => ({
    ...state,
    fieldsLoading: true,
  })),
  on(getFieldsSuccess, (state, action) => ({
    ...state,
    fieldsLoading: false,
    fields: action.data
  })),
  on(getFieldsError, (state, action) => ({
    ...state,
    fieldsLoading: false,
    fieldsError: action.err
  })),
  on(getBorderTypes, state => ({
    ...state,
    borderTypesLoading: true,
  })),
  on(getBorderTypesSuccess, (state, action) => ({
    ...state,
    borderTypesLoading: false,
    borderTypes: action.data
  })),
  on(getBorderTypesError, (state, action) => ({
    ...state,
    borderTypesLoading: false,
    borderTypesError: action.err
  })),
  on(selectStyles, (state, action) => ({
    ...state,
    selectedStyles: action.data,
    selectedItemId: action.id,
    selectedItemIndex: action.index
  })),
  on(applyFormStyles, (state, action) => ({
    ...state,
    formStyles: { ...action.data }
  })),
  on(addFormElement, (state, action) => ({
    ...state,
    selectedElements: [...state.selectedElements.slice(0, action.index),
    action.data, ...state.selectedElements.slice(action.index, state.selectedElements.length)]
  })),
  on(applyElementStyles, (state, action) => ({
    ...state,
    selectedElements: [...state.selectedElements.slice(0, state.selectedItemIndex),
    {
      ...state.selectedElements[state.selectedItemIndex],
      ['styles']: action.data
    }, ...state.selectedElements.slice(state.selectedItemIndex + 1, state.selectedElements.length)]
  })),
  on(addSelectOption, (state, action) => ({
    ...state,
    selectedElements: [...state.selectedElements.slice(0, state.selectedItemIndex),
    {
      ...state.selectedElements[state.selectedItemIndex],
      ['styles']: {
        ...state.selectedElements[state.selectedItemIndex]['styles'],
        ['options']: [...(state.selectedElements[state.selectedItemIndex]['styles']['options']) || [], action.data]
      }
    }, ...state.selectedElements.slice(state.selectedItemIndex + 1, state.selectedElements.length)]
  })),
  on(deleteElement, state => ({
    ...state,
    selectedElements: [...state.selectedElements.slice(0, state.selectedItemIndex),
    ...state.selectedElements.slice(state.selectedItemIndex + 1, state.selectedElements.length)],
    selectedItemIndex: NaN,
    selectedItemId: NaN,
    selectedStyles: []
  })),
  on(saveForm, (state) => ({
    ...state,
    savingLoading: true,
  })),
  on(saveFormSuccess, (state) => ({
    ...state,
    savingLoading: false,
    savingSuccess: true
  })),
  on(saveFormError, (state, action) => ({
    ...state,
    savingLoading: false,
    savingError: action.err
  })),
)


