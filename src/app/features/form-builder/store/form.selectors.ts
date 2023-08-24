import { form } from './form.reducer';
import { FormState } from './interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<FormState>(form)

export const selectFields = createSelector(
  featureSelector,
  state => state.fields
);

export const selectFieldsLoading = createSelector(
  featureSelector,
  state => state.fieldsLoading
);

export const selectFieldsError = createSelector(
  featureSelector,
  state => state.fieldsError
);

export const selectBorderTypes = createSelector(
  featureSelector,
  state => state.borderTypes
);

export const selectBorderTypesLoading = createSelector(
  featureSelector,
  state => state.borderTypesLoading
);

export const selectBorderTypesError = createSelector(
  featureSelector,
  state => state.borderTypesError
);

export const selectSelectedStyles = createSelector(
  featureSelector,
  state => state.selectedStyles
);

export const selectFormStyles = createSelector(
  featureSelector,
  state => state.formStyles
);

export const selectSelectedElements = createSelector(
  featureSelector,
  state => state.selectedElements
)

export const selectSelectedItemId = createSelector(
  featureSelector,
  state => state.selectedItemId
)

export const selectSavingLoading = createSelector(
  featureSelector,
  state => state.savingLoading
)

export const selectSavingError = createSelector(
  featureSelector,
  state => state.savingError
)
export const selectSavingSuccess = createSelector(
  featureSelector,
  state => state.savingSuccess
)




